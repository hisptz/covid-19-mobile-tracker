import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageTrackedEntityProfilePageRoutingModule } from './manage-tracked-entity-profile-routing.module';

import { ManageTrackedEntityProfilePage } from './manage-tracked-entity-profile.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageTrackedEntityProfilePageRoutingModule,
    SharedModule,
  ],
  declarations: [ManageTrackedEntityProfilePage],
})
export class ManageTrackedEntityProfilePageModule {}
