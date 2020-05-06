import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageSelfCheckPageRoutingModule } from './manage-self-check-routing.module';

import { ManageSelfCheckPage } from './manage-self-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageSelfCheckPageRoutingModule
  ],
  declarations: [ManageSelfCheckPage]
})
export class ManageSelfCheckPageModule {}
