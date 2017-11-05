import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GLOBAL } from '../../../config/config';
import 'rxjs/add/operator/map';

@Injectable()
export class StatsService {
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

   getTotalSubscribersbyTopic(id) {
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
