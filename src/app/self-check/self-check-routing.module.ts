import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfCheckPage } from './self-check.page';

const routes: Routes = [
  {
    path: '',
    component: SelfCheckPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../self-check-home/self-check-home.module').then(
            (m) => m.SelfCheckHomePageModule
          ),
      },
      {
        path: 'progress',
        loadChildren: () =>
          import('../self-check-progress/self-check-progress.module').then(
            (m) => m.SelfCheckProgressPageModule
          ),
      },
      {
        path: 'status',
        loadChildren: () =>
          import('../self-check-status/self-check-status.module').then(
            (m) => m.SelfCheckStatusPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfCheckPageRoutingModule {}
