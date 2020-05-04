import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfCheckPage } from './self-check.page';

const routes: Routes = [
  {
    path: '',
    component: SelfCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfCheckPageRoutingModule {}
