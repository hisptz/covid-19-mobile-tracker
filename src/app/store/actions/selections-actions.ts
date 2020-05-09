import { createAction, props } from '@ngrx/store';
import { OrganisationUnit, Program } from 'src/app/models';

export const setCurrentOrgUnit = createAction(
  '[OrgUnit] Set current org-unit',
  props<{ currentOrganisationUnit: OrganisationUnit }>(),
);

export const setCurrentProgram = createAction(
  '[OrgUnit] Set current program',
  props<{
    currentProgram: Program;
    currentProgramTrackedEntityAttribute: any;
  }>(),
);
