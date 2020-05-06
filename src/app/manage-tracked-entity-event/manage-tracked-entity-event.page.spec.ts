import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageTrackedEntityEventPage } from './manage-tracked-entity-event.page';

describe('ManageTrackedEntityEventPage', () => {
  let component: ManageTrackedEntityEventPage;
  let fixture: ComponentFixture<ManageTrackedEntityEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTrackedEntityEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageTrackedEntityEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
