/*
 *
 * Copyright 2019 HISP Tanzania
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 *
 * @since 2019
 * @author Joseph Chingalo <profschingalo@gmail.com>
 *
 */
import { Injectable } from '@angular/core';
import * as currentUserAction from '../actions/current-user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, concatMap, withLatestFrom, tap } from 'rxjs/operators';
import {
  saveTrackedEntityInstance,
  saveTrackedEntityInstanceComplete,
} from '../actions';
import { Store, select } from '@ngrx/store';
import { State } from '../reducers';
import { getCurrentTrackedEntityInstance } from '../selectors/selections.selectors';
import { ProgramFormDataService } from 'src/app/shared/services/program-form-data.service';
import { Router } from '@angular/router';

@Injectable()
export class SelectionsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private router: Router,
    private programDataService: ProgramFormDataService,
  ) {}

  saveTrackedEntityInstance$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveTrackedEntityInstance),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(
              this.store.pipe(select(getCurrentTrackedEntityInstance)),
            ),
          ),
        ),
        tap(async ([{}, trackedEntityInstance]) => {
          try {
            await this.programDataService.savingTrackedEntityInstancesToLocalStorage(
              [trackedEntityInstance],
            );
          } catch (e) {
            console.log(e);
          }
          // TODO: Add support for pop notification to show saving progress
          this.store.dispatch(saveTrackedEntityInstanceComplete());
          this.router.navigate(['/tracked-entity-list']);
        }),
      ),
    { dispatch: false },
  );
}
