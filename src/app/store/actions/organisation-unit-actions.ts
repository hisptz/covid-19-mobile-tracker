import { createAction, props } from '@ngrx/store';
import { OrganisationUnit } from 'src/app/models';

export const setCurrentOrgUnit = createAction(
  '[OrgUnit] Set current org-unit',
  props<{ currentOrganisationUnit: OrganisationUnit }>(),
);
