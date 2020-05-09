import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Program, OrganisationUnit } from 'src/app/models';
import { Store, select } from '@ngrx/store';
import { State, setCurrentTrackedEntityInstance } from 'src/app/store';
import { Router } from '@angular/router';
import { getCurrentProgram } from 'src/app/store/selectors/selections.selectors';
import { take } from 'rxjs/operators';
import { generateTrackedEntityInstance } from 'src/app/helpers/generate-tracked-entity-instance';

@Component({
  selector: 'app-tracked-entity-list',
  templateUrl: './tracked-entity-list.page.html',
  styleUrls: ['./tracked-entity-list.page.scss'],
})
export class TrackedEntityListPage implements OnInit {
  currentProgram$: Observable<Program>;
  currentOrganisationUnit$: Observable<OrganisationUnit>;
  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit() {
    this.currentProgram$ = this.store.pipe(select(getCurrentProgram));
    this.currentProgram$.pipe(take(1)).subscribe((currentProgram: Program) => {
      if (!currentProgram) {
        this.router.navigate(['/chw-home']);
      }
    });
  }

  onAddTrackedEntityInstance(e, params: any) {
    e.stopPropagation();
    const currentTrackedEntityInstance = generateTrackedEntityInstance(
      params.program,
      params.organisationUnit,
    );

    this.store.dispatch(
      setCurrentTrackedEntityInstance({ currentTrackedEntityInstance }),
    );
    this.router.navigate(['/manage-tracked-entity-profile']);
  }
}
