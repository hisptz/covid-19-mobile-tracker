import { TrackedEntityInstance, Enrollment } from '../models';

export function updateTrackedEntityInstanceWithAtrributes(
  trackedEntityInstance: TrackedEntityInstance,
  trackedEntityAttributeValuesObject,
): TrackedEntityInstance {
  if (!trackedEntityInstance || !trackedEntityAttributeValuesObject) {
    return trackedEntityInstance;
  }

  const trackedEntityAttributeValuesKeys = Object.keys(
    trackedEntityAttributeValuesObject,
  );
  return {
    ...trackedEntityInstance,
    enrollments: (trackedEntityInstance.enrollments || []).map(
      (enrollment: Enrollment) => {
        return {
          ...enrollment,
          attributes: (trackedEntityAttributeValuesKeys || []).map((key) => {
            return {
              attribute: key,
              value: trackedEntityAttributeValuesObject[key],
            };
          }),
        };
      },
    ),
  };
}
