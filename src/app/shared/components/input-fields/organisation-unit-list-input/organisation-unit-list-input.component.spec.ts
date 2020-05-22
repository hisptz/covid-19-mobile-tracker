import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrganisationUnitListInputComponent } from './organisation-unit-list-input.component';

describe('OrganisationUnitListInputComponent', () => {
  let component: OrganisationUnitListInputComponent;
  let fixture: ComponentFixture<OrganisationUnitListInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationUnitListInputComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrganisationUnitListInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
