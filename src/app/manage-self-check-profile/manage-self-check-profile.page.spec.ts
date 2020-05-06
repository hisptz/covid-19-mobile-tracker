import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageSelfCheckProfilePage } from './manage-self-check-profile.page';

describe('ManageSelfCheckProfilePage', () => {
  let component: ManageSelfCheckProfilePage;
  let fixture: ComponentFixture<ManageSelfCheckProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSelfCheckProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageSelfCheckProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
