import { Events } from '../models';
import * as _ from 'lodash';

export function updateEventWithDataValues(event: any, eventObject): Events {
  if (!event || !eventObject) {
    return event;
  }

  const dataValuesKeys = Object.keys(eventObject);
  return {
    ...event,
    dataValues: (dataValuesKeys || [])
      .map((key) => {
        if (key.split('-')[0] === 'undefined') {
          return null;
        }
        return {
          dataElement: key.split('-')[0],
          value: eventObject[key] ? eventObject[key].value : '',
        };
      })
      .filter((dataValue) => dataValue),
  };
}
