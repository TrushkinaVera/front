import { Injectable } from '@angular/core';
import {User} from '../model/model.user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppComponent} from '../app.component';
import {map} from 'rxjs/operators';
import {pipe} from 'rxjs';
import {utf8Encode} from '@angular/compiler/src/util';

@Injectable()
export class UserService {
  constructor(public httpClient: HttpClient) { }

  public getHeaders(user: User): HttpHeaders {
    let base64Credential: string;
    base64Credential = btoa(unescape(encodeURIComponent(user.username + ':' + user.password)));
    let headers: HttpHeaders;
    headers = new HttpHeaders().set('Authorization', 'Basic ' + base64Credential);
    return headers;
  }

  public logIn(user: User) {
    return this.httpClient.get(AppComponent.API_URL + '/account/login',
      {headers: this.getHeaders(user)}).pipe(map((response: Response) => {
      if (JSON.parse(JSON.stringify(response)) != null) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('userHash', btoa( unescape(encodeURIComponent(user.username + ':' + user.password))));
        }
      }));
  }

  logOut() {
    return this.httpClient.post(AppComponent.API_URL + '/logout', {});
  }
  createAccount(user: User) {
    return this.httpClient.post(AppComponent.API_URL + '/account/register' , user);
  }
}
