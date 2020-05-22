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
import { Program, OrganisationUnit, Events } from '../models';
import { generateUid } from './generate-uid';
import * as _ from 'lodash';
export function generateEvent(
  program: Program,
  programStage: any,
  trackedEntityInstance: any,
  organisationUnit?: OrganisationUnit,
): Events {
  const date = new Date();
  const eventDate = date.toISOString().split('T')[0];
  const id = generateUid();
  const enrollment = (trackedEntityInstance
    ? trackedEntityInstance.enrollments || []
    : [])[0];
  return {
    id,
    event: id,
    eventDate,
    dueDate: eventDate,
    program: program ? program.id.split('_')[0] : undefined,
    programStage: programStage ? programStage.id : undefined,
    orgUnit: organisationUnit
      ? organisationUnit.id
      : trackedEntityInstance
      ? trackedEntityInstance.orgUnit
      : undefined,
    trackedEntityInstance: trackedEntityInstance
      ? trackedEntityInstance.id
      : undefined,
    status: 'ACTIVE',
    dataValues: [],
    deleted: 'false',
    enrollment: enrollment ? enrollment.id : undefined,
    // TODO: Find best way to get attributeCategoryOptions attribute
    attributeCategoryOptions: '',
  };
}
