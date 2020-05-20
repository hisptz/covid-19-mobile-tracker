import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import {
  DEFAULT_SETTINGS,
  DEFAULT_SELF_CHECK_PROGRAMS,
  DEFAULT_SELF_USER,
} from 'src/app/constants';
import { getAppMetadata } from 'src/app/helpers';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-self-check-home',
  templateUrl: './self-check-home.page.html',
  styleUrls: ['./self-check-home.page.scss'],
})
export class SelfCheckHomePage implements OnInit {
  key: string;

  constructor(private userService: UserService) {
    this.key = 'self-check';
  }

  ngOnInit() {
    this.intiateApp();
  }

  async intiateApp() {
    // deal with default ids
    const currentUser = await this.userService.getCurrentUser(this.key);
  }
}
