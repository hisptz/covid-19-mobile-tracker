import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfCheckLoginPage } from './self-check-login.page';

const routes: Routes = [
  {
    path: '',
    component: SelfCheckLoginPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfCheckLoginPageRoutingModule {}
