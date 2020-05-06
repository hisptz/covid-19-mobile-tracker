import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackedEntityProfilePage } from './tracked-entity-profile.page';

const routes: Routes = [
  {
    path: '',
    component: TrackedEntityProfilePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackedEntityProfilePageRoutingModule {}
