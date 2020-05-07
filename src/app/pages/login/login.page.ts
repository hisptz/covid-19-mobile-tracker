import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { LanguageListComponent } from '../../shared/components/language-list/language-list.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    public popoverController: PopoverController,
  ) {}

  ngOnInit() {}

  onLogin(f) {
    this.router.navigate(['/chw-home']);
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
