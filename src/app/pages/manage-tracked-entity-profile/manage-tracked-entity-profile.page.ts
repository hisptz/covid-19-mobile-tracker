import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  State,
  setCurrentTrackedEntityInstance,
  saveTrackedEntityInstance,
} from 'src/app/store';
import { Observable, of } from 'rxjs';
import { Program, CurrentUser } from 'src/app/models';
import {
  getCurrentProgram,
  getCurrentProgramTrackedEntityAttribute,
  getCurrentTrackedEntityInstance,
  getTrackedEntityInstanceAttributeObject,
} from 'src/app/store/selectors/selections.selectors';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { updateTrackedEntityInstanceWithAtrributes } from 'src/app/helpers/update-tracked-entity-instance-with-attributes';

@Component({
  selector: 'app-manage-tracked-entity-profile',
  templateUrl: './manage-tracked-entity-profile.page.html',
  styleUrls: ['./manage-tracked-entity-profile.page.scss'],
})
export class ManageTrackedEntityProfilePage implements OnInit {
  currentProgram$: Observable<Program>;
  currentProgramTrackedEntityAttribute$: Observable<any>;
  currentTrackedEntityInstance$: Observable<any>;
  trackedEntityInstanceAttributeValueObject$: Observable<any>;
  hiddenFields: any;
  trackedEntityAttributesSavingStatusClass: any;
  dataObject: any;
  trackedEntityAttributeValuesObject: any;
  isFormReady: boolean;
  currentUser$: Observable<CurrentUser>;
  constructor(
    private store: Store<State>,
    private userService: UserService,
    private router: Router,
  ) {}

  async ngOnInit() {
    // TODO: This will need programs rule
    this.hiddenFields = {};
    this.trackedEntityAttributesSavingStatusClass = {};
    this.dataObject = {};
    this.currentProgram$ = this.store.pipe(select(getCurrentProgram));
    this.currentProgram$.pipe(take(1)).subscribe((currentProgram: Program) => {
      if (!currentProgram) {
        this.router.navigate(['/chw-home']);
      }
    });

    this.currentProgramTrackedEntityAttribute$ = this.store.pipe(
      select(getCurrentProgramTrackedEntityAttribute),
    );
    this.currentTrackedEntityInstance$ = this.store.pipe(
      select(getCurrentTrackedEntityInstance),
    );
    this.trackedEntityInstanceAttributeValueObject$ = this.store.pipe(
      select(getTrackedEntityInstanceAttributeObject),
    );

    const user = await this.userService.getCurrentUser();

    this.currentUser$ = of(user);
  }

  isALlRequiredFieldHasValue(
    programTrackedEntityAttributes,
    trackedEntityAttributeValuesObject,
  ) {
    let result = Object.keys(trackedEntityAttributeValuesObject).length > 0;
    programTrackedEntityAttributes.map((programTrackedEntityAttribute: any) => {
      const {
        mandatory,
        trackedEntityAttribute,
      } = programTrackedEntityAttribute;
      if (mandatory && trackedEntityAttribute && trackedEntityAttribute.id) {
        if (!trackedEntityAttributeValuesObject[trackedEntityAttribute.id]) {
          result = false;
        }
      }
    });
    // if (result) {
    //   const { displayIncidentDate } = this.currentProgram;
    //   if (this.enrollmentDate === '') {
    //     // this.appProvider.setNormalNotification(
    //     //   this.currentProgram.enrollmentDateLabel + ' is mandatory field',
    //     // );
    //     result = false;
    //   }
    //   if (result && displayIncidentDate && this.enrollmentDate !== '') {
    //     if (this.incidentDate === '') {
    //       this.appProvider.setNormalNotification(
    //         this.currentProgram.incidentDateLabel + ' is mandatory field',
    //       );
    //       result = false;
    //     }
    //   }
    // }
    return result;
  }

  onIncidentDateUpdate(incidentDate: string, trackedEntityInstance) {
    this.store.dispatch(
      setCurrentTrackedEntityInstance({
        currentTrackedEntityInstance: {
          ...trackedEntityInstance,
          incidentDate,
          enrollments: trackedEntityInstance.enrollments.map(
            (enrollment: any) => {
              return { ...enrollment, incidentDate };
            },
          ),
        },
      }),
    );
  }

  onUpdateAttributesValue(
    data: any,
    programTrackedEntityAttributes,
    trackedEntityInstance,
    attributeObject,
    shouldSkipProgramRules: boolean = false,
    shoulOnlyCheckDates: boolean = false,
  ) {
    if (!shoulOnlyCheckDates) {
      const { id, value } = data;
      const hasNoOldValue =
        this.dataObject && this.dataObject[id] ? false : true;
      const oldValue = !hasNoOldValue ? this.dataObject[id].value : value;
      if (oldValue !== value || hasNoOldValue) {
        this.dataObject[id] = data;
      }
    }
    if (!shouldSkipProgramRules) {
      // this.evaluatingProgramRules();
    }
    const trackedEntityAttributeValuesObject = {};
    Object.keys(this.dataObject).map((key) => {
      const id = key.split('-')[0];
      const { value } = this.dataObject[key];
      if (value) {
        trackedEntityAttributeValuesObject[id] = value;
      }
    });
    this.isFormReady = this.isALlRequiredFieldHasValue(
      programTrackedEntityAttributes,
      trackedEntityAttributeValuesObject,
    );

    this.trackedEntityAttributeValuesObject = trackedEntityAttributeValuesObject;
    this.store.dispatch(
      setCurrentTrackedEntityInstance({
        currentTrackedEntityInstance: updateTrackedEntityInstanceWithAtrributes(
          trackedEntityInstance,
          { ...attributeObject, ...this.dataObject },
        ),
      }),
    );
  }

  onClose() {
    this.store.dispatch(saveTrackedEntityInstance());
  }

  onSave(e) {
    e.stopPropagation();
    this.store.dispatch(saveTrackedEntityInstance());
    this.router.navigate(['/tracked-entity-list']);
  }
}
