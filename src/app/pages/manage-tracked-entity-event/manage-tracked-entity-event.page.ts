import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
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
} from 'src/app/store/selectors/selections.selectors';
import { CurrentUser } from 'src/app/models';
import { UserService } from 'src/app/shared/services/user.service';
import { updateEventWithDataValues } from 'src/app/helpers/update-event-with-data-values';
import * as d2Rule from '@iapps/dhis2-program-rule-engine';

@Component({
  selector: 'app-manage-tracked-entity-event',
  templateUrl: './manage-tracked-entity-event.page.html',
  styleUrls: ['./manage-tracked-entity-event.page.scss'],
})
export class ManageTrackedEntityEventPage implements OnInit {
  currentProgramStage$: Observable<any>;
  currentEvent$: Observable<any>;
  currentUser$: Observable<CurrentUser>;
  currentEventDataValueObject$: Observable<any>;
  isSavingInstance$: Observable<boolean>;
  isFormReady = true;
  dataObject: any;
  dataValuesSavingStatusClass: any;
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
    this.currentProgramStage$ = this.store.pipe(select(getCurrentProgramStage));
    this.isSavingInstance$ = this.store.pipe(
      select(getTrackedEntityInstanceSavingStatus),
    );

    this.currentProgramStage$
      .pipe(take(1))
      .subscribe((currentProgramStage: any) => {
        if (!currentProgramStage) {
          this.router.navigate(['/chw-home']);
        }
      });

    this.currentUser$ = from(this.userService.getCurrentUser());
  }
  onUpdateData(
    updatedData: any,
    params,
    shouldSkipProgramRules: boolean = false,
  ) {
    const { currentEvent, eventObject } = params;
    console.log(d2Rule.execute({}, {}, [], [], {}));
    this.dataObject[updatedData.id] = updatedData;
    this.store.dispatch(
      setCurrentEvent({
        currentEvent: updateEventWithDataValues(
          { ...currentEvent, syncStatus: 'not-synced' },
          {
            ...eventObject,
            ...this.dataObject,
          },
        ),
      }),
    );
  }

  onEventDateUpdate(eventDate: string, currentEvent) {
    console.log({ currentEvent });
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
}
