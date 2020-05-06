import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfCheckProgressPageRoutingModule } from './self-check-progress-routing.module';

import { SelfCheckProgressPage } from './self-check-progress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfCheckProgressPageRoutingModule,
  ],
  declarations: [SelfCheckProgressPage],
})
export class SelfCheckProgressPageModule {}
