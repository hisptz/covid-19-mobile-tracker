import { Component, OnInit } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import {
  DEFAULT_SELF_USER,
  DEFAULT_SELF_CHECK_PROGRAMS,
  DEFAULT_SELF_CHECK_HOME_CONTENTS,
  DEFAULT_SELF_CHECK_KEY,
} from 'src/app/constants';
import {
  AddCurrentUser,
  SetCurrentUserColorSettings,
  State,
  setCurrentProgram,
  setCurrentTrackedEntityInstance,
} from 'src/app/store';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppTransalationsService } from 'src/app/shared/services/app-transalations.service';
import { EncryptionService } from 'src/app/shared/services/encryption.service';
import { ToasterMessagesService } from 'src/app/shared/services/toaster-messages.service';
import { UserService } from 'src/app/shared/services/user.service';
import { CurrentUser, Program } from 'src/app/models';
import { ProgramFormMetadataService } from 'src/app/shared/services/program-form-metadata.service';
import { Observable, from } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { generateTrackedEntityInstance } from 'src/app/helpers/generate-tracked-entity-instance';
import { AttributeReservedValueManagerService } from 'src/app/shared/services/attribute-reserved-value-manager.service';

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
  currentProgram: Program;
  homeContents: any;

  constructor(
    private backgroundMode: BackgroundMode,
    private toasterMessageService: ToasterMessagesService,
    private encryptionService: EncryptionService,
    private translationService: AppTransalationsService,
    private userService: UserService,
    private store: Store<State>,
    private appConfigService: AppConfigService,
    private programMetadata: ProgramFormMetadataService,
    private attributeReservedValueManagerService: AttributeReservedValueManagerService,
    private router: Router,
  ) {
    this.isLoading = false;
    this.shouldOverrideOverAllMessages = false;
    this.homeContents = DEFAULT_SELF_CHECK_HOME_CONTENTS || [];
  }

  async ngOnInit() {
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
          await this.attributeReservedValueManagerService.regenerateAttributeReservedValues();
        }
      }
    } catch (error) {}
    from(
      this.programMetadata.getProgramByIds(
        DEFAULT_SELF_CHECK_PROGRAMS.map((program: any) => program.id),
      ),
    )
      .pipe(
        map((programs: any[]) => programs[0]),
        filter((program) => program),
      )
      .subscribe((currentProgram: Program) => {
        this.currentProgram = currentProgram;
        this.store.dispatch(setCurrentProgram({ currentProgram }));
      });
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

  onCheckUp(e) {
    e.stopPropagation();
    if (this.currentProgram) {
      const { trackedEntityInstance } = this.currentUser;
      const currentTrackedEntityInstance =
        trackedEntityInstance ||
        generateTrackedEntityInstance(this.currentProgram, null);

      this.store.dispatch(
        setCurrentTrackedEntityInstance({ currentTrackedEntityInstance }),
      );
      this.router.navigate(['/manage-self-check-profile']);
    }
  }
}
