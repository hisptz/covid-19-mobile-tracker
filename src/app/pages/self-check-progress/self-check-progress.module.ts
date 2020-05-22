import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfCheckProgressPageRoutingModule } from './self-check-progress-routing.module';

import { SelfCheckProgressPage } from './self-check-progress.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SelfCheckProgressPageRoutingModule,
  ],
  declarations: [SelfCheckProgressPage],
})
export class SelfCheckProgressPageModule {}
