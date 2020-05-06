import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackedEntityProfilePageRoutingModule } from './tracked-entity-profile-routing.module';

import { TrackedEntityProfilePage } from './tracked-entity-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackedEntityProfilePageRoutingModule,
  ],
  declarations: [TrackedEntityProfilePage],
})
export class TrackedEntityProfilePageModule {}
