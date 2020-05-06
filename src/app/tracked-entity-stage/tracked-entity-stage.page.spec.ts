import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackedEntityStagePage } from './tracked-entity-stage.page';

describe('TrackedEntityStagePage', () => {
  let component: TrackedEntityStagePage;
  let fixture: ComponentFixture<TrackedEntityStagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackedEntityStagePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackedEntityStagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
