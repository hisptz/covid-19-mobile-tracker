import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfCheckHomePageRoutingModule } from './self-check-home-routing.module';

import { SelfCheckHomePage } from './self-check-home.page';
import * as selfCheckComponnts from './components';
import { LoginComponentsModule } from '../login/components/login-component.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfCheckHomePageRoutingModule,
    LoginComponentsModule,
    SharedModule,
  ],
  declarations: [SelfCheckHomePage, ...selfCheckComponnts.components],
})
export class SelfCheckHomePageModule {}
