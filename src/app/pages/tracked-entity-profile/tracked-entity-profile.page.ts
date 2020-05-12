import { Component, OnInit } from '@angular/core';
import { Program, TrackedEntityInstance } from 'src/app/models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store';
import {
  getCurrentProgram,
  getCurrentTrackedEntityInstance,
  getTrackedEntityInstanceDates,
  getTrackedAttributeToDisplay,
} from 'src/app/store/selectors/selections.selectors';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { getAttributeToDisplay } from 'src/app/helpers/get-attributes-to-display';

@Component({
  selector: 'app-tracked-entity-profile',
  templateUrl: './tracked-entity-profile.page.html',
  styleUrls: ['./tracked-entity-profile.page.scss'],
})
export class TrackedEntityProfilePage implements OnInit {
  currentProgram$: Observable<Program>;
  currentTrackedEntityInstance$: Observable<TrackedEntityInstance>;
  trackedEntityInstanceDates$: Observable<any>;
  attributesToDisplay$: Observable<any[]>;
  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit() {
    this.currentProgram$ = this.store.pipe(select(getCurrentProgram));
    this.currentTrackedEntityInstance$ = this.store.pipe(
      select(getCurrentTrackedEntityInstance),
    );
    this.trackedEntityInstanceDates$ = this.store.pipe(
      select(getTrackedEntityInstanceDates),
    );
    this.attributesToDisplay$ = this.store.pipe(
      select(getTrackedAttributeToDisplay),
    );

    this.currentProgram$.pipe(take(1)).subscribe((currentProgram: Program) => {
      if (!currentProgram) {
        this.router.navigate(['/chw-home']);
      }
    });
  }
}
