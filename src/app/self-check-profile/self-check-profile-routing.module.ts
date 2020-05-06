import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfCheckProfilePage } from './self-check-profile.page';

const routes: Routes = [
  {
    path: '',
    component: SelfCheckProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfCheckProfilePageRoutingModule {}
