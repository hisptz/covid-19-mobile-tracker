import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MetadataSyncComponent } from './metadata-sync.component';

describe('MetadataSyncComponent', () => {
  let component: MetadataSyncComponent;
  let fixture: ComponentFixture<MetadataSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetadataSyncComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MetadataSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
