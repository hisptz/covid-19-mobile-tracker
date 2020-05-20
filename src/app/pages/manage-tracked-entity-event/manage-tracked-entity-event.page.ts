import { Component, OnInit } from '@angular/core';
import { Observable, from, zip } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';
import {
  State,
  setCurrentEvent,
  saveTrackedEntityInstance,
} from 'src/app/store';
import { Router } from '@angular/router';
import {
  getCurrentProgramStage,
  getCurrentEvent,
  getCurrentEventDataValueObject,
  getTrackedEntityInstanceSavingStatus,
  getCurrentProgram,
} from 'src/app/store/selectors/selections.selectors';
import { CurrentUser, Program } from 'src/app/models';
import { UserService } from 'src/app/shared/services/user.service';
import { updateEventWithDataValues } from 'src/app/helpers/update-event-with-data-values';
import * as D2Rule from '@iapps/dhis2-program-rule-engine';
import { convertArrayToObject } from 'src/app/helpers/convert-array-to-object';
import { getDataElementsObject } from 'src/app/helpers/get-data-elements-object';

@Component({
  selector: 'app-manage-tracked-entity-event',
  templateUrl: './manage-tracked-entity-event.page.html',
  styleUrls: ['./manage-tracked-entity-event.page.scss'],
})
export class ManageTrackedEntityEventPage implements OnInit {
  currentProgram$: Observable<Program>;
  currentProgramStage$: Observable<any>;
  currentEvent$: Observable<any>;
  currentUser$: Observable<CurrentUser>;
  currentEventDataValueObject$: Observable<any>;
  isSavingInstance$: Observable<boolean>;
  isFormReady = true;
  dataObject: any;
  dataValuesSavingStatusClass: any;
  programRuleActions: any[];
  constructor(
    private store: Store<State>,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.dataObject = {};
    this.dataValuesSavingStatusClass = {};
    this.currentEvent$ = this.store.pipe(select(getCurrentEvent));
    this.currentEventDataValueObject$ = this.store.pipe(
      select(getCurrentEventDataValueObject),
    );
    this.currentProgram$ = this.store.pipe(select(getCurrentProgram));
    this.currentProgramStage$ = this.store.pipe(select(getCurrentProgramStage));
    this.isSavingInstance$ = this.store.pipe(
      select(getTrackedEntityInstanceSavingStatus),
    );

    this.currentProgram$.pipe(take(1)).subscribe((currentProgram: any) => {
      if (!currentProgram) {
        this.router.navigate(['/chw-home']);
      } else {
        zip(this.currentEvent$, this.currentProgramStage$)
          .pipe(take(1))
          .subscribe((result: any[]) => {
            const dataElementsObject = getDataElementsObject(
              result[1] ? result[1].programStageDataElements : [],
            );

            this._evaluateProgramRules({
              event: result[0],
              dataElementsObject,
              programRules: currentProgram.programRules,
              programRuleVariables: currentProgram.programRuleVariables,
              programRuleActions: currentProgram.programRuleActions,
              optionSets: {},
            });
          });
      }
    });

    this.currentUser$ = from(this.userService.getCurrentUser());
  }
  onUpdateData(
    updatedData: any,
    params,
    shouldSkipProgramRules: boolean = false,
  ) {
    const {
      currentEvent,
      eventObject,
      currentProgram,
      currentProgramStage,
    } = params;
    const dataElementsObject = getDataElementsObject(
      currentProgramStage.programStageDataElements,
    );

    this.dataObject[updatedData.id] = updatedData;

    const eventWithValues = updateEventWithDataValues(
      { ...currentEvent, syncStatus: 'not-synced' },
      {
        ...eventObject,
        ...this.dataObject,
      },
    );

    this._evaluateProgramRules({
      event: eventWithValues,
      dataElementsObject,
      programRules: currentProgram.programRules,
      programRuleVariables: currentProgram.programRuleVariables,
      programRuleActions: currentProgram.programRuleActions,
      optionSets: {},
    });

    console.log(this.programRuleActions);

    this.store.dispatch(
      setCurrentEvent({
        currentEvent: eventWithValues,
      }),
    );
  }

  onEventDateUpdate(eventDate: string, currentEvent) {
    this.store.dispatch(
      setCurrentEvent({
        currentEvent: { ...currentEvent, eventDate },
      }),
    );
  }

  onSave(e) {
    e.stopPropagation();
    this.store.dispatch(saveTrackedEntityInstance());
    // this.router.navigate(['/tracked-entity/stage/events']);
  }

  private _evaluateProgramRules(params: any) {
    const {
      event,
      dataElementsObject,
      programRules,
      programRuleVariables,
      programRuleActions,
      optionSets,
    } = params;

    this.programRuleActions = D2Rule.executeWithAction(
      event,
      dataElementsObject,
      programRules,
      programRuleVariables,
      programRuleActions,
      optionSets || {},
    );
  }
}
