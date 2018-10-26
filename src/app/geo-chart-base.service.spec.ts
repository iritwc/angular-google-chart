import { TestBed, inject } from '@angular/core/testing';

import { GeoChartBaseService } from './geo-chart-base.service';

describe('GeoChartBaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoChartBaseService]
    });
  });

  it('should be created', inject([GeoChartBaseService], (service: GeoChartBaseService) => {
    expect(service).toBeTruthy();
  }));
});
