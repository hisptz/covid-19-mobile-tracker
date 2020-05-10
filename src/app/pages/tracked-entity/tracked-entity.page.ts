import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracked-entity',
  templateUrl: './tracked-entity.page.html',
  styleUrls: ['./tracked-entity.page.scss'],
})
export class TrackedEntityPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onViewTrackedEntityList(e) {
    e.stopPropagation();
    this.router.navigate(['/tracked-entity-list']);
  }
}
