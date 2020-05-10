import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageTrackedEntityEventPageRoutingModule } from './manage-tracked-entity-event-routing.module';

import { ManageTrackedEntityEventPage } from './manage-tracked-entity-event.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ManageTrackedEntityEventPageRoutingModule,
  ],
  declarations: [ManageTrackedEntityEventPage],
})
export class ManageTrackedEntityEventPageModule {}
