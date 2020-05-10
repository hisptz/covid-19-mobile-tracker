import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackedEntityInstanceTitleComponent } from './tracked-entity-instance-title.component';

describe('TrackedEntityInstanceTitleComponent', () => {
  let component: TrackedEntityInstanceTitleComponent;
  let fixture: ComponentFixture<TrackedEntityInstanceTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackedEntityInstanceTitleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackedEntityInstanceTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
