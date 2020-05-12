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
import { getRepository, In } from 'typeorm';
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

  async syncOfflineTrackedEntityInstancesToServer(
    trackedEntityInstances: any[],
  ) {
    // TODO upload data in chunk
    const url = `api/trackedEntityInstances?strategy=CREATE_AND_UPDATE`;
    const teiResponse = await this.httpClientService.post(url, trackedEntityInstances);
    console.log(teiResponse);
  }

  discoveringTrackedEntityInstancesFromServerAndLocalStorage(
    organisationUnitId: string,
    programId: string,
    pageSize = 100,
  ): Observable<any> {
    return new Observable((observer) => {
      let trackedEntityInstances = [];
      let isCompleted = false;
      this.getSavedTrackedEntityInstancesFromLocalStorage(
        organisationUnitId,
        programId,
      ).then((offlineData) => {
        trackedEntityInstances = offlineData;
        observer.next({
          isCompleted,
          teis: _.flattenDeep(trackedEntityInstances),
        });
        this.discoveringTrackedEntityInstancesFromServer(
          organisationUnitId,
          programId,
          pageSize,
        ).subscribe((onlineData) => {
          this.getMergedTrackedEntityInstances(offlineData, onlineData).then(
            (teis: TrackedEntityInstance[]) => {
              trackedEntityInstances = teis;
              isCompleted = true;
              observer.next({
                isCompleted,
                teis: _.flattenDeep(trackedEntityInstances),
              });
              observer.complete();
            },
          );
        });
      });
    });
  }

  async getMergedTrackedEntityInstances(
    offlineData: TrackedEntityInstance[],
    onlineData: TrackedEntityInstance[],
  ) {
    let filteredOnLineData = [];
    try {
      const offllineTeiIds = _.flattenDeep(
        _.map(
          offlineData,
          (tei: TrackedEntityInstance) => tei.trackedEntityInstance || [],
        ),
      );
      filteredOnLineData = _.filter(
        onlineData,
        (tei: TrackedEntityInstance) => {
          return (
            tei &&
            tei.trackedEntityInstance &&
            !offllineTeiIds.includes(tei.trackedEntityInstance)
          );
        },
      );
      if (filteredOnLineData.length > 0) {
        await this.savingTrackedEntityInstancesToLocalStorage(
          filteredOnLineData,
        );
      }
    } catch (error) {}
    return _.flattenDeep(_.concat(offlineData, filteredOnLineData));
  }

  discoveringTrackedEntityInstancesFromServer(
    organisationUnitId: string,
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
                      events: _.map(
                        enrollmentObj.events || [],
                        (eventObj: any) => {
                          return {
                            ...eventObj,
                            id: eventObj.event,
                            syncStatus,
                          };
                        },
                      ),
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
          console.log({ error });
          observer.next(trackedEntityInstances);
          observer.complete();
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
            (enrollmentObj: any) => {
              return {
                ...enrollmentObj,
                id: enrollmentObj.enrollment,
                events: [],
              };
            },
          );
        }),
      );
      const events = _.flattenDeep(
        _.map(trackedEntityInstances, (trackedEntityInstanceObj: any) => {
          return _.map(
            trackedEntityInstanceObj.enrollments || [],
            (enrollment: any) => {
              return _.map(enrollment.events || [], (eventObj: any) => {
                return { ...eventObj, id: eventObj.event || '' };
              });
            },
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
          return {
            ...trackedEntityInstanceObj,
            id: trackedEntityInstanceObj.trackedEntityInstance,
            enrollments: [],
          };
        },
      );
      await this.savingTrackedEntityInstances(trackedEntityInstances);
      await this.savingTrackedEntityInsanceAttributes(attributes);
      await this.savingTrackedEntityInsanceEnrollements(enrollments);
      await this.savingTrackedEntityInsanceEnrollementEvents(events);
    } catch (error) {
      console.log(error);
    }
  }

  async getSavedTrackedEntityInstancesFromLocalStorage(
    organisationUnitId: string,
    programId: string,
  ) {
    let trackedEntityInstances = [];
    try {
      const repository = getRepository(
        TrackedEntityInstanceEntity,
        CONNECTION_NAME,
      );
      const trackedEntityInstanceEntities = organisationUnitId
        ? await repository.find({
            orgUnit: In([organisationUnitId]),
          })
        : await repository.find();
      const ids = _.flattenDeep(
        trackedEntityInstanceEntities,
        (trackedEntityInstanceEntity: any) =>
          trackedEntityInstanceEntity.id || [],
      );
      trackedEntityInstances = await this.getSavingTrackedEntityInstancesByIds(
        ids,
      );
    } catch (error) {}
    return programId
      ? _.filter(trackedEntityInstances, (trackedEntityInstanceObj: any) => {
          const enrollments = _.filter(
            trackedEntityInstanceObj.enrollments || [],
            (enrollmentObj: any) =>
              enrollmentObj &&
              enrollmentObj.program &&
              enrollmentObj.program === programId,
          );
          return enrollments.length > 0;
        })
      : trackedEntityInstances;
  }

  async getSavingTrackedEntityInstancesByIds(ids: string[]) {
    const trackedEntityInstances = [];
    try {
      const repository = getRepository(
        TrackedEntityInstanceEntity,
        CONNECTION_NAME,
      );
      const trackedEntityInstanceEntities =
        ids && ids.length > 0
          ? await repository.findByIds(ids)
          : await repository.find();
      for (const trackedEntityInstanceEntity of trackedEntityInstanceEntities) {
        const trackedEntityInstance =
          trackedEntityInstanceEntity.trackedEntityInstance;
        const attributes = await this.getSavingTrackedEntityInsanceAttributes(
          trackedEntityInstance,
        );
        const enrollments = await this.getSvingTrackedEntityInsanceEnrollements(
          trackedEntityInstance,
        );
        const events = await this.getSavingTrackedEntityInsanceEnrollementEvents(
          trackedEntityInstance,
        );
        const allSyncStatus = _.uniq(
          _.flattenDeep(
            _.concat(
              trackedEntityInstanceEntity.syncStatus,
              _.concat(
                _.map(
                  enrollments,
                  (enrollmentObj: any) => enrollmentObj.syncStatus || [],
                ),
                _.map(events, (eventObj: any) => eventObj.syncStatus || []),
              ),
            ),
          ),
        );
        const syncStatus =
          allSyncStatus.length === 1 ? allSyncStatus[0] : 'not-synced';
        trackedEntityInstances.push({
          ...trackedEntityInstanceEntity,
          attributes,
          syncStatus,
          enrollments: _.flattenDeep(
            _.map(enrollments, (enrollment: any) => {
              const program = enrollment.program || '';
              return {
                ...enrollment,
                events: _.map(
                  _.filter(
                    events,
                    (eventObj: any) =>
                      eventObj &&
                      eventObj.program &&
                      eventObj.program === program,
                  ),
                  (eventObj: any) => {
                    return { ...{}, ...eventObj };
                  },
                ),
              };
            }),
          ),
        });
      }
    } catch (error) {}
    return trackedEntityInstances;
  }

  async getSavingTrackedEntityInsanceAttributes(trackedEntityInstance: string) {
    const repository = getRepository(
      TrackedEntityAttributeValueEntity,
      CONNECTION_NAME,
    );
    return await repository.find({
      trackedEntityInstance: In([trackedEntityInstance]),
    });
  }

  async getSvingTrackedEntityInsanceEnrollements(
    trackedEntityInstance: string,
  ) {
    const repository = getRepository(EnrollmentEntity, CONNECTION_NAME);
    return await repository.find({
      trackedEntityInstance: In([trackedEntityInstance]),
    });
  }

  async getSavingTrackedEntityInsanceEnrollementEvents(
    trackedEntityInstance: string,
  ) {
    const repository = getRepository(EventEntity, CONNECTION_NAME);
    return await repository.find({
      trackedEntityInstance: In([trackedEntityInstance]),
    });
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
