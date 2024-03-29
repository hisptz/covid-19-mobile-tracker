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
import { ProgramFormDataService } from './program-form-data.service';

@Injectable({
  providedIn: 'root',
})
export class SynchronizationService {
  subscription: any;

  constructor(private programFormDataService: ProgramFormDataService) {}

  stopSynchronization() {
    if (this.subscription) {
      clearInterval(this.subscription);
    }
  }

  startSynchronization() {
    const time = 1000 * 60 * 3;
    this.stopSynchronization();
    this.subscription = setInterval(() => {
      this.getOfflineDataForSync().then((data) => {
        this.syncOfflineData(data).then(() => {});
      });
    }, time);
  }

  async getOfflineDataForSync() {
    const offlineTrackerData = await this.programFormDataService.getSavedTrackedEntityInstancesFromLocalStorage(
      null,
      null,
    );
    return {
      tracker: _.map(
        _.filter(
          offlineTrackerData,
          (data: any) =>
            data && data.syncStatus && data.syncStatus !== 'synced',
        ),
        (trackedEntityInstanceObj: any) => {
          const { trackedEntity } = trackedEntityInstanceObj;
          return {
            ...trackedEntityInstanceObj,
            trackedEntityType: trackedEntity,
            enrollments: _.map(
              trackedEntityInstanceObj.enrollments || [],
              (enrollmentObj: any) => {
                return {
                  ...enrollmentObj,
                  trackedEntityType: trackedEntity,
                  events: _.map(enrollmentObj.events || [], (eventObj: any) => {
                    delete eventObj.deleted;
                    return { ...eventObj, event: eventObj.id || '' };
                  }),
                };
              },
            ),
            attributes: _.map(
              trackedEntityInstanceObj.attributes || [],
              (attribute: any) => {
                delete attribute.trackedEntityInstance;
                delete attribute.id;
                return { ...{}, ...attribute };
              },
            ),
          };
        },
      ),
    };
  }

  async syncOfflineData(offfloneData: any) {
    try {
      for (const key of _.keys(offfloneData)) {
        if (key === 'tracker') {
          const trackedEntityInstances = offfloneData[key];
          await this.programFormDataService.syncOfflineTrackedEntityInstancesToServer(
            trackedEntityInstances,
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    return;
  }
}
