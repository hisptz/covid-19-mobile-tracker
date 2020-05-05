import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChwHomePage } from './chw-home.page';

const routes: Routes = [
  {
    path: '',
    component: ChwHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChwHomePageRoutingModule {}
