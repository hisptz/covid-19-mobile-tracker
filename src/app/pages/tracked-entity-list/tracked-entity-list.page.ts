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
import { take, switchMap } from 'rxjs/operators';
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
  trackedEntityInstances: any[];
  isLoading: boolean;
  constructor(
    private store: Store<State>,
    private router: Router,
    private programDataService: ProgramFormDataService,
  ) {}

  async ngOnInit() {
    this.currentProgram$ = this.store.pipe(select(getCurrentProgram));

    this.currentOrganisationUnit$ = this.store.pipe(
      select(getCurrentOrganisationUnit),
    );
    this.currentProgram$.pipe(take(1)).subscribe((currentProgram: Program) => {
      if (!currentProgram) {
        this.router.navigate(['/chw-home']);
      } else {
        this.currentOrganisationUnit$
          .pipe(
            switchMap((organisationUnit: OrganisationUnit) => {
              return this.programDataService.discoveringTrackedEntityInstancesFromServer(
                organisationUnit.id,
                currentProgram.id,
              );
            }),
          )
          .subscribe(
            (res) => {
              console.log(res);
            },
            (error) => {},
          );
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
