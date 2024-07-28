import { TestBed } from '@angular/core/testing';

import { KeyboardControlService } from './keyboard-control.service';

describe('KeyboardControlService', () => {
  let service: KeyboardControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboardControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
