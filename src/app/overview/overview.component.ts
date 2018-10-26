import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subject, interval } from 'rxjs';
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
  polling$ = new Subject<string>();

  constructor(private geoChartBaseService: GeoChartBaseService,
              private geoChartService: GeoChartService) {
        this.elementId = 'regions_div';
  }

  ngOnInit() {
      // apply the polling as an interval using Subject
      this.timer$ = interval(20000)
          .subscribe(() => this.polling$.next(new Date().toString()));
      // handle chart data request
      this.polling$.pipe(switchMap(() => this.geoChartService.get()))
        .subscribe(users => {
              console.log('subscribe users');
              const data = [['Country', 'Users'], ...users.map(val => [val.country, val.count])];
              this.geoChartBaseService.BuildGeoChart(this.elementId, data);
      });
      this.polling$.next(''); // first trigger - with initial value
  }

  ngOnDestroy() {
      this.timer$.unsubscribe();
  }
}
