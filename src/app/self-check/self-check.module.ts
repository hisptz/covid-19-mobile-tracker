import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfCheckPageRoutingModule } from './self-check-routing.module';

import { SelfCheckPage } from './self-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfCheckPageRoutingModule
  ],
  declarations: [SelfCheckPage]
})
export class SelfCheckPageModule {}
