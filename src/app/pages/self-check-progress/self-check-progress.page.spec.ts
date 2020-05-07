import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelfCheckProgressPage } from './self-check-progress.page';

describe('SelfCheckProgressPage', () => {
  let component: SelfCheckProgressPage;
  let fixture: ComponentFixture<SelfCheckProgressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelfCheckProgressPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SelfCheckProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
