import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { GLOBAL } from '../../../config/config';
import 'rxjs/add/operator/map';

@Injectable()
export class ManagementService {
  public url: string;
  private options: RequestOptions;
  private headers: Headers;
  public prefix: string;

  constructor(
    public _http: Http
  ) {
    this.url= GLOBAL.bot_url;
    this.prefix = GLOBAL.token_prefix;
   }


   setOptions() {
    this.headers = new Headers({
      'x-access-token': JSON.parse(localStorage.getItem(this.prefix + '_' + 'access_token')).token
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
   }

   getAllAdmins() {
    this.setOptions();
    return this._http.get(this.url + '/api/v1/admins', this.options).map(
       result => result.json(),
       error => error.json()
     );
   }

   getAdmin(adm: string) {
    this.setOptions();
    return this._http.get(this.url + '/api/v1/admins' + adm).map(
      result => result.json(),
      error => error.json()
    );
   }

   addAdmin(adm) {
    this.setOptions();
     return this._http.post(this.url + '/api/v1/admins', adm, this.options).map(
      result => {
        return result;
      },
      error => {
        return error
      }
    );
   }

   deleteAdmin(adm) {
    this.setOptions();
    return this._http.delete(this.url + '/api/v1/admins/' + adm.id, this.options).map(
      result => {
        return result;
      },
      error => {
        return error
      }
    );
   }

}
