import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Program, TrackedEntityInstance, CurrentUser } from 'src/app/models';
import { updateTrackedEntityInstanceWithAtrributes } from 'src/app/helpers/update-tracked-entity-instance-with-attributes';

@Component({
  selector: 'app-tracker-profile-form',
  templateUrl: './tracker-profile-form.component.html',
  styleUrls: ['./tracker-profile-form.component.scss'],
})
export class TrackerProfileFormComponent implements OnInit {
  @Input() program: Program;
  @Input() trackedEntityInstance: TrackedEntityInstance;
  @Input() currentUser: CurrentUser;
  @Input() attributeObject: any;

  dataObject: any;
  hiddenFields: any;
  trackedEntityAttributesSavingStatusClass: any;
  trackedEntityAttributeValuesObject: any;
  isFormReady: boolean;

  @Output() profileUpdate = new EventEmitter();
  constructor() {}

  ngOnInit() {
    this.dataObject = {};
    this.hiddenFields = {};
    this.trackedEntityAttributesSavingStatusClass = {};
  }

  isAllRequiredFieldHasValue(
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
    return result;
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
    this.isFormReady = this.isAllRequiredFieldHasValue(
      programTrackedEntityAttributes,
      trackedEntityAttributeValuesObject,
    );

    this.trackedEntityAttributeValuesObject = trackedEntityAttributeValuesObject;

    this.profileUpdate.emit({
      currentTrackedEntityInstance: updateTrackedEntityInstanceWithAtrributes(
        trackedEntityInstance,
        { ...attributeObject, ...this.dataObject },
      ),
      isFormReady: this.isFormReady,
    });
  }
}
