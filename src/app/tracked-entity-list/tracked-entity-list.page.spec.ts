import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackedEntityListPage } from './tracked-entity-list.page';

describe('TrackedEntityListPage', () => {
  let component: TrackedEntityListPage;
  let fixture: ComponentFixture<TrackedEntityListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackedEntityListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackedEntityListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
