import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfCheckLoginPageRoutingModule } from './self-check-login-routing.module';

import { SelfCheckLoginPage } from './self-check-login.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SelfCheckLoginPageRoutingModule,
  ],
  declarations: [SelfCheckLoginPage],
})
export class SelfCheckLoginPageModule {}
