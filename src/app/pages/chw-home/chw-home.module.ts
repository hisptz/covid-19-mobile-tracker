import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChwHomePageRoutingModule } from './chw-home-routing.module';

import { ChwHomePage } from './chw-home.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChwHomePageRoutingModule,
    SharedModule,
  ],
  declarations: [ChwHomePage],
})
export class ChwHomePageModule {}
