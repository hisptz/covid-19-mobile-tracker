import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackedEntityStageEventListPageRoutingModule } from './tracked-entity-stage-event-list-routing.module';

import { TrackedEntityStageEventListPage } from './tracked-entity-stage-event-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackedEntityStageEventListPageRoutingModule
  ],
  declarations: [TrackedEntityStageEventListPage]
})
export class TrackedEntityStageEventListPageModule {}
