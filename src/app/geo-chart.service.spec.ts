import { TestBed, inject } from '@angular/core/testing';

import { GeoChartService } from './geo-chart.service';

describe('GeoChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoChartService]
    });
  });

  it('should be created', inject([GeoChartService], (service: GeoChartService) => {
    expect(service).toBeTruthy();
  }));
});
