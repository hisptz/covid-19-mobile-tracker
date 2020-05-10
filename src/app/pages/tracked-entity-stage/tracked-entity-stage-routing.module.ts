import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackedEntityStagePage } from './pages/tracked-entity-stage/tracked-entity-stage.page';
import { TrackedEntityStageEventListPage } from './pages/tracked-entity-stage-event-list/tracked-entity-stage-event-list.page';
import { TrackedEntityStageListPage } from './pages/tracked-entity-stage-list/tracked-entity-stage-list.page';

const routes: Routes = [
  {
    path: '',
    component: TrackedEntityStageListPage,
  },
  {
    path: 'events',
    component: TrackedEntityStageEventListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackedEntityStagePageRoutingModule {}
