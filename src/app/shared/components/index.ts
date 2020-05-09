import { LanguageListComponent } from './language-list/language-list.component';
import { AgeInputComponent } from './input-fields/age-input/age-input.component';
import { BarcodeInputComponent } from './input-fields/barcode-input/barcode-input.component';
import { BooleanInputComponent } from './input-fields/boolean-input/boolean-input.component';
import { CoordinateInputComponent } from './input-fields/coordinate-input/coordinate-input.component';
import { DateTimeComponent } from './input-fields/date-time/date-time.component';
import { DateInputComponent } from './input-fields/date-input/date-input.component';
import { EmailInputComponent } from './input-fields/email-input/email-input.component';
import { NumericalInputComponent } from './input-fields/numerical-input/numerical-input.component';
import { OptionSetInputComponent } from './input-fields/option-set-input/option-set-input.component';
import { PasswordInputComponent } from './input-fields/password-input/password-input.component';
import { PercentageInputComponent } from './input-fields/percentage-input/percentage-input.component';
import { PhoneNumberInputComponent } from './input-fields/phone-number-input/phone-number-input.component';
import { RadioButtonComponent } from './input-fields/radio-button/radio-button.component';
import { TextInputComponent } from './input-fields/text-input/text-input.component';
import { TrueOnlyInputComponent } from './input-fields/true-only-input/true-only-input.component';
import { UnitIntervalInputComponent } from './input-fields/unit-interval-input/unit-interval-input.component';
import { InputFieldContainerComponent } from './input-fields/input-field-container/input-field-container.component';
import { OrganisationUnitInputComponent } from './input-fields/organisation-unit-input/organisation-unit-input.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { OrganisationUnitTreeComponent } from './organisation-unit-tree/organisation-unit-tree.component';
import { modals } from 'src/app/modals';
import { TrackedEntityInputsComponent } from './tracked-entity-inputs/tracked-entity-inputs';
import { ProgramRuleActionMessageComponent } from './program-rule-action-message/program-rule-action-message';

export const components: any[] = [
  LanguageListComponent,
  AgeInputComponent,
  BarcodeInputComponent,
  BooleanInputComponent,
  CoordinateInputComponent,
  DateTimeComponent,
  DateInputComponent,
  EmailInputComponent,
  NumericalInputComponent,
  OptionSetInputComponent,
  PasswordInputComponent,
  PercentageInputComponent,
  PhoneNumberInputComponent,
  RadioButtonComponent,
  TextInputComponent,
  TrueOnlyInputComponent,
  UnitIntervalInputComponent,
  InputFieldContainerComponent,
  OrganisationUnitInputComponent,
  ProgressBarComponent,
  OrganisationUnitTreeComponent,
  TrackedEntityInputsComponent,
  ProgramRuleActionMessageComponent,
];
export const entryComponents: any[] = [LanguageListComponent, ...modals];
