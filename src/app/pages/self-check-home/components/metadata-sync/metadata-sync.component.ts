import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrentUser } from 'src/app/models';
import { getAppMetadata } from 'src/app/helpers';
import { DEFAULT_SELF_CHECK_HOME_CONTENTS } from 'src/app/constants';

@Component({
  selector: 'app-metadata-sync',
  templateUrl: './metadata-sync.component.html',
  styleUrls: ['./metadata-sync.component.scss'],
})
export class MetadataSyncComponent implements OnInit {
  @Input() currentUser: CurrentUser;
  @Input() showPercentage: boolean;
  @Input() shouldOverrideOverAllMessages: boolean;
  @Input() overAllMessage: string;

  @Input() showSlides: boolean;

  @Output()
  successOnLoginAndSyncMetadata = new EventEmitter();
  @Output()
  updateCurrentUser = new EventEmitter();
  @Output()
  failOnLogin = new EventEmitter();

  processes: any;
  isOnLogin: boolean;
  showOverallProgressBar: boolean;
  hideSubProcesses: boolean;
  showCancelButton: boolean;

  defaultAppMetadata: any;

  slideOpts: any;
  slides: any;

  constructor() {
    this.processes = getAppMetadata();
    this.isOnLogin = true;
    this.showOverallProgressBar = true;
    this.hideSubProcesses = true;
    this.showCancelButton = false;
    this.slideOpts = {
      initialSlide: 0,
      speed: 500,
      effect: 'cube',
      autoplay: true,
      autoHeight: true,
    };
    this.slides = DEFAULT_SELF_CHECK_HOME_CONTENTS;
  }

  ngOnInit() {
    this.showPercentage =
      this.showPercentage === undefined ? false : this.showPercentage;
    if (!this.showPercentage) {
      this.overAllMessage = '';
    }
  }

  onUpdateCurrentUser(data: any) {
    this.updateCurrentUser.emit(data);
  }

  onFailLogin(data: any) {
    this.failOnLogin.emit(data);
  }

  onSuccessLogin(data: any) {
    this.successOnLoginAndSyncMetadata.emit(data);
  }
}
