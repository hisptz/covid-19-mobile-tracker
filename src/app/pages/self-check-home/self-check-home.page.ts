import { Component, OnInit } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import {
  DEFAULT_SETTINGS,
  DEFAULT_SELF_USER,
  DEFAULT_SELF_CHECK_PROGRAMS,
  DEFAULT_SELF_CHECK_KEY,
} from 'src/app/constants';
import { getAppMetadata } from 'src/app/helpers';
import {
  AddCurrentUser,
  getCurrentUserColorSettings,
  SetCurrentUserColorSettings,
  State,
} from 'src/app/store';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppTransalationsService } from 'src/app/shared/services/app-transalations.service';
import { EncryptionService } from 'src/app/shared/services/encryption.service';
import { LocalInstanceService } from 'src/app/shared/services/local-instance.service';
import { SettingService } from 'src/app/shared/services/setting.service';
import { SystemSettingService } from 'src/app/shared/services/system-setting.service';
import { ToasterMessagesService } from 'src/app/shared/services/toaster-messages.service';
import { UserService } from 'src/app/shared/services/user.service';
import { CurrentUser } from 'src/app/models';

@Component({
  selector: 'app-self-check-home',
  templateUrl: './self-check-home.page.html',
  styleUrls: ['./self-check-home.page.scss'],
})
export class SelfCheckHomePage implements OnInit {
  isLoading: boolean;
  isFirstTimesyncMetadata: boolean;
  currentUser: CurrentUser;

  constructor(
    private backgroundMode: BackgroundMode,
    private toasterMessageService: ToasterMessagesService,
    private encryptionService: EncryptionService,
    private translationService: AppTransalationsService,
    private localInstanceServices: LocalInstanceService,
    private userService: UserService,
    private systemSettingService: SystemSettingService,
    private settingService: SettingService,
    private store: Store<State>,
    private appConfigService: AppConfigService,
  ) {
    this.isLoading = false;
    this.isFirstTimesyncMetadata = false;
  }

  ngOnInit() {
    this.intiateApp();
  }

  async intiateApp() {
    this.isFirstTimesyncMetadata = true;
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
        this.isFirstTimesyncMetadata = false;
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
  }

  onUpdateCurrentUser(data: any) {
    console.log({ data, type: 'onUpdateCurrentUser' });
  }

  onFailLogin(data: any) {
    console.log({ data, type: 'onFailLogin' });
  }

  onSuccessLogin(data: any) {
    console.log({ data, type: 'onSuccessLogin' });
  }
}
