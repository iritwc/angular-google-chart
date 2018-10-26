import { Component, OnInit } from '@angular/core';
import {GeoChartService} from '../geo-chart.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  state: {count: number, country: string};
  countries: string[];
  constructor(private geoChartService: GeoChartService) {}

  ngOnInit() {
    this.state = {count: null, country: ''};
    this.geoChartService.getCountries().subscribe(countries => {
        this.countries = countries;
    });
  }

  onSubmit() {
    console.log('submit', this.state);
    this.geoChartService.post(this.state).subscribe(result => {
      console.log('post', result);
      this.state = {count: null, country: ''};
    });
  }

}
