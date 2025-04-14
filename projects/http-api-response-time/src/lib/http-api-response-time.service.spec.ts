import { TestBed } from '@angular/core/testing';

import { HttpApiResponseTimeService } from './http-api-response-time.service';

describe('HttpApiResponseTimeService', () => {
  let service: HttpApiResponseTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpApiResponseTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
