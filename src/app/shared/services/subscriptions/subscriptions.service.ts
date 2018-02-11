import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GLOBAL } from '../../../config/config';
import 'rxjs/add/operator/map';

@Injectable()
export class SubscriptionsService {
  public url: string;
  private options: RequestOptions;
  private headers: Headers;
  public prefix: string;

  constructor(
    public _http: Http
  ) { 
    this.url = GLOBAL.bot_url;
    this.prefix = GLOBAL.token_prefix;
  }

  addSubscription(obj) {
    this.headers = new Headers({
      'x-access-token': JSON.parse(localStorage.getItem(this.prefix + '_' + 'access_token')).token
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
    return this._http.post(this.url + '/api/v1/subscriptions/subscribe', obj, this.options).map(
      result => {
        return result;
      },
      error => {
        console.log("ERROR: "+error);
        return error;
      }
    );
  }

  deleteSubscription(obj) {
    this.headers = new Headers({
      'x-access-token': JSON.parse(localStorage.getItem(this.prefix + '_' + 'access_token')).token
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
    return this._http.post(this.url + '/api/v1/subscriptions/unsubscribe', obj, this.options).map(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  }

}