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
 *
 */
import * as _ from 'lodash';
import { TrackedEntityInstance } from '../models';
export function updateTrackedEntityInstanceWithEvent(
  trackedEntityInstance: TrackedEntityInstance,
  updatedEvent: any,
) {
  if (!trackedEntityInstance) {
    return null;
  }
  const enrollments = trackedEntityInstance.enrollments.map(
    (enrollment: any) => {
      if (updatedEvent.program !== enrollment.program) {
        return enrollment;
      }
      const availableEvent = _.find(enrollment.events, ['id', updatedEvent.id]);
      const availableEventIndex = enrollment.events.indexOf(availableEvent);
      return {
        ...enrollment,
        events:
          availableEventIndex !== -1
            ? [
                ..._.slice(enrollment.events, 0, availableEventIndex),
                updatedEvent,
                ..._.slice(enrollment.events, availableEventIndex + 1),
              ]
            : [...enrollment.events, updatedEvent],
      };
    },
  );
  return {
    ...trackedEntityInstance,
    enrollments,
  };
}
