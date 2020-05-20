import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfCheckHomePageRoutingModule } from './self-check-home-routing.module';

import { SelfCheckHomePage } from './self-check-home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelfCheckHomeComponentsModule } from './components/self-check-home-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfCheckHomePageRoutingModule,
    SelfCheckHomeComponentsModule,
    SharedModule,
  ],
  declarations: [SelfCheckHomePage],
})
export class SelfCheckHomePageModule {}
