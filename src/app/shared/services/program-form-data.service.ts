/*
 *
 * Copyright 2019 HISP Tanzania
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 *
 * @since 2019
 * @author Joseph Chingalo <profschingalo@gmail.com>
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { getRepository, Repository, In } from 'typeorm';
import {
  EnrollmentEntity,
  TrackedEntityAttributeValueEntity,
  TrackedEntityInstanceEntity,
  EventEntity,
} from 'src/app/entites';
import { TrackedEntityInstance } from 'src/app/models';
import { CONNECTION_NAME } from 'src/app/constants/db-options';
import { Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ProgramFormDataService {
  constructor(private httpClientService: HttpClientService) {}

  discoveringTrackedEntityInstancesFromServer(
    organisationUnitId: string,
    orgUnitName: string,
    programId: string,
    pageSize = 100,
  ): Observable<any> {
    let trackedEntityInstances = [];
    const syncStatus = 'synced';
    const url = `/api/trackedEntityInstances.json?ou=${organisationUnitId}&program=${programId}&pageSize=${pageSize}&order=lastUpdated:desc&fields=*`;
    return new Observable((observer) => {
      this.httpClientService
        .get(url, true)
        .then((response: any) => {
          trackedEntityInstances = _.map(
            response.trackedEntityInstances || [],
            (trackedEntityInstanceObj: any) => {
              const trackedEntityInstanceId =
                trackedEntityInstanceObj.trackedEntityInstance;
              return {
                ...trackedEntityInstanceObj,
                orgUnitName,
                syncStatus,
                trackedEntity:
                  trackedEntityInstanceObj.trackedEntity ||
                  trackedEntityInstanceObj.trackedEntityType,
                id: trackedEntityInstanceId,
                enrollments: _.map(
                  trackedEntityInstanceObj.enrollments || [],
                  (enrollmentObj: any) => {
                    return {
                      ...enrollmentObj,
                      syncStatus,
                      id: enrollmentObj.enrollment,
                      trackedEntity:
                        enrollmentObj.trackedEntity ||
                        enrollmentObj.trackedEntityType,
                    };
                  },
                ),
                attributes: _.map(
                  trackedEntityInstanceObj.attributes || [],
                  (attributeObj: any) => {
                    const { value, attribute } = attributeObj;
                    return {
                      ...{},
                      id: `${trackedEntityInstanceId}-${attribute}`,
                      trackedEntityInstance: trackedEntityInstanceId,
                      value,
                      attribute,
                    };
                  },
                ),
              };
            },
          );
          observer.next(trackedEntityInstances);
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }

  async savingTrackedEntityInstancesToLocalStorage(
    trackedEntityInstances: TrackedEntityInstance[],
  ) {
    try {
      const attributes = _.flattenDeep(
        _.map(trackedEntityInstances, (trackedEntityInstanceObj) => {
          const trackedEntityInstanceId =
            trackedEntityInstanceObj.trackedEntityInstance;
          return _.map(
            trackedEntityInstanceObj.attributes || [],
            (attributeObj: any) => {
              const { value, attribute } = attributeObj;
              return {
                ...{},
                id: `${trackedEntityInstanceId}-${attribute}`,
                trackedEntityInstance: trackedEntityInstanceId,
                value,
                attribute,
              };
            },
          );
        }),
      );
      const enrollments = _.flattenDeep(
        _.map(trackedEntityInstances, (trackedEntityInstanceObj: any) => {
          return _.map(
            trackedEntityInstanceObj.enrollments || [],
            (enrollment: any) => {
              return { ...enrollment, events: [] };
            },
          );
        }),
      );
      const events = _.flattenDeep(
        _.map(trackedEntityInstances, (trackedEntityInstanceObj: any) => {
          return _.map(
            trackedEntityInstanceObj.enrollments || [],
            (enrollment: any) => enrollment.events || [],
          );
        }),
      );
      trackedEntityInstances = _.map(
        trackedEntityInstances,
        (trackedEntityInstanceObj: any) => {
          trackedEntityInstanceObj = _.omit(
            trackedEntityInstanceObj,
            'attributes',
          );
          return { ...trackedEntityInstanceObj, enrollments: [] };
        },
      );
      console.log({ trackedEntityInstances, events, enrollments, attributes });
    } catch (error) {}
  }

  async savingTrackedEntityInstances(trackedEntityInstances: any[]) {
    const repository = getRepository(
      TrackedEntityInstanceEntity,
      CONNECTION_NAME,
    );
    const chunk = 50;
    await repository.save(trackedEntityInstances, { chunk });
  }

  async savingTrackedEntityInsanceAttributes(attributes: any[]) {
    const repository = getRepository(
      TrackedEntityAttributeValueEntity,
      CONNECTION_NAME,
    );
    const chunk = 50;
    await repository.save(attributes, { chunk });
  }

  async savingTrackedEntityInsanceEnrollements(enrollments: any[]) {
    const repository = getRepository(EnrollmentEntity, CONNECTION_NAME);
    const chunk = 50;
    await repository.save(enrollments, { chunk });
  }

  async savingTrackedEntityInsanceEnrollementEvents(events: any[]) {
    const repository = getRepository(EventEntity, CONNECTION_NAME);
    const chunk = 50;
    await repository.save(events, { chunk });
  }
}
