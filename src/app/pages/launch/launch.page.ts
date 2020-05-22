import { Component, OnInit } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import {
  DEFAULT_SETTINGS,
  DEFAULT_SELF_USER,
  DEFAULT_SELF_CHECK_KEY,
} from 'src/app/constants';
import {
  AddCurrentUser,
  SetCurrentUserColorSettings,
  State,
} from 'src/app/store';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppTransalationsService } from 'src/app/shared/services/app-transalations.service';
import { EncryptionService } from 'src/app/shared/services/encryption.service';
import { SettingService } from 'src/app/shared/services/setting.service';
import { ToasterMessagesService } from 'src/app/shared/services/toaster-messages.service';
import { UserService } from 'src/app/shared/services/user.service';
import { CurrentUser, AppSetting } from 'src/app/models';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.page.html',
  styleUrls: ['./launch.page.scss'],
})
export class LaunchPage implements OnInit {
  isLoading: boolean;
  currentUser: CurrentUser;
  showPercentage: boolean;
  shouldOverrideOverAllMessages = false;
  overAllMessage: string;
  showSlides: boolean;

  constructor(
    private backgroundMode: BackgroundMode,
    private toasterMessageService: ToasterMessagesService,
    private encryptionService: EncryptionService,
    private translationService: AppTransalationsService,
    private userService: UserService,
    private settingService: SettingService,
    private store: Store<State>,
    private appConfigService: AppConfigService,
    private navCtrl: NavController,
  ) {
    this.isLoading = false;
    this.showPercentage = true;
    this.showSlides = true;
  }

  ngOnInit() {
    this.intiateApp();
  }

  async intiateApp() {
    let currentUser = null;
    try {
      currentUser = await this.userService.getCurrentUser(
        DEFAULT_SELF_CHECK_KEY,
      );
      if (currentUser) {
        const { currentLanguage, colorSettings, currentDatabase } = currentUser;
        const langCode: string = currentLanguage ? currentLanguage : `en`;
        this.translationService.setCurrentUserLanguage(langCode);
        if (colorSettings) {
          this.store.dispatch(SetCurrentUserColorSettings({ colorSettings }));
        }
        if (currentDatabase) {
          await this.appConfigService.initateDataBaseConnection(
            currentDatabase,
          );
        }
        this.navCtrl.navigateRoot('/home');
      }
    } catch (error) {}
    const isPasswordEncode = false;
    this.currentUser = currentUser
      ? {
          ...currentUser,
          password: DEFAULT_SELF_USER.password,
          isPasswordEncode,
          progressTracker: {},
        }
      : { ...DEFAULT_SELF_USER, isPasswordEncode };
    this.isLoading = true;
    this.backgroundMode.enable();
    this.setProgressMessages();
  }

  setProgressMessages() {
    this.overAllMessage = 'Preparing the app';
  }

  async onUpdateCurrentUser(currentUser: CurrentUser) {
    const { colorSettings } = currentUser;
    if (colorSettings) {
      this.store.dispatch(SetCurrentUserColorSettings({ colorSettings }));
    }
    this.currentUser = _.assign({}, this.currentUser, currentUser);
    await this.userService.setCurrentUser(
      this.currentUser,
      DEFAULT_SELF_CHECK_KEY,
    );
  }

  async onCancelLoginProcess() {
    this.backgroundMode.disable();
  }

  onFailLogin(errorResponseObject: any) {
    const {
      failedProcesses,
      error,
      failedProcessesErrors,
    } = errorResponseObject;
    if (error) {
      this.toasterMessageService.showToasterMessage(error, 10000);
    } else if (failedProcesses && failedProcesses.length > 0) {
      let errorMessage = '';
      failedProcesses.map((process) => {
        const errorResponse: any =
          failedProcessesErrors[failedProcesses.indexOf(process)];
        errorMessage +=
          (process.charAt(0).toUpperCase() + process.slice(1))
            .replace(/([A-Z])/g, ' $1')
            .trim() +
          ' : ' +
          this.toasterMessageService.getSanitizedErrorMessage(errorResponse) +
          '; ';
      });
      this.toasterMessageService.showToasterMessage(errorMessage, 10000);
    }
    this.onCancelLoginProcess();
  }

  async onSuccessLogin(data: any, skipCurrentUserPropertiesUpdate = false) {
    const { currentUser } = data;
    if (!skipCurrentUserPropertiesUpdate) {
      const hashedKeyForOfflineAuthentication = this.encryptionService.getHashedKeyForOfflineAuthentication(
        currentUser,
      );
      const password = this.encryptionService.encode(currentUser.password);
      this.currentUser = _.assign({}, this.currentUser, {
        ...currentUser,
        hashedKeyForOfflineAuthentication,
        password,
        isPasswordEncode: true,
        isLogin: true,
      });
    }
    try {
      await this.reCheckingAppSetting(currentUser);
      const { colorSettings } = this.currentUser;
      if (colorSettings) {
        this.store.dispatch(SetCurrentUserColorSettings({ colorSettings }));
      }
      this.store.dispatch(AddCurrentUser({ currentUser: this.currentUser }));
      await this.userService.setCurrentUser(
        this.currentUser,
        DEFAULT_SELF_CHECK_KEY,
      );
      this.navCtrl.navigateRoot('/home');
    } catch (error) {
      await this.toasterMessageService.showToasterMessage(
        error,
        6000,
        'Error',
        'top',
      );
    } finally {
      this.backgroundMode.disable();
    }
  }

  async reCheckingAppSetting(currentUser: CurrentUser) {
    const defaultSetting: AppSetting = DEFAULT_SETTINGS;
    const appSettings: AppSetting = await this.settingService.getCurrentSettingsForTheApp(
      currentUser,
    );
    if (!appSettings || Object.keys(appSettings).length === 0) {
      await this.settingService.setCurrentSettingsForTheApp(
        currentUser,
        defaultSetting,
      );
    }
  }
}
