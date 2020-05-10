import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { Observable } from 'rxjs';
import {
  Program,
  OrganisationUnit,
  TrackedEntityInstance,
} from 'src/app/models';
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
  trackedEntityInstanceList: TrackedEntityInstance[];
  attributesToDisplay: any[];
  isLoading: boolean;
  constructor(
    private store: Store<State>,
    private router: Router,
    private programFormDataService: ProgramFormDataService,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.currentOrganisationUnit$ = this.store.pipe(
      select(getCurrentOrganisationUnit),
    );
    this.currentProgram$ = this.store.pipe(select(getCurrentProgram));

    this.currentOrganisationUnit$ = this.store.pipe(
      select(getCurrentOrganisationUnit),
    );
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
              this.isLoading = true;
              this.attributesToDisplay = this.getAttributeToDisplay(
                currentProgram,
              );
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

  getAttributeToDisplay(currentProgram: Program) {
    const numberOfAttribute = 3;
    let atteibutesToDisplay = _.filter(
      currentProgram.programTrackedEntityAttributes || [],
      (programTrackedEntityAttribute: any) =>
        programTrackedEntityAttribute &&
        programTrackedEntityAttribute.displayInList,
    );
    atteibutesToDisplay =
      atteibutesToDisplay.length > 0
        ? _.chunk(atteibutesToDisplay, numberOfAttribute)[0]
        : currentProgram.programTrackedEntityAttributes || [];
    return _.flattenDeep(
      _.map(atteibutesToDisplay, (programTrackedEntityAttribute) => {
        const trackedEntityAttribute =
          programTrackedEntityAttribute.trackedEntityAttribute || null;
        return trackedEntityAttribute
          ? {
              id: trackedEntityAttribute.id || '',
              name:
                trackedEntityAttribute.formName ||
                trackedEntityAttribute.name ||
                '',
            }
          : [];
      }),
    );
  }

  discoveringTrackedEntityInstancesFromServer(
    organisationUnitId: string,
    programId: string,
  ) {
    this.programFormDataService
      .discoveringTrackedEntityInstancesFromServerAndLocalStorage(
        organisationUnitId,
        programId,
      )
      .subscribe((teis: TrackedEntityInstance[]) => {
        // Todo filter "teis" by attribute value from previous selected source
        this.trackedEntityInstanceList = _.map(teis, (tei: any) => {
          const attributes = tei.attributes || [];
          for (const attributeToDisplay of this.attributesToDisplay) {
            const filtereAttr = _.find(
              attributes,
              (attributeObj: any) =>
                attributeObj &&
                attributeObj.attribute &&
                attributeToDisplay.id === attributeObj.attribute,
            );
            if (filtereAttr) {
              tei[attributeToDisplay.id] = filtereAttr.value;
            }
          }
          // relation specific for contact tracing
          const relationships = tei.relationships || [];
          return {
            ...tei,
            numberOfContact: relationships.length,
          };
        });
        this.isLoading = false;
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

  onSetCurrentTrackedEntityInstance(
    e,
    currentTrackedEntityInstance: TrackedEntityInstance,
  ) {
    e.stopPropagation();
    this.store.dispatch(
      setCurrentTrackedEntityInstance({ currentTrackedEntityInstance }),
    );
    this.router.navigate(['/tracked-entity']);
  }
}
