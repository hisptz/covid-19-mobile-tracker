import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackedEntityRelationshipPage } from './tracked-entity-relationship.page';

describe('TrackedEntityRelationshipPage', () => {
  let component: TrackedEntityRelationshipPage;
  let fixture: ComponentFixture<TrackedEntityRelationshipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackedEntityRelationshipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackedEntityRelationshipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
