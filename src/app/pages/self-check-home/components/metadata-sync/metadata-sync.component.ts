import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrentUser } from 'src/app/models';
import { getAppMetadata } from 'src/app/helpers';

@Component({
  selector: 'app-metadata-sync',
  templateUrl: './metadata-sync.component.html',
  styleUrls: ['./metadata-sync.component.scss'],
})
export class MetadataSyncComponent implements OnInit {
  @Input() currentUser: CurrentUser;
  @Input() showPercentage: boolean;
  @Input() shouldOverrideOverAllMessages: boolean;

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
  overAllLoginMessage: string;
  defaultAppMetadata: any;

  constructor() {
    this.processes = getAppMetadata();
    this.isOnLogin = true;
    this.showOverallProgressBar = true;
    this.hideSubProcesses = true;
    this.showCancelButton = false;
  }

  ngOnInit() {
    this.showPercentage =
      this.showPercentage === undefined ? false : this.showPercentage;
    if (!this.showPercentage) {
      this.overAllLoginMessage = '';
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
