import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, setCurrentEvent } from 'src/app/store';
import { Router } from '@angular/router';
import { generateEvent } from 'src/app/helpers/generate-event';
import { Observable } from 'rxjs';
import { Program, OrganisationUnit } from 'src/app/models';
import {
  getCurrentProgram,
  getCurrentProgramStage,
  getCurrentTrackedEntityInstance,
  getCurrentOrganisationUnit,
  getCurrentProgramStageEvents,
} from 'src/app/store/selectors/selections.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tracked-entity-stage-event-list',
  templateUrl: './tracked-entity-stage-event-list.page.html',
  styleUrls: ['./tracked-entity-stage-event-list.page.scss'],
})
export class TrackedEntityStageEventListPage implements OnInit {
  currentProgram$: Observable<Program>;
  currentTrackedEntityInstance$: Observable<any>;
  currentProgramStage$: Observable<any>;
  currentOrganisationUnit$: Observable<OrganisationUnit>;
  eventList$: Observable<any[]>;
  constructor(private router: Router, private store: Store<State>) {}

  ngOnInit() {
    this.currentProgram$ = this.store.pipe(select(getCurrentProgram));
    this.currentProgramStage$ = this.store.pipe(select(getCurrentProgramStage));
    this.currentTrackedEntityInstance$ = this.store.pipe(
      select(getCurrentTrackedEntityInstance),
    );

    this.currentOrganisationUnit$ = this.store.pipe(
      select(getCurrentOrganisationUnit),
    );
    this.eventList$ = this.store.pipe(select(getCurrentProgramStageEvents));

    this.currentProgram$.pipe(take(1)).subscribe((currentProgram: any) => {
      if (!currentProgram) {
        this.router.navigate(['/chw-home']);
      }
    });
  }
  onManageEvent(e, currentEvent: any) {
    e.stopPropagation();
    console.log(currentEvent);
    this.store.dispatch(setCurrentEvent({ currentEvent }));
    this.router.navigate(['/manage-tracked-entity-event']);
  }

  onAddEvent(e, params: any) {
    e.stopPropagation();

    const currentEvent = generateEvent(
      params.currentProgram,
      params.currentProgramStage,
      params.currentTrackedEntityInstance,
      params.currentOrganisationUnit,
    );

    this.store.dispatch(setCurrentEvent({ currentEvent }));

    this.router.navigate(['/manage-tracked-entity-event']);
  }
}
