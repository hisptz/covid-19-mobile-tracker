import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfCheckStatusPage } from './self-check-status.page';

const routes: Routes = [
  {
    path: '',
    component: SelfCheckStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfCheckStatusPageRoutingModule {}
