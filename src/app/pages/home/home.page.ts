import { Component } from '@angular/core';
import { PopoverController, MenuController } from '@ionic/angular';
import { LanguageListComponent } from '../../shared/components/language-list/language-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    public popoverController: PopoverController,
    private menuCtrl: MenuController,
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  async onShowLanguageList(ev: any) {
    const popover = await this.popoverController.create({
      component: LanguageListComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
