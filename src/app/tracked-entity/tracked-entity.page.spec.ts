import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackedEntityPage } from './tracked-entity.page';

describe('TrackedEntityPage', () => {
  let component: TrackedEntityPage;
  let fixture: ComponentFixture<TrackedEntityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackedEntityPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackedEntityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
