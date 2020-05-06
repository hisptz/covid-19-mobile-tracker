import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LanguageListComponent } from './language-list.component';

describe('LanguageListComponent', () => {
  let component: LanguageListComponent;
  let fixture: ComponentFixture<LanguageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageListComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
