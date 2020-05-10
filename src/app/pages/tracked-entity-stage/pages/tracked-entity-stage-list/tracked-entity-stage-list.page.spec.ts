import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackedEntityStageListPage } from './tracked-entity-stage-list.page';

describe('TrackedEntityStageListPage', () => {
  let component: TrackedEntityStageListPage;
  let fixture: ComponentFixture<TrackedEntityStageListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackedEntityStageListPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackedEntityStageListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
