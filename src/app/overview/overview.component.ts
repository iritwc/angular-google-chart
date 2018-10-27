import { Component, OnInit, OnDestroy } from '@angular/core';
import {timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {GeoChartBaseService} from '../geo-chart-base.service';
import {GeoChartService} from '../geo-chart.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {

  elementId: string;
  timer$;
  constructor(private geoChartBaseService: GeoChartBaseService,
              private geoChartService: GeoChartService) {
        this.elementId = 'regions_div';
  }

  ngOnInit() {
      // apply the polling as an interval using Subject
      this.timer$ = timer(0, 10000).pipe(switchMap(() => this.geoChartService.get()))
          .subscribe(users => {
              const data = [['Country', 'Users'], ...users.map(val => [val.country, val.count])];
              this.geoChartBaseService.BuildGeoChart(this.elementId, data);
          });

  }

  ngOnDestroy() {
      this.timer$.unsubscribe();
  }
}
