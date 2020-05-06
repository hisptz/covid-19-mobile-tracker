import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelfCheckHomePage } from './self-check-home.page';

describe('SelfCheckHomePage', () => {
  let component: SelfCheckHomePage;
  let fixture: ComponentFixture<SelfCheckHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelfCheckHomePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SelfCheckHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
