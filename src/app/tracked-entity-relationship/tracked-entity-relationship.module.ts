import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackedEntityRelationshipPageRoutingModule } from './tracked-entity-relationship-routing.module';

import { TrackedEntityRelationshipPage } from './tracked-entity-relationship.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackedEntityRelationshipPageRoutingModule,
  ],
  declarations: [TrackedEntityRelationshipPage],
})
export class TrackedEntityRelationshipPageModule {}
