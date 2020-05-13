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
import { OrganisationUnit, Program, TrackedEntityInstance } from '../models';
import { generateUid } from './generate-uid';

export function generateTrackedEntityInstance(
  program: Program,
  organisationUnit: OrganisationUnit,
): TrackedEntityInstance {
  const trackedEntityInstance = generateUid();
  const trackedEntity =
    program && program.trackedEntityType
      ? program.trackedEntityType.id
      : undefined;
  const orgUnit = organisationUnit ? organisationUnit.id : undefined;
  const date = new Date();
  const incidentDate = date.toISOString().split('T')[0];
  const enrollmentId = generateUid();

  // TODO: This hardcoding is only relevant to this context, need softcoding
  const defaultAttribute =
    program &&
    program.currentProgramTrackedEntityAttribute &&
    program.currentProgramTrackedEntityAttribute.trackedEntityAttribute
      ? {
          attribute:
            program.currentProgramTrackedEntityAttribute.trackedEntityAttribute
              .id,
          value: 'true',
        }
      : null;

  return {
    id: trackedEntityInstance,
    orgUnitName: organisationUnit ? organisationUnit.name : undefined,
    orgUnit,
    trackedEntityInstance,
    trackedEntity,
    deleted: false,
    syncStatus: 'not-synced',
    enrollments: [
      {
        id: enrollmentId,
        trackedEntityInstance,
        trackedEntity,
        enrollment: enrollmentId,
        enrollmentDate: incidentDate,
        incidentDate,
        orgUnit,
        program: program.id.split('_')[0],
        status: 'ACTIVE',
        events: [],
        attributes: [],
        syncStatus: 'not-synced',
      },
    ],
    relationships: [],
    attributes: defaultAttribute ? [defaultAttribute] : [],
  };
}
