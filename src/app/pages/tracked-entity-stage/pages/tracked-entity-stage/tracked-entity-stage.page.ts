import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tracked-entity-stage',
  templateUrl: './tracked-entity-stage.page.html',
  styleUrls: ['./tracked-entity-stage.page.scss'],
})
export class TrackedEntityStagePage implements OnInit {
  currentProgramStage$: Observable<any>;

  constructor() {}

  ngOnInit() {}
}
