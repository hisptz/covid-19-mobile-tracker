import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'self-check',
    loadChildren: () =>
      import('./pages/self-check/self-check.module').then(
        (m) => m.SelfCheckPageModule,
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'chw-home',
    loadChildren: () =>
      import('./pages/chw-home/chw-home.module').then(
        (m) => m.ChwHomePageModule,
      ),
  },
  {
    path: 'tracked-entity-list',
    loadChildren: () =>
      import('./pages/tracked-entity-list/tracked-entity-list.module').then(
        (m) => m.TrackedEntityListPageModule,
      ),
  },
  {
    path: 'tracked-entity',
    loadChildren: () =>
      import('./pages/tracked-entity/tracked-entity.module').then(
        (m) => m.TrackedEntityPageModule,
      ),
  },
  {
    path: 'manage-tracked-entity-profile',
    loadChildren: () =>
      import(
        './pages/manage-tracked-entity-profile/manage-tracked-entity-profile.module'
      ).then((m) => m.ManageTrackedEntityProfilePageModule),
  },

  {
    path: 'manage-tracked-entity-event',
    loadChildren: () =>
      import(
        './pages/manage-tracked-entity-event/manage-tracked-entity-event.module'
      ).then((m) => m.ManageTrackedEntityEventPageModule),
  },
  {
    path: 'self-check-profile',
    loadChildren: () =>
      import('./pages/self-check-profile/self-check-profile.module').then(
        (m) => m.SelfCheckProfilePageModule,
      ),
  },
  {
    path: 'manage-self-check-profile',
    loadChildren: () =>
      import(
        './pages/manage-self-check-profile/manage-self-check-profile.module'
      ).then((m) => m.ManageSelfCheckProfilePageModule),
  },
  {
    path: 'self-check-enrollment',
    loadChildren: () =>
      import('./pages/self-check-enrollment/self-check-enrollment.module').then(
        (m) => m.SelfCheckEnrollmentPageModule,
      ),
  },
  {
    path: 'manage-self-check',
    loadChildren: () =>
      import('./pages/manage-self-check/manage-self-check.module').then(
        (m) => m.ManageSelfCheckPageModule,
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
