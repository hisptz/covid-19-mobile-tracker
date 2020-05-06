import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfCheckHomePage } from './self-check-home.page';

const routes: Routes = [
  {
    path: '',
    component: SelfCheckHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfCheckHomePageRoutingModule {}
