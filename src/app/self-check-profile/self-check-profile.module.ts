import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfCheckProfilePageRoutingModule } from './self-check-profile-routing.module';

import { SelfCheckProfilePage } from './self-check-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfCheckProfilePageRoutingModule
  ],
  declarations: [SelfCheckProfilePage]
})
export class SelfCheckProfilePageModule {}
