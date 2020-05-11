import { TestBed } from '@angular/core/testing';

import { ProgramFormDataService } from './program-form-data.service';

describe('ProgramFormDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgramFormDataService = TestBed.get(ProgramFormDataService);
    expect(service).toBeTruthy();
  });
});
