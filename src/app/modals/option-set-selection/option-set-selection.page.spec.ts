import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSetSelectionPage } from './option-set-selection.page';

describe('OptionSetSelectionPage', () => {
  let component: OptionSetSelectionPage;
  let fixture: ComponentFixture<OptionSetSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionSetSelectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionSetSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
