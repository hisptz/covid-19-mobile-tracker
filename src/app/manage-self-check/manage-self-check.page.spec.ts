import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageSelfCheckPage } from './manage-self-check.page';

describe('ManageSelfCheckPage', () => {
  let component: ManageSelfCheckPage;
  let fixture: ComponentFixture<ManageSelfCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageSelfCheckPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageSelfCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
