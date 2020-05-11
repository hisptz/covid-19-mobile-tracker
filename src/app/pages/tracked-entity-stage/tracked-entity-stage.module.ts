import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackedEntityStagePageRoutingModule } from './tracked-entity-stage-routing.module';

import { TrackedEntityStagePage } from './pages/tracked-entity-stage/tracked-entity-stage.page';
import { TrackedEntityStageEventListPage } from './pages/tracked-entity-stage-event-list/tracked-entity-stage-event-list.page';
import { TrackedEntityStageListPage } from './pages/tracked-entity-stage-list/tracked-entity-stage-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TrackedEntityStagePageRoutingModule,
  ],
  declarations: [
    TrackedEntityStagePage,
    TrackedEntityStageEventListPage,
    TrackedEntityStageListPage,
  ],
})
export class TrackedEntityStagePageModule {}
