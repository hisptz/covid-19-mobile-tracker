import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageTrackedEntityProfilePage } from './manage-tracked-entity-profile.page';

describe('ManageTrackedEntityProfilePage', () => {
  let component: ManageTrackedEntityProfilePage;
  let fixture: ComponentFixture<ManageTrackedEntityProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTrackedEntityProfilePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageTrackedEntityProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
