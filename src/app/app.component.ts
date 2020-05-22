import { Component, OnInit } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './shared/services/user.service';
import { AppConfigService } from './shared/services/app-config.service';
import { CurrentUser } from './models';

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
    private appConfigService: AppConfigService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.initiateDatabaseConnection();
    });
  }

  async initiateDatabaseConnection() {
    try {
      const currentUser: CurrentUser = await this.userService.getCurrentUser();
      if (currentUser && currentUser.currentDatabase) {
        this.appConfigService.initateDataBaseConnection(
          currentUser.currentDatabase,
          true,
        );
      }
    } catch (e) {
      console.error(e);
    }
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
    } catch (error) {}
    await this.exitChwPage();
  }

  async exitChwPage() {
    this.menuCtrl.toggle();
    this.navCtrl.navigateRoot('/home');
  }
}
