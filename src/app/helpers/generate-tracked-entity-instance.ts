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
