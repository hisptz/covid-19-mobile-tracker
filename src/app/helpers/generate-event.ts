import { Program, OrganisationUnit, Events } from '../models';
import { generateUid } from './generate-uid';
import * as _ from 'lodash';
export function generateEvent(
  program: Program,
  programStage: any,
  trackedEntityInstance: any,
  organisationUnit: OrganisationUnit,
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
    orgUnit: organisationUnit ? organisationUnit.id : undefined,
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
