import { TestBed } from '@angular/core/testing';

import { ProgramFormMetadataService } from './program-form-metadata.service';

describe('ProgramFormMetadataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgramFormMetadataService = TestBed.get(
      ProgramFormMetadataService,
    );
    expect(service).toBeTruthy();
  });
});
