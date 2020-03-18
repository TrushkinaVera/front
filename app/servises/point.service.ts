import { Injectable } from '@angular/core';
import { Point} from '../model/model.point';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppComponent} from '../app.component';
import {Observable} from 'rxjs';

@Injectable()
export class PointService {

  constructor(public http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    let base64Credential: string;
    base64Credential = localStorage.getItem('userHash');

    let headers: HttpHeaders;
    headers = new HttpHeaders().set('Authorization', 'Basic ' + base64Credential);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  public addPoint(point: Point) {
    const body = {x: point.x, y: point.y, r: point.r};
    return this.http.post(AppComponent.API_URL + '/points', body, {headers: this.getHeaders()}).toPromise();
  }
  public getPointsRecalculated(r): Observable<any> {
    return this.http.get(AppComponent.API_URL + '/points/' + r, { headers: this.getHeaders()});
  }
  public getPoints(): Observable<any> {
    return this.http.get(AppComponent.API_URL + '/points', { headers: this.getHeaders()});
  }


}
