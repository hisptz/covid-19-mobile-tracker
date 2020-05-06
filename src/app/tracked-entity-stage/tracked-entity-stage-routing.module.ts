import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackedEntityStagePage } from './tracked-entity-stage.page';

const routes: Routes = [
  {
    path: '',
    component: TrackedEntityStagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackedEntityStagePageRoutingModule {}
