import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { State, setCurrentProgram } from 'src/app/store';
import { Observable, of } from 'rxjs';
import { OrganisationUnit, CurrentUser, Program } from 'src/app/models';
import { getCurrentOrganisationUnit } from 'src/app/store/selectors/selections.selectors';
import { OrganisationUnitSelectionPage } from 'src/app/shared/modals/organisation-unit-selection/organisation-unit-selection.page';
import { ProgramSelectionService } from 'src/app/shared/services/program-selection.service';
import { UserService } from 'src/app/shared/services/user.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { SynchronizationService } from 'src/app/shared/services/synchronization.service';
import { AttributeReservedValueManagerService } from 'src/app/shared/services/attribute-reserved-value-manager.service';

@Component({
  selector: 'app-chw-home',
  templateUrl: './chw-home.page.html',
  styleUrls: ['./chw-home.page.scss'],
})
export class ChwHomePage implements OnInit {
  currentOrganisationUnit$: Observable<OrganisationUnit>;
  programs: Program[];
  isLoading: boolean;
  constructor(
    private menuCtrl: MenuController,
    private modalController: ModalController,
    private programService: ProgramSelectionService,
    private synchronizationService: SynchronizationService,
    private userService: UserService,
    private router: Router,
    private store: Store<State>,
    private attributeReservedValueManagerService: AttributeReservedValueManagerService,
  ) {}

  ngOnInit() {
    this.attributeReservedValueManagerService
      .regenerateAttributeReservedValues()
      .then(() => {});
    this.isLoading = true;
    this.menuCtrl.enable(true);
    this.currentOrganisationUnit$ = this.store.pipe(
      select(getCurrentOrganisationUnit),
    );
    this.synchronizationService.startSynchronization();
    this.currentOrganisationUnit$.subscribe(
      (selectedOrganisationUnit: OrganisationUnit) => {
        if (selectedOrganisationUnit) {
          this.setPrograms(selectedOrganisationUnit);
        }
      },
    );
  }

  async openOrganisationUnitModal(e) {
    e.stopPropagation();
    const modal = await this.modalController.create({
      component: OrganisationUnitSelectionPage,
    });

    return await modal.present();
  }

  onSelectProgram(e, currentProgram: Program) {
    e.stopPropagation();
    this.store.dispatch(
      setCurrentProgram({
        currentProgram,
        currentProgramTrackedEntityAttribute:
          currentProgram.currentProgramTrackedEntityAttribute,
      }),
    );
    this.router.navigate(['/tracked-entity-list']);
  }

  async setPrograms(selectedOrganisationUnit: OrganisationUnit) {
    this.isLoading = true;
    const currentUser: CurrentUser = await this.userService.getCurrentUser();
    this.programs = await this.programService.getProgramListBySelectedOrganisationUnitAndRoles(
      selectedOrganisationUnit.id,
      'WITH_REGISTRATION',
      currentUser ? currentUser.programs : [],
      currentUser ? currentUser.authorities : [],
    );
    this.isLoading = false;
  }
}
