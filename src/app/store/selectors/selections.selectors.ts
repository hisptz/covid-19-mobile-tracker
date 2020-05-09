import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { SelectionsState } from '../reducers/selections.reducer';
import { OrganisationUnit } from 'src/app/models';

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

export const getCurrentProgramAttribute = createSelector(
  getSelectionsState,
  (selectionsState: SelectionsState) =>
    selectionsState.currentProgramSourceAttribute,
);
