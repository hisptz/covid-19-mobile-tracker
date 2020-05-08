import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store';
import { Observable } from 'rxjs';
import { OrganisationUnit } from 'src/app/models';
import { getCurrentOrganisationUnit } from 'src/app/store/selectors/organisation-unit.selectors';
import { OrganisationUnitSelectionPage } from 'src/app/modals/organisation-unit-selection/organisation-unit-selection.page';

@Component({
  selector: 'app-chw-home',
  templateUrl: './chw-home.page.html',
  styleUrls: ['./chw-home.page.scss'],
})
export class ChwHomePage implements OnInit {
  currentOrganisationUnit$: Observable<OrganisationUnit>;
  constructor(
    private menuCtrl: MenuController,
    private modalController: ModalController,
    private store: Store<State>,
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.currentOrganisationUnit$ = this.store.pipe(
      select(getCurrentOrganisationUnit),
    );
  }

  async openOrganisationUnitModal(e) {
    e.stopPropagation();
    const modal = await this.modalController.create({
      component: OrganisationUnitSelectionPage,
    });

    return await modal.present();
  }
}
