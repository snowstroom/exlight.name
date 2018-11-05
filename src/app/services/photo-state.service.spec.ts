import { TestBed, inject } from '@angular/core/testing';

import { PhotoStateService } from './photo-state.service';

describe('PhotoStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotoStateService]
    });
  });

  it('should be created', inject([PhotoStateService], (service: PhotoStateService) => {
    expect(service).toBeTruthy();
  }));
});
