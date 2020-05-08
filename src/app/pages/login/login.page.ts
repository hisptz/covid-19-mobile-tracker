import { Component, OnInit } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { ModalController, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { DEFAULT_SETTINGS, DEFAULT_USER } from 'src/app/constants';
import { getAppMetadata } from 'src/app/helpers';
import { LocalInstanceSelectionPage } from 'src/app/modals/local-instance-selection/local-instance-selection.page';
import { TranslationSelectionPage } from 'src/app/modals/translation-selection/translation-selection.page';
import {
  AppColorObject,
  AppSetting,
  CurrentUser,
  LocalInstance,
  SystemSettings,
  Translation,
} from 'src/app/models';
import { AppTransalationsService } from 'src/app/shared/services/app-transalations.service';
import { EncryptionService } from 'src/app/shared/services/encryption.service';
import { LocalInstanceService } from 'src/app/shared/services/local-instance.service';
import { SettingService } from 'src/app/shared/services/setting.service';
import { SystemSettingService } from 'src/app/shared/services/system-setting.service';
import { ToasterMessagesService } from 'src/app/shared/services/toaster-messages.service';
import { UserService } from 'src/app/shared/services/user.service';
import {
  AddCurrentUser,
  getCurrentUserColorSettings,
  SetCurrentUserColorSettings,
  State,
} from 'src/app/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  topSlogan: string;
  buttonSlogan: string;
  appIcon: string;
  isLoginProcessActive: boolean;
  isLoginFormValid: boolean;
  isOnLogin: boolean;
  showOverallProgressBar: boolean;
  topThreeTranslationCodes: string[];
  localInstances: LocalInstance[];
  processes: string[];
  keyFlag: string;
  keyApplicationFooter: string;
  applicationTitle: string;
  keyApplicationNotification: string;
  keyApplicationIntro: string;
  overAllLoginMessage: string;
  currentUser: CurrentUser;
  offlineIcon: string;

  colorSettings$: Observable<AppColorObject>;

  constructor(
    private backgroundMode: BackgroundMode,
    private toasterMessageService: ToasterMessagesService,
    private encryptionService: EncryptionService,
    private translationService: AppTransalationsService,
    private localInstanceServices: LocalInstanceService,
    private userService: UserService,
    private systemSettingService: SystemSettingService,
    private settingService: SettingService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private store: Store<State>,
    private router: Router,
  ) {
    this.colorSettings$ = this.store.select(getCurrentUserColorSettings);
    this.appIcon = 'assets/img/logo.png';
    this.offlineIcon = 'assets/icon/offline.png';
    this.topSlogan = 'Innovation in every dimension';
    this.buttonSlogan = 'powered by iApps';
    this.isLoginProcessActive = false;
    this.isOnLogin = true;
    this.showOverallProgressBar = true;
    this.localInstances = [];
    this.topThreeTranslationCodes = this.translationService.getTopThreeSupportedTranslationCodes();
    this.processes = getAppMetadata();
  }

  ngOnInit() {
    this.getAndSetLocalInstance();
    this.fetchAndSetCurrentUser();
  }

  async fetchAndSetCurrentUser() {
    let currentUser = null;
    try {
      currentUser = await this.userService.getCurrentUser();
    } catch (error) {
    } finally {
      this.currentUser = currentUser
        ? { ...currentUser, password: '' }
        : DEFAULT_USER;
    }
  }

  async getAndSetLocalInstance() {
    this.localInstances = await this.localInstanceServices.getLocalInstances();
  }

  async openLocalInstancesSelection() {
    const modal = await this.modalController.create({
      component: LocalInstanceSelectionPage,
      componentProps: { localInstances: this.localInstances },
      cssClass: 'inset-modal',
    });
    modal.present();
    const response = await modal.onDidDismiss();
    if (response && response.data) {
      const currentUser = response.data;
      this.currentUser = null;
      setTimeout(() => {
        this.currentUser = _.assign({}, this.currentUser, {
          ...currentUser,
          password: '',
        });
        this.onCancelLoginProcess();
      }, 20);
    }
  }

  async openTranslationCodeSelection() {
    const translationCodes = this.translationService.getSupportedTranslations();
    const { currentLanguage } = this.currentUser;
    const modal = await this.modalController.create({
      component: TranslationSelectionPage,
      componentProps: { currentLanguage, translationCodes },
      cssClass: 'inset-modal',
    });
    modal.present();
    const response = await modal.onDidDismiss();
    if (response && response.data) {
      const currrentTransalation: Translation = response.data;
      const { code } = currrentTransalation;
      this.updateTranslationLanguage(code);
    }
  }

  updateTranslationLanguage(currentLanguage: string) {
    this.currentUser = { ...this.currentUser, currentLanguage };
    this.translationService.setCurrentUserLanguage(currentLanguage);
  }

  onFormFieldChange(data: any) {
    const { status } = data;
    const { currentUser } = data;
    this.isLoginFormValid = status;
    if (status) {
      this.currentUser = _.assign({}, this.currentUser, currentUser);
    } else {
      this.isLoginProcessActive = false;
    }
  }

  async onStartLoginProcess() {
    const { username, password, serverUrl } = this.currentUser;
    this.currentUser = {
      ...this.currentUser,
      username: username.trim(),
      password: password.trim(),
      serverUrl: serverUrl.trim(),
      isPasswordEncode: false,
    };
    this.overAllLoginMessage = this.currentUser.serverUrl;
    this.isLoginProcessActive = true;
    this.backgroundMode.enable();
    this.resetLoginSpinnerValues();
  }

  async onUpdateCurrentUser(currentUser: CurrentUser) {
    const { colorSettings } = currentUser;
    if (colorSettings) {
      this.store.dispatch(SetCurrentUserColorSettings({ colorSettings }));
    }
    this.currentUser = _.assign({}, this.currentUser, currentUser);
    await this.userService.setCurrentUser(this.currentUser);
  }

  async onCancelLoginProcess() {
    this.isLoginProcessActive = false;
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

  async onSuccessLogin(data) {
    const { currentUser } = data;
    const loggedInInInstance =
      currentUser.serverUrl.split('://').length > 1
        ? this.currentUser.serverUrl.split('://')[1]
        : this.currentUser.serverUrl;
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
    try {
      await this.reCheckingAppSetting(currentUser);
      await this.localInstanceServices.setLocalInstanceInstances(
        this.localInstances,
        loggedInInInstance,
        this.currentUser,
      );
      const { colorSettings } = this.currentUser;
      if (colorSettings) {
        this.store.dispatch(SetCurrentUserColorSettings({ colorSettings }));
      }
      this.store.dispatch(AddCurrentUser({ currentUser: this.currentUser }));
      await this.userService.setCurrentUser(this.currentUser);
      this.navCtrl.navigateRoot('/chw-home');
    } catch (error) {
      await this.toasterMessageService.showToasterMessage(
        error,
        6000,
        'Error',
        'top',
      );
    } finally {
      await this.backgroundMode.disable();
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

  async onSystemSettingLoaded(
    systemSettings: SystemSettings,
    skipSaving?: boolean,
  ) {
    const {
      keyFlag,
      keyApplicationIntro,
      keyApplicationFooter,
      applicationTitle,
      keyApplicationNotification,
    } = systemSettings;
    this.keyFlag = keyFlag ? keyFlag : null;
    this.keyApplicationFooter = keyApplicationFooter
      ? keyApplicationFooter
      : null;
    this.applicationTitle = applicationTitle ? applicationTitle : null;
    this.keyApplicationNotification = keyApplicationNotification
      ? keyApplicationNotification
      : null;
    this.keyApplicationIntro = keyApplicationIntro ? keyApplicationIntro : null;
    if (!skipSaving) {
      await this.systemSettingService.saveSystemSettings(
        systemSettings,
        this.currentUser,
      );
    }
  }

  resetLoginSpinnerValues() {
    this.keyFlag = null;
    this.keyApplicationFooter = null;
    this.applicationTitle = null;
    this.keyApplicationNotification = null;
    this.keyApplicationIntro = null;
  }
}
