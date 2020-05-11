import { Program, OrganisationUnit } from '../models';
import { generateUid } from './generate-uid';
import * as _ from 'lodash';

export function generateEvent(
  program: Program,
  programStage: any,
  trackedEntityInstance: any,
  organisationUnit: OrganisationUnit,
) {
  const date = new Date();
  const eventDate = date.toISOString().split('T')[0];
  const enrollment = (trackedEntityInstance
    ? trackedEntityInstance.enrollments || []
    : [])[0];
  return {
    event: generateUid(),
    eventDate,
    dueDate: eventDate,
    program: program ? program.id.split('_')[0] : undefined,
    programStage: programStage ? programStage.id : undefined,
    orgUnit: organisationUnit ? organisationUnit.id : undefined,
    trackedEntityInstance: trackedEntityInstance
      ? trackedEntityInstance.id
      : undefined,
    enrollment: enrollment ? enrollment.id : undefined,
    status: 'ACTIVE',
    dataValues: [],
  };
}
