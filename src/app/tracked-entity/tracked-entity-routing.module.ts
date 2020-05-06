import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackedEntityPage } from './tracked-entity.page';

const routes: Routes = [
  {
    path: '',
    component: TrackedEntityPage,
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import(
            '../tracked-entity-profile/tracked-entity-profile.module'
          ).then((m) => m.TrackedEntityProfilePageModule),
      },
      {
        path: 'relationship',
        loadChildren: () =>
          import(
            '../tracked-entity-relationship/tracked-entity-relationship.module'
          ).then((m) => m.TrackedEntityRelationshipPageModule),
      },
      {
        path: 'stage',
        loadChildren: () =>
          import('../tracked-entity-stage/tracked-entity-stage.module').then(
            (m) => m.TrackedEntityStagePageModule
          ),
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackedEntityPageRoutingModule {}
