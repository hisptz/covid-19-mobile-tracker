import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackedEntityProfilePage } from './tracked-entity-profile.page';

describe('TrackedEntityProfilePage', () => {
  let component: TrackedEntityProfilePage;
  let fixture: ComponentFixture<TrackedEntityProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackedEntityProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackedEntityProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
