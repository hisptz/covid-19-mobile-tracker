import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageTrackedEntityProfilePage } from './manage-tracked-entity-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ManageTrackedEntityProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageTrackedEntityProfilePageRoutingModule {}
