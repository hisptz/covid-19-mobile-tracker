import { Component, OnInit, Input } from '@angular/core';
import { Program, TrackedEntityInstance, CurrentUser } from 'src/app/models';

@Component({
  selector: 'app-tracker-profile-form',
  templateUrl: './tracker-profile-form.component.html',
  styleUrls: ['./tracker-profile-form.component.scss'],
})
export class TrackerProfileFormComponent implements OnInit {
  @Input() program: Program;
  @Input() trackedEntityInstance: TrackedEntityInstance;
  @Input() currentUser: CurrentUser;
  @Input() attributeObject: any;

  dataObject: any;
  hiddenFields: any;
  trackedEntityAttributesSavingStatusClass: any;
  constructor() {}

  ngOnInit() {
    this.dataObject = {};
    this.hiddenFields = {};
    this.trackedEntityAttributesSavingStatusClass = {};
    console.log(this.program);
  }
}
