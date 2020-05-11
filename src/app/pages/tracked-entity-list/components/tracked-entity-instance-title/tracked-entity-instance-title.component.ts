import { Component, OnInit, Input } from '@angular/core';
import { TrackedEntityInstance } from 'src/app/models';

@Component({
  selector: 'app-tracked-entity-instance-title',
  templateUrl: './tracked-entity-instance-title.component.html',
  styleUrls: ['./tracked-entity-instance-title.component.scss'],
})
export class TrackedEntityInstanceTitleComponent implements OnInit {
  @Input() trackedEntityInstance: TrackedEntityInstance;
  constructor() {}

  ngOnInit() {}
}
