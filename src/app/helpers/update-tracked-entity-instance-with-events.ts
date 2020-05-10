import * as _ from 'lodash';
export function updateTrackedEntityInstanceWithEvent(
  trackedEntityInstance,
  updatedEvent,
) {
  if (!trackedEntityInstance) {
    return null;
  }
  const enrollments = trackedEntityInstance.enrollments.map(
    (enrollment: any) => {
      if (updatedEvent.enrollment !== enrollment.enrollment) {
        return enrollment;
      }
      const availableEvent = _.find(enrollment.events, [
        'event',
        updatedEvent.event,
      ]);

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
