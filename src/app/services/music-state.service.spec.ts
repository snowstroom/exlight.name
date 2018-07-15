import { TestBed, inject } from '@angular/core/testing';

import { MusicStateService } from './music-state.service';

describe('MusicStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusicStateService]
    });
  });

  it('should be created', inject([MusicStateService], (service: MusicStateService) => {
    expect(service).toBeTruthy();
  }));
});
