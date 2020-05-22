import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { getDataElementsObject } from 'src/app/helpers/get-data-elements-object';
import { updateEventWithDataValues } from 'src/app/helpers/update-event-with-data-values';
import * as D2Rule from '@iapps/dhis2-program-rule-engine';
import { Program, CurrentUser } from 'src/app/models';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  @Input() program: Program;
  @Input() programStage: any;
  @Input() currentEvent: any;
  @Input() currentUser: CurrentUser;
  @Input() eventObject: any;

  isFormReady = true;
  dataObject: any;
  dataValuesSavingStatusClass: any;
  programRuleActions: any[];

  @Output() eventUpdate = new EventEmitter();
  constructor() {}

  ngOnInit() {
    console.log(this.programStage);
    this.dataObject = {};
    this.dataValuesSavingStatusClass = {};
  }

  onUpdateData(updatedData: any) {
    const dataElementsObject = getDataElementsObject(
      this.programStage.programStageDataElements,
    );

    this.dataObject[updatedData.id] = updatedData;

    const eventWithValues = updateEventWithDataValues(
      { ...this.currentEvent, syncStatus: 'not-synced' },
      {
        ...this.eventObject,
        ...this.dataObject,
      },
    );

    // this._evaluateProgramRules({
    //   event: eventWithValues,
    //   dataElementsObject,
    //   programRules: currentProgram.programRules,
    //   programRuleVariables: currentProgram.programRuleVariables,
    //   programRuleActions: currentProgram.programRuleActions,
    //   optionSets: {},
    // });

    this.eventUpdate.emit({
      currentEvent: eventWithValues,
      isFormReady: this.isFormReady,
    });
  }

  private _evaluateProgramRules(params: any) {
    const {
      event,
      dataElementsObject,
      programRules,
      programRuleVariables,
      programRuleActions,
      optionSets,
    } = params;

    this.programRuleActions = D2Rule.executeWithAction(
      event,
      dataElementsObject,
      programRules,
      programRuleVariables,
      programRuleActions,
      optionSets || {},
    );
  }
}
