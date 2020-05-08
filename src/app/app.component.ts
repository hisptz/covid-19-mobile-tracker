import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private userService: UserService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  async logOut() {
    let currentUser = null;
    try {
      currentUser = await this.userService.getCurrentUser();
      if (currentUser) {
        await this.userService.setCurrentUser({
          ...currentUser,
          password: '',
          isLogin: false,
        });
      }
    } catch (error) {
    } finally {
      this.menuCtrl.toggle();
      this.navCtrl.navigateRoot('/home');
    }
  }
}
