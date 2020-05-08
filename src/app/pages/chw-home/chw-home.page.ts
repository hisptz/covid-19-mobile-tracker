import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store';
import { Observable, of } from 'rxjs';
import { OrganisationUnit, CurrentUser } from 'src/app/models';
import { getCurrentOrganisationUnit } from 'src/app/store/selectors/organisation-unit.selectors';
import { OrganisationUnitSelectionPage } from 'src/app/modals/organisation-unit-selection/organisation-unit-selection.page';
import { ProgramService } from 'src/app/shared/services/program.service';
import { ProgramSelectionService } from 'src/app/shared/services/program-selection.service';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-chw-home',
  templateUrl: './chw-home.page.html',
  styleUrls: ['./chw-home.page.scss'],
})
export class ChwHomePage implements OnInit {
  currentOrganisationUnit$: Observable<OrganisationUnit>;
  programs: any[];
  constructor(
    private menuCtrl: MenuController,
    private modalController: ModalController,
    private programService: ProgramSelectionService,
    private userService: UserService,
    private store: Store<State>,
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.currentOrganisationUnit$ = this.store.pipe(
      select(getCurrentOrganisationUnit),
    );

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

  async setPrograms(selectedOrganisationUnit: OrganisationUnit) {
    const currentUser: CurrentUser = await this.userService.getCurrentUser();
    this.programs = await this.programService.getProgramListBySelectedOrganisationUnitAndRoles(
      selectedOrganisationUnit.id,
      'WITH_REGISTRATION',
      currentUser ? currentUser.programs : [],
      currentUser ? currentUser.authorities : [],
    );
  }
}
