import { TestBed, inject } from '@angular/core/testing';

import { TravelFileReaderService } from './travel-file-reader.service';

describe('TravelFileReaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravelFileReaderService]
    });
  });

  it('should be created', inject([TravelFileReaderService], (service: TravelFileReaderService) => {
    expect(service).toBeTruthy();
  }));
});
