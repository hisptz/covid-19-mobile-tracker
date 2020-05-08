import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { OrganisationState } from '../reducers/org-unit.reducer';

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
export const getOrganisationUnitState = createSelector(
  getRootState,
  (state: State) => state.organisationUnit,
);

export const getCurrentOrganisationUnit = createSelector(
  getOrganisationUnitState,
  (organisationUnitState: OrganisationState) =>
    organisationUnitState.currentOrganisationUnit,
);
