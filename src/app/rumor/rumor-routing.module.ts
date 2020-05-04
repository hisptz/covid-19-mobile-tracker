import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RumorPage } from './rumor.page';

const routes: Routes = [
  {
    path: '',
    component: RumorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RumorPageRoutingModule {}
