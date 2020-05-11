import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackedEntityStageEventListPage } from './tracked-entity-stage-event-list.page';

describe('TrackedEntityStageEventListPage', () => {
  let component: TrackedEntityStageEventListPage;
  let fixture: ComponentFixture<TrackedEntityStageEventListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackedEntityStageEventListPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackedEntityStageEventListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
