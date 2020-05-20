import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaunchPageRoutingModule } from './launch-routing.module';

import { LaunchPage } from './launch.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponentsModule } from '../login/components/login-component.module';
import { SelfCheckHomeComponentsModule } from '../self-check-home/components/self-check-home-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaunchPageRoutingModule,
    SharedModule,
    LoginComponentsModule,
    SelfCheckHomeComponentsModule,
  ],
  declarations: [LaunchPage],
})
export class LaunchPageModule {}
