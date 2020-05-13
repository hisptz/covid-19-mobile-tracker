import { TestBed } from '@angular/core/testing';

import { AttributeReservedValueManagerService } from './attribute-reserved-value-manager.service';

describe('AttributeReservedValueManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttributeReservedValueManagerService = TestBed.get(
      AttributeReservedValueManagerService,
    );
    expect(service).toBeTruthy();
  });
});
