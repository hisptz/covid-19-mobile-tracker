import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State, setCurrentTrackedEntityInstance } from 'src/app/store';
import {
  getCurrentProgram,
  getSelfCheckSections,
  getTrackedEntityInstanceDates,
  getCurrentProgramTrackedEntityAttribute,
  getCurrentTrackedEntityInstance,
  getTrackedEntityInstanceAttributeObject,
} from 'src/app/store/selectors/selections.selectors';
import { take } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { CurrentUser } from 'src/app/models';
import { UserService } from 'src/app/shared/services/user.service';
import { DEFAULT_SELF_CHECK_KEY } from 'src/app/constants';

@Component({
  selector: 'app-manage-self-check-profile',
  templateUrl: './manage-self-check-profile.page.html',
  styleUrls: ['./manage-self-check-profile.page.scss'],
})
export class ManageSelfCheckProfilePage implements OnInit {
  currentProgramTrackedEntityAttribute$: Observable<any>;
  currentTrackedEntityInstance$: Observable<any>;
  trackedEntityInstanceAttributeValueObject$: Observable<any>;
  trackedEntityInstanceDates$: Observable<any>;
  currentUser$: Observable<CurrentUser>;

  formSections: any[];
  currentSection: any;
  isDataCorrect: boolean;
  isSectionReady: boolean;
  constructor(
    private router: Router,
    private store: Store<State>,
    private userService: UserService,
  ) {}

  get isButtonDisabled(): boolean {
    if (!this.currentSection) {
      return true;
    }

    if (this.currentSection.isDeclaration) {
      return !this.isDataCorrect;
    }

    if (this.currentSection.isForMessage) {
      return false;
    }

    return !this.isSectionReady;
  }

  ngOnInit() {
    this.trackedEntityInstanceDates$ = this.store.pipe(
      select(getTrackedEntityInstanceDates),
    );

    this.currentProgramTrackedEntityAttribute$ = this.store.pipe(
      select(getCurrentProgramTrackedEntityAttribute),
    );
    this.currentTrackedEntityInstance$ = this.store.pipe(
      select(getCurrentTrackedEntityInstance),
    );
    this.trackedEntityInstanceAttributeValueObject$ = this.store.pipe(
      select(getTrackedEntityInstanceAttributeObject),
    );
    this.currentUser$ = from(
      this.userService.getCurrentUser(DEFAULT_SELF_CHECK_KEY),
    );

    this.store
      .pipe(select(getSelfCheckSections))
      .pipe(take(1))
      .subscribe((formSections: any[]) => {
        this.formSections = formSections;
        this.currentSection = this.formSections[0];
      });
  }

  onBack(e, currentIndex: number) {
    e.stopPropagation();
    if (currentIndex !== 0) {
      this.currentSection = this.formSections[currentIndex - 1];
    } else {
      this.router.navigate(['/self-check/status']);
    }
  }
  onNext(e, currentIndex: number, isLastSection: boolean) {
    e.stopPropagation();
    if (!isLastSection) {
      this.currentSection = this.formSections[currentIndex + 1];
    } else {
      this.router.navigate(['/self-check/status']);
    }
  }

  onProfileUpdate(profileDetails: any) {
    if (profileDetails) {
      const { currentTrackedEntityInstance, isFormReady } = profileDetails;
      this.isSectionReady = isFormReady;
      this.store.dispatch(
        setCurrentTrackedEntityInstance({ currentTrackedEntityInstance }),
      );
    }
  }
}
