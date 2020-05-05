import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackedEntityStagePageRoutingModule } from './tracked-entity-stage-routing.module';

import { TrackedEntityStagePage } from './tracked-entity-stage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackedEntityStagePageRoutingModule
  ],
  declarations: [TrackedEntityStagePage]
})
export class TrackedEntityStagePageModule {}
