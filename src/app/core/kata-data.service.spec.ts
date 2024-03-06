import { TestBed } from '@angular/core/testing';

import { KataDataService } from './kata-data.service';

describe('KataDataService', () => {
  let service: KataDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KataDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
