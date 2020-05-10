export function updateTrackedEntityInstanceWithAtrributes(
  trackedEntityInstance,
  trackedEntityAttributeValuesObject,
) {
  if (!trackedEntityInstance || !trackedEntityAttributeValuesObject) {
    return trackedEntityInstance;
  }

  const trackedEntityAttributeValuesKeys = Object.keys(
    trackedEntityAttributeValuesObject,
  );
  return {
    ...trackedEntityInstance,
    attributes: (trackedEntityAttributeValuesKeys || []).map((key) => {
      return {
        attribute: key,
        value: trackedEntityAttributeValuesObject[key],
      };
    }),
  };
}
