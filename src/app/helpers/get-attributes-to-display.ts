import { Program } from '../models';
import * as _ from 'lodash';

export function getAttributeToDisplay(currentProgram: Program) {
  const numberOfAttribute = 3;
  let atteibutesToDisplay = _.filter(
    currentProgram.programTrackedEntityAttributes || [],
    (programTrackedEntityAttribute: any) =>
      programTrackedEntityAttribute &&
      programTrackedEntityAttribute.displayInList,
  );
  atteibutesToDisplay =
    atteibutesToDisplay.length > 0
      ? _.chunk(atteibutesToDisplay, numberOfAttribute)[0]
      : currentProgram.programTrackedEntityAttributes || [];
  return _.flattenDeep(
    _.map(atteibutesToDisplay, (programTrackedEntityAttribute) => {
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
