import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from 'src/app/models';
import { Router } from '@angular/router';
import { Platform, IonRouterOutlet } from '@ionic/angular';

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
