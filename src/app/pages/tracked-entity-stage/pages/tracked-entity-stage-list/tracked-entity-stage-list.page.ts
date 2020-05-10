import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from 'src/app/models';
import { Store, select } from '@ngrx/store';
import { State, setCurrentProgramStage } from 'src/app/store';
import { Router } from '@angular/router';
import { getCurrentProgram } from 'src/app/store/selectors/selections.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tracked-entity-stage-list',
  templateUrl: './tracked-entity-stage-list.page.html',
  styleUrls: ['./tracked-entity-stage-list.page.scss'],
})
export class TrackedEntityStageListPage implements OnInit {
  currentProgram$: Observable<Program>;
  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit() {
    this.currentProgram$ = this.store.pipe(select(getCurrentProgram));
    this.currentProgram$.pipe(take(1)).subscribe((currentProgram: Program) => {
      if (!currentProgram) {
        this.router.navigate(['/chw-home']);
      }
    });
  }

  onSetProgramStage(e, currentProgramStage) {
    e.stopPropagation();
    this.store.dispatch(setCurrentProgramStage({ currentProgramStage }));
    this.router.navigate(['/tracked-entity/stage/events']);
  }
}
