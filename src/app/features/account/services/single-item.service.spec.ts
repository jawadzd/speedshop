import { TestBed } from '@angular/core/testing';

import { SingleItemService } from './single-item.service';

describe('SingleItemService', () => {
  let service: SingleItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
