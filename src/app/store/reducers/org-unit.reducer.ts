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

import { OrganisationUnit } from 'src/app/models';
import { createReducer, on } from '@ngrx/store';
import { setCurrentOrgUnit } from '../actions/organisation-unit-actions';

export interface OrganisationState {
  currentOrganisationUnit: OrganisationUnit;
}

const initialOrganisationUnitState: OrganisationState = {
  currentOrganisationUnit: null,
};

const reducer = createReducer(
  initialOrganisationUnitState,
  on(setCurrentOrgUnit, (state, { currentOrganisationUnit }) => ({
    ...state,
    currentOrganisationUnit,
  })),
);

export function organisationUnitReducer(state: OrganisationState, action) {
  return reducer(state, action);
}
