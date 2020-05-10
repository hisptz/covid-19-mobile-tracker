import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackedEntityListPageRoutingModule } from './tracked-entity-list-routing.module';

import { TrackedEntityListPage } from './tracked-entity-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackedEntityListPageRoutingModule,
    SharedModule,
  ],
  declarations: [TrackedEntityListPage],
})
export class TrackedEntityListPageModule {}
