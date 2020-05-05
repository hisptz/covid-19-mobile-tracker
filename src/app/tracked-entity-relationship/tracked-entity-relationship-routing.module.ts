import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackedEntityRelationshipPage } from './tracked-entity-relationship.page';

const routes: Routes = [
  {
    path: '',
    component: TrackedEntityRelationshipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackedEntityRelationshipPageRoutingModule {}
