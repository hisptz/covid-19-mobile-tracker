import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { components, entryComponents } from './components';
import { services } from './services';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [...components],
  entryComponents,
  imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
  exports: [...components],
  providers: [...services],
})
export class SharedModule {}
