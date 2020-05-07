import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { OptionListModalPage } from './option-list-modal';

@NgModule({
  declarations: [OptionListModalPage],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    TranslateModule.forChild({}),
  ],
})
export class OptionListModalPageModule {}
