import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageSelfCheckProfilePageRoutingModule } from './manage-self-check-profile-routing.module';

import { ManageSelfCheckProfilePage } from './manage-self-check-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageSelfCheckProfilePageRoutingModule,
  ],
  declarations: [ManageSelfCheckProfilePage],
})
export class ManageSelfCheckProfilePageModule {}
