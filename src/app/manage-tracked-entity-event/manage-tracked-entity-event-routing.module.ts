import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageTrackedEntityEventPage } from './manage-tracked-entity-event.page';

const routes: Routes = [
  {
    path: '',
    component: ManageTrackedEntityEventPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageTrackedEntityEventPageRoutingModule {}
