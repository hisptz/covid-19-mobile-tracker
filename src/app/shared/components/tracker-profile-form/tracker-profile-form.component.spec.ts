import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackerProfileFormComponent } from './tracker-profile-form.component';

describe('TrackerProfileFormComponent', () => {
  let component: TrackerProfileFormComponent;
  let fixture: ComponentFixture<TrackerProfileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackerProfileFormComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackerProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
