import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageSelfCheckProfilePage } from './manage-self-check-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ManageSelfCheckProfilePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSelfCheckProfilePageRoutingModule {}
