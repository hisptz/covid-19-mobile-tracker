import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RumorPageRoutingModule } from './rumor-routing.module';

import { RumorPage } from './rumor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RumorPageRoutingModule
  ],
  declarations: [RumorPage]
})
export class RumorPageModule {}
