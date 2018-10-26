import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {of, Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {GeoChartBaseService} from './geo-chart-base.service';

@Injectable({
  providedIn: 'root'
})
export class GeoChartService {

  apiUrl = 'https://bigid-frontend-task.azurewebsites.net/users'; // http://long-sun-7734.getsandbox.com/users
  constructor(private http: HttpClient, c: GeoChartBaseService) { }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(operation, error); // log to console instead
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    get(): Observable<any> {
      return this.http.get<any>(this.apiUrl)
          .pipe(
              // TODO: this is a patch due to the difference in the APIs
              map(list => list.map(item => ({country: item.country, count: item.count || item.users}))),
              catchError(this.handleError('get chart data', []))
          );
    }
    getCountries(): Observable<any> {
        return this.http.get<any>(this.apiUrl)
            .pipe(
                map(list => list.map(item => item.country)),
                catchError(this.handleError('get countries'))
        );
    }
    post(data: {country, count}) {
      // TODO : adjust when api is stable
        const {count: users, country} = data;
        return this.http.post(this.apiUrl, {country, users})
            .pipe(
                catchError(this.handleError('post chart info', []))
            );
    }
}
