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

import { OrganisationUnit, Program } from 'src/app/models';
import { createReducer, on } from '@ngrx/store';
import {
  setCurrentOrgUnit,
  setCurrentProgram,
  setCurrentTrackedEntityInstance,
  setCurrentProgramStage,
  setCurrentEvent,
  saveTrackedEntityInstance,
  saveTrackedEntityInstanceComplete,
} from '../actions/selections-actions';
import { updateTrackedEntityInstanceWithEvent } from 'src/app/helpers/update-tracked-entity-instance-with-events';

export interface SelectionsState {
  currentOrganisationUnit: OrganisationUnit;
  currentProgram: Program;
  currentProgramTrackedEntityAttribute: any;
  currentTrackedEntityInstance: any;
  currentProgramStage: any;
  currentEvent: any;
  isSavingTrackedEntityInstance: boolean;
}

const initialSelectionsState: SelectionsState = {
  currentOrganisationUnit: null,
  currentProgram: null,
  currentProgramTrackedEntityAttribute: null,
  currentTrackedEntityInstance: null,
  currentProgramStage: null,
  currentEvent: null,
  isSavingTrackedEntityInstance: false,
};

const reducer = createReducer(
  initialSelectionsState,
  on(setCurrentOrgUnit, (state, { currentOrganisationUnit }) => ({
    ...state,
    currentOrganisationUnit,
  })),
  on(
    setCurrentProgram,
    (state, { currentProgram, currentProgramTrackedEntityAttribute }) => ({
      ...state,
      currentProgram,
      currentProgramTrackedEntityAttribute,
    }),
  ),
  on(
    setCurrentTrackedEntityInstance,
    (state, { currentTrackedEntityInstance }) => ({
      ...state,
      currentTrackedEntityInstance,
    }),
  ),
  on(setCurrentProgramStage, (state, { currentProgramStage }) => ({
    ...state,
    currentProgramStage,
  })),
  on(setCurrentEvent, (state, { currentEvent }) => ({
    ...state,
    currentEvent,
    currentTrackedEntityInstance: updateTrackedEntityInstanceWithEvent(
      state.currentTrackedEntityInstance,
      currentEvent,
    ),
  })),
  on(saveTrackedEntityInstance, (state) => ({
    ...state,
    isSavingTrackedEntityInstance: true,
  })),
  on(saveTrackedEntityInstanceComplete, (state) => ({
    ...state,
    isSavingTrackedEntityInstance: false,
  })),
);

export function selectionsReducer(state: SelectionsState, action) {
  return reducer(state, action);
}
