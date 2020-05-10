import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Program, OrganisationUnit } from 'src/app/models';
import { Store, select } from '@ngrx/store';
import { State, setCurrentTrackedEntityInstance } from 'src/app/store';
import { Router } from '@angular/router';
import {
  getCurrentProgram,
  getCurrentOrganisationUnit,
} from 'src/app/store/selectors/selections.selectors';
import { take } from 'rxjs/operators';
import { generateTrackedEntityInstance } from 'src/app/helpers/generate-tracked-entity-instance';
import { ProgramFormDataService } from 'src/app/shared/services/program-form-data.service';

@Component({
  selector: 'app-tracked-entity-list',
  templateUrl: './tracked-entity-list.page.html',
  styleUrls: ['./tracked-entity-list.page.scss'],
})
export class TrackedEntityListPage implements OnInit {
  currentProgram$: Observable<Program>;
  currentOrganisationUnit$: Observable<OrganisationUnit>;
  constructor(
    private store: Store<State>,
    private router: Router,
    private programFormDataService: ProgramFormDataService,
  ) {}

  ngOnInit() {
    this.currentOrganisationUnit$ = this.store.pipe(
      select(getCurrentOrganisationUnit),
    );
    this.currentProgram$ = this.store.pipe(select(getCurrentProgram));
    this.currentProgram$.pipe(take(1)).subscribe((currentProgram: Program) => {
      if (!currentProgram) {
        this.router.navigate(['/chw-home']);
      } else {
        this.currentOrganisationUnit$
          .pipe(take(1))
          .subscribe((currentOrganisationUnit: OrganisationUnit) => {
            if (
              currentOrganisationUnit &&
              currentOrganisationUnit.id &&
              currentProgram.id
            ) {
              const programId = currentProgram.id.split('_')[0];
              const organisationUnitId = currentOrganisationUnit.id;
              this.discoveringTrackedEntityInstancesFromServer(
                organisationUnitId,
                programId,
              );
            }
          });
      }
    });
  }

  discoveringTrackedEntityInstancesFromServer(
    organisationUnitId: string,
    programId: string,
  ) {
    // onlinde data
    this.programFormDataService
      .discoveringTrackedEntityInstancesFromServer(
        organisationUnitId,
        programId,
      )
      .subscribe((onlineData) => {
        console.log({ onlineData });
      });
    // data from offline storage
    this.programFormDataService
      .getSavedTrackedEntityInstancesFromLocalStorage(
        organisationUnitId,
        programId,
      )
      .then((offlineData) => {
        console.log({ offlineData });
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
