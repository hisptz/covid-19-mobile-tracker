import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tracked-entity',
  templateUrl: './tracked-entity.page.html',
  styleUrls: ['./tracked-entity.page.scss'],
})
export class TrackedEntityPage implements OnInit {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(private platform: Platform, private router: Router) {
    this.platform.backButton.subscribe(() => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        }
      });
    });
  }

  ngOnInit() {}
}
