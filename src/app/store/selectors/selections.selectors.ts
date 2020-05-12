import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { SelectionsState } from '../reducers/selections.reducer';
import {
  OrganisationUnit,
  TrackedEntityInstance,
  Enrollment,
  Program,
} from 'src/app/models';
import * as _ from 'lodash';
import { getAttributeToDisplay } from 'src/app/helpers/get-attributes-to-display';

/**
 * Copyright (C) 2020 UDSM DHIS2 PROJECT
 *
 * lab is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * lab is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with lab. If not, see <http://www.gnu.org/licenses/>.
 */
export const getSelectionsState = createSelector(
  getRootState,
  (state: State) => state.selections,
);

export const getCurrentOrganisationUnit = createSelector(
  getSelectionsState,
  (organisationUnitState: SelectionsState) =>
    organisationUnitState.currentOrganisationUnit,
);

export const getCurrentOrganisationUnitIds = createSelector(
  getCurrentOrganisationUnit,
  (organisationUnit: OrganisationUnit) =>
    organisationUnit ? [organisationUnit.id] : [],
);

export const getCurrentProgram = createSelector(
  getSelectionsState,
  (selectionsState: SelectionsState) => selectionsState.currentProgram,
);

export const getCurrentProgramTrackedEntityAttribute = createSelector(
  getSelectionsState,
  (selectionsState: SelectionsState) =>
    selectionsState.currentProgramTrackedEntityAttribute,
);

export const getCurrentTrackedEntityInstance = createSelector(
  getSelectionsState,
  (selectionsState: SelectionsState) =>
    selectionsState.currentTrackedEntityInstance,
);

export const getTrackedEntityInstanceAttributeObject = createSelector(
  getCurrentTrackedEntityInstance,
  (trackedEntityInstance: TrackedEntityInstance) => {
    const attributeObject = {};

    (trackedEntityInstance
      ? trackedEntityInstance.attributes || []
      : []
    ).forEach((attribute: any) => {
      attributeObject[`${attribute.attribute}-trackedEntityAttribute`] = {
        id: `${attribute.attribute}-trackedEntityAttribute`,
        value: attribute.value,
        status: '',
      };
    });

    return attributeObject;
  },
);

export const getTrackedEntityInstanceDates = createSelector(
  getCurrentTrackedEntityInstance,
  (trackedEntityInstance: TrackedEntityInstance) => {
    const enrollment: Enrollment = (trackedEntityInstance
      ? trackedEntityInstance.enrollments || []
      : [])[0];

    if (!enrollment) {
      const date = new Date();

      return date.toISOString().split('T')[0];
    }

    return {
      enrollmentDate: enrollment.enrollmentDate,
      incidentDate: enrollment.incidentDate,
    };
  },
);

export const getTrackedAttributeToDisplay = createSelector(
  getCurrentProgram,
  (program: Program) => getAttributeToDisplay(program),
);

export const getCurrentProgramStage = createSelector(
  getSelectionsState,
  (selectionsState: SelectionsState) => selectionsState.currentProgramStage,
);

export const getCurrentEvent = createSelector(
  getSelectionsState,
  (selectionsState: SelectionsState) => selectionsState.currentEvent,
);

export const getCurrentEventDataValueObject = createSelector(
  getCurrentEvent,
  (event: any) => {
    const eventObject = {};

    (event ? event.dataValues || [] : []).forEach((dataValue: any) => {
      eventObject[`${dataValue.dataElement}-dataElement`] = {
        id: `${dataValue.dataElement}-dataElement`,
        value: dataValue.value,
        status: '',
      };
    });

    return eventObject;
  },
);

export const getCurrentProgramStageEvents = createSelector(
  getCurrentProgramStage,
  getCurrentTrackedEntityInstance,
  (programStage: any, trackedEntityInstance: TrackedEntityInstance) => {
    if (!programStage || !trackedEntityInstance) {
      return [];
    }

    const events = _.flatten(
      (trackedEntityInstance
        ? trackedEntityInstance.enrollments
        : []
      ).map((enrollment: Enrollment) =>
        (enrollment.events || []).filter(
          (event: any) =>
            programStage && event && event.programStage === programStage.id,
        ),
      ),
    );

    return events;
  },
);
