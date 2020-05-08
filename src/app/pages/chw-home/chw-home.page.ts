import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store';
import { Observable } from 'rxjs';
import { OrganisationUnit } from 'src/app/models';
import { getCurrentOrganisationUnit } from 'src/app/store/selectors/organisation-unit.selectors';

@Component({
  selector: 'app-chw-home',
  templateUrl: './chw-home.page.html',
  styleUrls: ['./chw-home.page.scss'],
})
export class ChwHomePage implements OnInit {
  currentOrganisationUnit$: Observable<OrganisationUnit>;
  constructor(private menuCtrl: MenuController, private store: Store<State>) {}

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.currentOrganisationUnit$ = this.store.pipe(
      select(getCurrentOrganisationUnit),
    );
  }
}
