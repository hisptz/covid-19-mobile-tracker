import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfCheckEnrollmentPage } from './self-check-enrollment.page';

const routes: Routes = [
  {
    path: '',
    component: SelfCheckEnrollmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfCheckEnrollmentPageRoutingModule {}
