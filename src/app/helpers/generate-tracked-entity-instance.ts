import { Program, OrganisationUnit } from '../models';
import { generateUid } from './generate-uid';

export function generateTrackedEntityInstance(
  program: Program,
  organisationUnit: OrganisationUnit,
) {
  return {
    orgUnit: organisationUnit ? organisationUnit.id : undefined,
    trackedEntityInstance: generateUid(),
    trackedEntityType:
      program && program.trackedEntityType
        ? program.trackedEntityType.id
        : undefined,
    featureType: 'NONE',
    enrollments: [],
    relationships: [],
    attributes: [],
  };
}
