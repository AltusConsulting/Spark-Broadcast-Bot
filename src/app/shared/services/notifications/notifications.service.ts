import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GLOBAL } from '../../../config/config';
import 'rxjs/add/operator/map';
@Injectable()
export class NotificationsService {
  public url: string;
  public prefix: string;
  private headers: Headers;
  private options: RequestOptions;

  constructor(
    public _http: Http
  ) { 
    this.url = GLOBAL.bot_url;
    this.prefix = GLOBAL.token_prefix;
  }

  getTopics() {
    this.headers = new Headers({
      'x-access-token': JSON.parse(localStorage.getItem(this.prefix + '_' + 'access_token')).token
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
    return this._http.get(this.url + '/api/v1/topics', this.options).map(
      result => result.json(),
      error => error.json()
    );
  }

  sendNotifications(obj) {
    this.headers = new Headers({
      'x-access-token': JSON.parse(localStorage.getItem(this.prefix + '_' + 'access_token')).token
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
    return this._http.post(this.url + '/api/v1/notifications', obj, this.options).map(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  }

  deleteTopic(obj) {
    this.headers = new Headers({
      'x-access-token': JSON.parse(localStorage.getItem(this.prefix + '_' + 'access_token')).token
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
    return this._http.delete(this.url + '/api/v1/topics/' + obj.id, this.options).map(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  }

  getSubscribers(id) {
    this.headers = new Headers({
      'x-access-token': JSON.parse(localStorage.getItem(this.prefix + '_' + 'access_token')).token
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
    return this._http.get(this.url + '/api/v1/topics/' + id, this.options).map(
      result => result.json(),
      error => error.json()
    );
  }

}
