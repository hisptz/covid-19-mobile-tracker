import { Component, OnInit } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import {
  DEFAULT_SELF_USER,
  DEFAULT_SELF_CHECK_PROGRAMS,
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
  currentUser: CurrentUser;
  showPercentage = false;
  shouldOverrideOverAllMessages: boolean;

  constructor(
    private backgroundMode: BackgroundMode,
    private toasterMessageService: ToasterMessagesService,
    private encryptionService: EncryptionService,
    private translationService: AppTransalationsService,
    private userService: UserService,
    private store: Store<State>,
    private appConfigService: AppConfigService,
  ) {
    this.isLoading = false;
    this.shouldOverrideOverAllMessages = false;
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
    // @TODO checking data if past a month so we can update metadata
    // this.isLoading = true;
    // this.backgroundMode.enable();
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
      const { colorSettings } = this.currentUser;
      if (colorSettings) {
        this.store.dispatch(SetCurrentUserColorSettings({ colorSettings }));
      }
      this.store.dispatch(AddCurrentUser({ currentUser: this.currentUser }));
      await this.userService.setCurrentUser(
        this.currentUser,
        DEFAULT_SELF_CHECK_KEY,
      );
      this.isLoading = false;
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
}
