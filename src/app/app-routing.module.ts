import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'self-check',
    loadChildren: () =>
      import('./self-check/self-check.module').then(
        (m) => m.SelfCheckPageModule,
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'chw-home',
    loadChildren: () =>
      import('./chw-home/chw-home.module').then((m) => m.ChwHomePageModule),
  },
  {
    path: 'tracked-entity-list',
    loadChildren: () =>
      import('./tracked-entity-list/tracked-entity-list.module').then(
        (m) => m.TrackedEntityListPageModule,
      ),
  },
  {
    path: 'tracked-entity',
    loadChildren: () =>
      import('./tracked-entity/tracked-entity.module').then(
        (m) => m.TrackedEntityPageModule,
      ),
  },
  {
    path: 'manage-tracked-entity-profile',
    loadChildren: () =>
      import(
        './manage-tracked-entity-profile/manage-tracked-entity-profile.module'
      ).then((m) => m.ManageTrackedEntityProfilePageModule),
  },

  {
    path: 'manage-tracked-entity-event',
    loadChildren: () =>
      import(
        './manage-tracked-entity-event/manage-tracked-entity-event.module'
      ).then((m) => m.ManageTrackedEntityEventPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
