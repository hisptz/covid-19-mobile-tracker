import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-chw-home',
  templateUrl: './chw-home.page.html',
  styleUrls: ['./chw-home.page.scss'],
})
export class ChwHomePage implements OnInit {
  constructor(private menuCtrl: MenuController) {}

  ngOnInit() {
    this.menuCtrl.enable(true);
  }
}
