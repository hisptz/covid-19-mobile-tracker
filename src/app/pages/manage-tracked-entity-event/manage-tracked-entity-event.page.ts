import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { State, setCurrentEvent } from 'src/app/store';
import { Router } from '@angular/router';
import {
  getCurrentProgramStage,
  getCurrentEvent,
} from 'src/app/store/selectors/selections.selectors';
import { CurrentUser } from 'src/app/models';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-manage-tracked-entity-event',
  templateUrl: './manage-tracked-entity-event.page.html',
  styleUrls: ['./manage-tracked-entity-event.page.scss'],
})
export class ManageTrackedEntityEventPage implements OnInit {
  currentProgramStage$: Observable<any>;
  currentEvent$: Observable<any>;
  currentUser$: Observable<CurrentUser>;
  isFormReady: boolean = true;
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
    this.currentProgramStage$ = this.store.pipe(select(getCurrentProgramStage));
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
    currentEvent,
    shouldSkipProgramRules: boolean = false,
  ) {
    console.log(updatedData);
    const dataValues = [];
    const { id } = updatedData;
    if (id) {
      const newValue = updatedData.value;
      const hasNoOldValue =
        this.dataObject && this.dataObject[id] && this.dataObject[id].value
          ? false
          : true;
      const oldValue = !hasNoOldValue ? this.dataObject[id].value : newValue;
      if (oldValue !== newValue || hasNoOldValue) {
        currentEvent.syncStatus = 'not-synced';
        this.dataObject[updatedData.id] = updatedData;
      }
    }
    Object.keys(this.dataObject).forEach((key: any) => {
      let dataElementId = key.split('-')[0];
      if (dataElementId) {
        dataValues.push({
          dataElement: dataElementId,
          value: this.dataObject[key].value,
        });
      }
    });
    if (dataValues && dataValues.length > 0) {
      this.store.dispatch(
        setCurrentEvent({ currentEvent: { ...currentEvent, dataValues } }),
      );
    }
  }

  onEventDateUpdate(eventDate: string, currentEvent) {
    this.store.dispatch(
      setCurrentEvent({
        currentEvent: { ...currentEvent, eventDate },
      }),
    );
  }

  onSave(e, currentEvent) {
    console.log(currentEvent);
    e.stopPropagation();
  }
}
