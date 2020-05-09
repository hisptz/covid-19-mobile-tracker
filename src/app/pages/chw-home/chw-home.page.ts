import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { State, setCurrentProgram } from 'src/app/store';
import { Observable, of } from 'rxjs';
import { OrganisationUnit, CurrentUser, Program } from 'src/app/models';
import { getCurrentOrganisationUnit } from 'src/app/store/selectors/selections.selectors';
import { OrganisationUnitSelectionPage } from 'src/app/modals/organisation-unit-selection/organisation-unit-selection.page';
import { ProgramService } from 'src/app/shared/services/program.service';
import { ProgramSelectionService } from 'src/app/shared/services/program-selection.service';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { DEFAULT_CHW_PROGRAMS } from 'src/app/constants/default-chw-programs';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chw-home',
  templateUrl: './chw-home.page.html',
  styleUrls: ['./chw-home.page.scss'],
})
export class ChwHomePage implements OnInit {
  currentOrganisationUnit$: Observable<OrganisationUnit>;
  programs: Program[];
  constructor(
    private menuCtrl: MenuController,
    private modalController: ModalController,
    private programService: ProgramSelectionService,
    private userService: UserService,
    private router: Router,
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

  onSelectProgram(e, currentProgram: Program) {
    e.stopPropagation();
    this.store.dispatch(
      setCurrentProgram({
        currentProgram,
        currentProgramSourceAttribute: currentProgram.selectedAttribute,
      }),
    );

    this.router.navigate(['/tracked-entity-list']);
  }

  async setPrograms(selectedOrganisationUnit: OrganisationUnit) {
    const currentUser: CurrentUser = await this.userService.getCurrentUser();
    const programs = await this.programService.getProgramListBySelectedOrganisationUnitAndRoles(
      selectedOrganisationUnit.id,
      'WITH_REGISTRATION',
      currentUser ? currentUser.programs : [],
      currentUser ? currentUser.authorities : [],
    );

    this.programs = _.filter(
      _.flatten(
        DEFAULT_CHW_PROGRAMS.map((defaultProgram: any) => {
          const program = _.find(programs, ['id', defaultProgram.id]);
          // TODO: Add implementation to split program based on selected source attributes
          return [program];
        }),
      ),
      (program) => program.id,
    );
    console.log(JSON.stringify(this.programs));
  }
}
