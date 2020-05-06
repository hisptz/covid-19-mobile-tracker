import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfCheckProgressPage } from './self-check-progress.page';

const routes: Routes = [
  {
    path: '',
    component: SelfCheckProgressPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfCheckProgressPageRoutingModule {}
