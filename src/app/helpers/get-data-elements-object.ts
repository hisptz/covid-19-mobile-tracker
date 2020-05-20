import { convertArrayToObject } from './convert-array-to-object';
import { flatten } from 'lodash';

export function getDataElementsObject(programStageDataElements) {
  return convertArrayToObject(
    flatten(
      programStageDataElements.map(
        (programStageDataElement) => programStageDataElement.dataElement,
      ),
    ),
    'id',
  );
}
