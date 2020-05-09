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
} from '../actions/selections-actions';

export interface SelectionsState {
  currentOrganisationUnit: OrganisationUnit;
  currentProgram: Program;
  currentProgramSourceAttribute: string;
}

const initialSelectionsState: SelectionsState = {
  currentOrganisationUnit: null,
  currentProgram: null,
  currentProgramSourceAttribute: undefined,
};

const reducer = createReducer(
  initialSelectionsState,
  on(setCurrentOrgUnit, (state, { currentOrganisationUnit }) => ({
    ...state,
    currentOrganisationUnit,
  })),
  on(
    setCurrentProgram,
    (state, { currentProgram, currentProgramSourceAttribute }) => ({
      ...state,
      currentProgram,
      currentProgramSourceAttribute,
    }),
  ),
);

export function selectionsReducer(state: SelectionsState, action) {
  return reducer(state, action);
}
