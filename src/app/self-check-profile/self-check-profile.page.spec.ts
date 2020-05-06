import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelfCheckProfilePage } from './self-check-profile.page';

describe('SelfCheckProfilePage', () => {
  let component: SelfCheckProfilePage;
  let fixture: ComponentFixture<SelfCheckProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfCheckProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelfCheckProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
