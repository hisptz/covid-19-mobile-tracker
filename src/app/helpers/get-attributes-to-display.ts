import { Program } from '../models';
import * as _ from 'lodash';

export function getAttributeToDisplay(
  currentProgram: Program,
  numberOfAttribute?: number,
): any[] {
  if (!currentProgram) {
    return [];
  }
  let attributesToDisplay = _.filter(
    currentProgram.programTrackedEntityAttributes || [],
    (programTrackedEntityAttribute: any) =>
      programTrackedEntityAttribute &&
      programTrackedEntityAttribute.displayInList,
  );

  attributesToDisplay =
    attributesToDisplay.length > 0
      ? _.chunk(
          attributesToDisplay,
          numberOfAttribute || attributesToDisplay.length,
        )[0]
      : currentProgram.programTrackedEntityAttributes || [];
  return _.flattenDeep(
    _.map(attributesToDisplay, (programTrackedEntityAttribute) => {
      const trackedEntityAttribute =
        programTrackedEntityAttribute.trackedEntityAttribute || null;
      return trackedEntityAttribute
        ? {
            id: trackedEntityAttribute.id || '',
            name:
              trackedEntityAttribute.formName ||
              trackedEntityAttribute.name ||
              '',
          }
        : [];
    }),
  );
}
