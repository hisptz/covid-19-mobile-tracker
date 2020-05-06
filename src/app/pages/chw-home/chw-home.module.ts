import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChwHomePageRoutingModule } from './chw-home-routing.module';

import { ChwHomePage } from './chw-home.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ChwHomePageRoutingModule],
  declarations: [ChwHomePage],
})
export class ChwHomePageModule {}
