import { TestBed, inject } from '@angular/core/testing';

import { ArticleStateService } from './article-state.service';

describe('ArticleStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleStateService]
    });
  });

  it('should be created', inject([ArticleStateService], (service: ArticleStateService) => {
    expect(service).toBeTruthy();
  }));
});
