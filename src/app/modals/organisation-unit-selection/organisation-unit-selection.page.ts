/*
 *
 * Copyright 2019 HISP Tanzania
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 *
 * @since 2019
 * @author Joseph Chingalo <profschingalo@gmail.com>
 *
 */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppColorObject, CurrentUser, OrganisationUnit } from 'src/app/models';
import { OrganisationUnitService } from 'src/app/shared/services/organisation-unit.service';
import { ToasterMessagesService } from 'src/app/shared/services/toaster-messages.service';
import { UserService } from 'src/app/shared/services/user.service';
import { getCurrentOrganisationUnitIds } from 'src/app/store/selectors/organisation-unit.selectors';

import {
  getCurrentUserColorSettings,
  setCurrentOrgUnit,
  State,
} from '../../store';
import { OrganisationUnitSearchPage } from '../organisation-unit-search/organisation-unit-search.page';

@Component({
  selector: 'app-organisation-unit-selection',
  templateUrl: './organisation-unit-selection.page.html',
  styleUrls: ['./organisation-unit-selection.page.scss'],
})
export class OrganisationUnitSelectionPage implements OnInit {
  cancelIcon: string;
  colorSettings$: Observable<AppColorObject>;
  selectedOrganisationUnitIds$: Observable<string[]>;
  organisationUnitList: OrganisationUnit[];
  organisationUnits: OrganisationUnit[];
  allowMultipleSelection: boolean;
  isLoading: boolean;
  isOrganisationUnitToggled: any;

  constructor(
    private modalController: ModalController,
    private store: Store<State>,
    private userService: UserService,
    private organisationUnitService: OrganisationUnitService,
    private toasterMessagesService: ToasterMessagesService,
  ) {
    this.colorSettings$ = this.store.select(getCurrentUserColorSettings);
    this.cancelIcon = 'assets/icon/cancel.png';
    this.allowMultipleSelection = false;
    this.isLoading = true;
    this.isOrganisationUnitToggled = {};
  }

  ngOnInit() {
    this.selectedOrganisationUnitIds$ = this.store.pipe(
      select(getCurrentOrganisationUnitIds),
    );
    const allowMultipleSelection = false;
    this.allowMultipleSelection =
      allowMultipleSelection || this.allowMultipleSelection;

    this.selectedOrganisationUnitIds$
      .pipe(take(1))
      .subscribe((selectedOrganisationUnitIds) => {
        this.discoveringAndSetHierarchy(selectedOrganisationUnitIds);
      });
  }

  async discoveringAndSetHierarchy(selectedOrganisationUnitIds) {
    try {
      await this.setOrganisationUnitHierarchy();
      await this.setToggledOrganisationUnit(selectedOrganisationUnitIds);
    } catch (error) {
      const message = `Error ${JSON.stringify(error)}`;
      console.log({ message });
      this.toasterMessagesService.showToasterMessage(message);
    } finally {
      this.isLoading = false;
    }
  }

  async setOrganisationUnitHierarchy() {
    const currentUser: CurrentUser = await this.userService.getCurrentUser();
    const organisationUnitIds =
      currentUser && currentUser.userOrgUnitIds
        ? currentUser.userOrgUnitIds
        : [];
    if (organisationUnitIds && organisationUnitIds.length > 0) {
      const organisationUnitList = await this.organisationUnitService.getAllOrganisationUnits();
      this.organisationUnitList = _.map(organisationUnitList, _.cloneDeep);
    }
    const organisationUnits = await this.organisationUnitService.getOrganiisationUnitByIds(
      organisationUnitIds,
    );
    this.organisationUnits = _.map(organisationUnits, _.cloneDeep);
  }

  async setToggledOrganisationUnit(organisationUnitIds: string[]) {
    const selectedOrganisayionUnits = await this.organisationUnitService.getOrganiisationUnitByIds(
      organisationUnitIds,
    );
    const toggledIds = _.flattenDeep(
      _.map(selectedOrganisayionUnits, (organisationUnit: OrganisationUnit) => {
        const { ancestors } = organisationUnit;
        return _.map(ancestors, (ancestor: OrganisationUnit) => ancestor.id);
      }),
    );
    for (const id of toggledIds) {
      this.isOrganisationUnitToggled[id] = true;
    }
  }

  async closeModal(data?: any) {
    await this.modalController.dismiss(data);
  }

  // @TODO handling multiple selections
  async onSelectOrganisationUnit(currentOrganisationUnit: OrganisationUnit) {
    this.store.dispatch(setCurrentOrgUnit({ currentOrganisationUnit }));
  }

  async openOrganisationUnitSetSearchModal(selectedOrganisationUnitIds) {
    const modal = await this.modalController.create({
      component: OrganisationUnitSearchPage,
      componentProps: {
        selectedOrganisayionUnitIds: selectedOrganisationUnitIds,
        organisationUnitList: this.organisationUnitList,
      },
      cssClass: 'inset-modal',
    });
    modal.present();
    const response = await modal.onDidDismiss();
    if (response && response.data) {
      const { data } = response;
      this.onSelectOrganisationUnit(data);
    }
  }

  trackByFn(index: any, organisationUnit: OrganisationUnit) {
    return organisationUnit && organisationUnit.id
      ? organisationUnit.id
      : index;
  }
}
