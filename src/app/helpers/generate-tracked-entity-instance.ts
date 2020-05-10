import { Program, OrganisationUnit } from '../models';
import { generateUid } from './generate-uid';

export function generateTrackedEntityInstance(
  program: Program,
  organisationUnit: OrganisationUnit,
) {
  const trackedEntityInstance = generateUid();
  const trackedEntityType =
    program && program.trackedEntityType
      ? program.trackedEntityType.id
      : undefined;
  const orgUnit = organisationUnit ? organisationUnit.id : undefined;
  const date = new Date();
  const incidentDate = date.toISOString().split('T')[0];

  return {
    orgUnit,
    trackedEntityInstance,
    trackedEntityType,
    incidentDate,
    featureType: 'NONE',
    enrollments: [
      {
        trackedEntityInstance,
        trackedEntityType,
        enrollment: generateUid(),
        enrollmentDate: incidentDate,
        incidentDate,
        orgUnit,
        program: program.id.split('_')[0],
        status: 'ACTIVE',
        events: [],
      },
    ],
    relationships: [],
    attributes: [],
  };
}
