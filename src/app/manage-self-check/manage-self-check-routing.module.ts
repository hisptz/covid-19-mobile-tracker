import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageSelfCheckPage } from './manage-self-check.page';

const routes: Routes = [
  {
    path: '',
    component: ManageSelfCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSelfCheckPageRoutingModule {}
