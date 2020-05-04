import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RumorPage } from './rumor.page';

describe('RumorPage', () => {
  let component: RumorPage;
  let fixture: ComponentFixture<RumorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RumorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RumorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
