import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfCheckStatusPageRoutingModule } from './self-check-status-routing.module';

import { SelfCheckStatusPage } from './self-check-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfCheckStatusPageRoutingModule,
  ],
  declarations: [SelfCheckStatusPage],
})
export class SelfCheckStatusPageModule {}
