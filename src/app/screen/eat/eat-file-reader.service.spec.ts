import { TestBed, inject } from '@angular/core/testing';

import { EatFileReaderService } from './eat-file-reader.service';

describe('EatFileReaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EatFileReaderService]
    });
  });

  it('should be created', inject([EatFileReaderService], (service: EatFileReaderService) => {
    expect(service).toBeTruthy();
  }));
});
