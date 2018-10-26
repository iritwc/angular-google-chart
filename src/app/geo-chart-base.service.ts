import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GeoChartBaseService {

  // chart;
  constructor() {
      google.charts.load('current', {
          'packages': ['geochart'],
          // Note: you will need to get a mapsApiKey for your project.
          // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
          // 'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
  }

  private buildGeoChart(data: any[], chartFunc: any, options: any): void {
        const func = (chartFunc, options) => {
            const dataTable = google.visualization.arrayToDataTable(data);
            chartFunc().draw(dataTable, options);
        };
        const callback = () => func(chartFunc, options);
        google.charts.setOnLoadCallback(callback);
    }

    BuildGeoChart(elementId: string, data: any[], options: any = {}): void {
      const chartFunc = () => new google.visualization.GeoChart(document.getElementById(elementId));
      this.buildGeoChart(data, chartFunc, options);
  }
}
