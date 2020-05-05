import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackedEntityListPage } from './tracked-entity-list.page';

const routes: Routes = [
  {
    path: '',
    component: TrackedEntityListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackedEntityListPageRoutingModule {}
