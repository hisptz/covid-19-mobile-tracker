import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfCheckEnrollmentPageRoutingModule } from './self-check-enrollment-routing.module';

import { SelfCheckEnrollmentPage } from './self-check-enrollment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfCheckEnrollmentPageRoutingModule,
  ],
  declarations: [SelfCheckEnrollmentPage],
})
export class SelfCheckEnrollmentPageModule {}
