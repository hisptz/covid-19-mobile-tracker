import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackedEntityListPageRoutingModule } from './tracked-entity-list-routing.module';

import { TrackedEntityListPage } from './tracked-entity-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackedEntityListPageRoutingModule
  ],
  declarations: [TrackedEntityListPage]
})
export class TrackedEntityListPageModule {}
