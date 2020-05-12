import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { components, entryComponents } from './components';
import { pipes } from './pipes';
import { services } from './services';

@NgModule({
  declarations: [...components, ...entryComponents, ...pipes],
  entryComponents,
  imports: [CommonModule, IonicModule, FormsModule, TranslateModule.forChild()],
  exports: [...components, ...pipes],
  providers: [...services],
})
export class SharedModule {}
