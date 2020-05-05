import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackedEntityPageRoutingModule } from './tracked-entity-routing.module';

import { TrackedEntityPage } from './tracked-entity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackedEntityPageRoutingModule
  ],
  declarations: [TrackedEntityPage]
})
export class TrackedEntityPageModule {}
