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
    currentProgramTrackedEntityAttribute?: any;
  }>(),
);

export const setCurrentTrackedEntityInstance = createAction(
  '[OrgUnit] Set current tracked entity instance',
  props<{
    currentTrackedEntityInstance: any;
  }>(),
);

export const setCurrentProgramStage = createAction(
  '[OrgUnit] Set current program stage',
  props<{
    currentProgramStage: any;
  }>(),
);

export const setCurrentEvent = createAction(
  '[Selections] Set current event',
  props<{
    currentEvent: any;
  }>(),
);

export const saveTrackedEntityInstance = createAction(
  '[Selections] Save current tracked entity instance',
);

export const saveTrackedEntityInstanceComplete = createAction(
  '[Selections] Save current tracked entity instance complete',
);
