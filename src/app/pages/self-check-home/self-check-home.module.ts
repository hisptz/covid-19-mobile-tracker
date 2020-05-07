import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfCheckHomePageRoutingModule } from './self-check-home-routing.module';

import { SelfCheckHomePage } from './self-check-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfCheckHomePageRoutingModule,
  ],
  declarations: [SelfCheckHomePage],
})
export class SelfCheckHomePageModule {}
