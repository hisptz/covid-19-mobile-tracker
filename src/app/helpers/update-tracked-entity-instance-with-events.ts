import * as _ from 'lodash';
import { TrackedEntityInstance } from '../models';
export function updateTrackedEntityInstanceWithEvent(
  trackedEntityInstance: TrackedEntityInstance,
  updatedEvent: any,
) {
  if (!trackedEntityInstance) {
    return null;
  }
  const enrollments = trackedEntityInstance.enrollments.map(
    (enrollment: any) => {
      if (updatedEvent.program !== enrollment.program) {
        return enrollment;
      }
      const availableEvent = _.find(enrollment.events, ['id', updatedEvent.id]);
      const availableEventIndex = enrollment.events.indexOf(availableEvent);
      return {
        ...enrollment,
        events:
          availableEventIndex !== -1
            ? [
                ..._.slice(enrollment.events, 0, availableEventIndex),
                updatedEvent,
                ..._.slice(enrollment.events, availableEventIndex + 1),
              ]
            : [...enrollment.events, updatedEvent],
      };
    },
  );
  return {
    ...trackedEntityInstance,
    enrollments,
  };
}
