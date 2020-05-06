import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageTrackedEntityEventPageRoutingModule } from './manage-tracked-entity-event-routing.module';

import { ManageTrackedEntityEventPage } from './manage-tracked-entity-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageTrackedEntityEventPageRoutingModule,
  ],
  declarations: [ManageTrackedEntityEventPage],
})
export class ManageTrackedEntityEventPageModule {}
