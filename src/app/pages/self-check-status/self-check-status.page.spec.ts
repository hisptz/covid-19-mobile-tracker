import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelfCheckStatusPage } from './self-check-status.page';

describe('SelfCheckStatusPage', () => {
  let component: SelfCheckStatusPage;
  let fixture: ComponentFixture<SelfCheckStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelfCheckStatusPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SelfCheckStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
