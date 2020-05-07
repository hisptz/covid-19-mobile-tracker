import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChwHomePage } from './chw-home.page';

describe('ChwHomePage', () => {
  let component: ChwHomePage;
  let fixture: ComponentFixture<ChwHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChwHomePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChwHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
