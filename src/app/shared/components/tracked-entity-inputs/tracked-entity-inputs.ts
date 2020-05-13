/*
 *
 * Copyright 2015 HISP Tanzania
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 *
 * @since 2015
 * @author Joseph Chingalo <profschingalo@gmail.com>
 *
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SettingService } from '../../services/setting.service';
import { AttributeReservedValueManagerService } from '../../services/attribute-reserved-value-manager.service';

/**
 * Generated class for the TrackedEntityInputsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'tracked-entity-inputs',
  templateUrl: 'tracked-entity-inputs.html',
})
export class TrackedEntityInputsComponent implements OnInit {
  @Input() trackedEntityAttribute;
  @Input() currentUser;
  @Input() mandatory;
  @Input() data;
  @Input() trackedEntityAttributesSavingStatusClass;
  @Output() valueChange = new EventEmitter();

  fieldLabelKey: any;
  textInputField: Array<string>;
  numericalInputField: Array<string>;
  supportValueTypes: Array<string>;
  formLayout: string;
  dataEntrySettings: any;
  barcodeSettings: any;
  isLoading: boolean;
  isDisabled: boolean;

  constructor(
    private settingSetting: SettingService,
    private attributeReservedValueManagerService: AttributeReservedValueManagerService,
  ) {
    this.isLoading = true;
  }

  async ngOnInit() {
    this.generateReservedValues(this.trackedEntityAttribute);
    this.numericalInputField = [
      'INTEGER_NEGATIVE',
      'INTEGER_POSITIVE',
      'INTEGER',
      'NUMBER',
      'INTEGER_ZERO_OR_POSITIVE',
    ];
    this.textInputField = ['TEXT', 'LONG_TEXT'];
    this.supportValueTypes = [
      'BOOLEAN',
      'TRUE_ONLY',
      'DATE',
      'DATETIME',
      'TIME',
      'TEXT',
      'LONG_TEXT',
      'INTEGER_NEGATIVE',
      'INTEGER_POSITIVE',
      'INTEGER',
      'NUMBER',
      'INTEGER_ZERO_OR_POSITIVE',
      'COORDINATE',
      'ORGANISATION_UNIT',
      'UNIT_INTERVAL',
      'PERCENTAGE',
      'EMAIL',
      'PHONE_NUMBER',
      'AGE',
    ];
    if (this.trackedEntityAttribute && this.trackedEntityAttribute.id) {
      this.fieldLabelKey = this.trackedEntityAttribute.name;
      this.formLayout = 'listLayout';
      const appSettings = await this.settingSetting.getCurrentSettingsForTheApp(
        this.currentUser,
      );

      const dataEntrySettings = appSettings.entryForm;
      this.barcodeSettings = appSettings.barcode;
      this.dataEntrySettings = dataEntrySettings;
      if (dataEntrySettings.formLayout) {
        this.formLayout = dataEntrySettings.formLayout;
      }
      if (
        dataEntrySettings.label &&
        this.trackedEntityAttribute[dataEntrySettings.label] &&
        isNaN(this.trackedEntityAttribute[dataEntrySettings.label])
      ) {
        this.fieldLabelKey = this.trackedEntityAttribute[
          dataEntrySettings.label
        ];
      }
      this.isLoading = false;
    }
  }

  async generateReservedValues(trackedEntityAttribute: any) {
    const isAttributeWithRervedValues =
      trackedEntityAttribute && trackedEntityAttribute.generated
        ? trackedEntityAttribute.generated
        : false;
    this.isDisabled = isAttributeWithRervedValues;
    try {
      if (
        trackedEntityAttribute &&
        trackedEntityAttribute.id &&
        isAttributeWithRervedValues
      ) {
        const id = trackedEntityAttribute.id;
        const fieldId = `${id}-isAttributeWithRervedValues`;
        const reservedValues = await this.attributeReservedValueManagerService.getAttributeReservedValues(
          id,
        );
        if (
          reservedValues.length > 0 &&
          !Object.keys(this.data).includes(fieldId)
        ) {
          const reservedValue = reservedValues.pop();
          const updatedValue = {
            id: fieldId,
            value: reservedValue.value || '',
            status: '',
          };
          this.data[fieldId] = updatedValue;
          this.updateValue(updatedValue);
        }
      }
    } catch (error) {}
  }

  updateValue(updatedValue) {
    console.log({ updatedValue });
    this.trackedEntityAttributesSavingStatusClass[updatedValue.id] =
      'input-field-container-saving';
    this.valueChange.emit(updatedValue);
  }
}
