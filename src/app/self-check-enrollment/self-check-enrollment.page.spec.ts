import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelfCheckEnrollmentPage } from './self-check-enrollment.page';

describe('SelfCheckEnrollmentPage', () => {
  let component: SelfCheckEnrollmentPage;
  let fixture: ComponentFixture<SelfCheckEnrollmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfCheckEnrollmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelfCheckEnrollmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
