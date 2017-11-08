import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../../../config/config';
import * as _ from 'lodash';


@Injectable()
export class LoginService {
    private url: string;
    private store;
    private token: string;
    private prefix: string;
    private spark_url: string;
    private spark_url_token: string;
    private spark_client_id: string;
    private spark_client_secret: string;
    private spark_redirect_uri: string;
    private spark_grant_type: string;
    private headers: Headers;
    private options: RequestOptions;

  constructor(public _http: Http) {
        this.prefix = GLOBAL.token_prefix;
        this.store = JSON.parse(localStorage.getItem(this.prefix + '_' + GLOBAL.module));
        this.token = this.store && this.store.token;
        this.spark_url = GLOBAL.spark_url;
        this.url = GLOBAL.bot_url;
  }

sparkLogin() {
    return this._http.get("/").map(
        result => {
            window.location.href = this.spark_url;
        },
        error => {
            console.log("error service: ",error);
        }
    );
}

    getToken(code) {
        let token_string = '';
        this.options = new RequestOptions({
            params: {
              code: code
            }
        });
        return this._http.get(this.url + '/api/v1/auth/token', this.options).map(
            result => {
                this.token = result.json().access_token;
                if (this.token === undefined) {
                    return false;
                } else {
                    let token_name = this.prefix + '_' + 'access_token';
                    localStorage.setItem(token_name, JSON.stringify({token: this.token}));
                    localStorage.setItem('home',btoa('R'));
                    localStorage.setItem('messages',btoa('R'));
                    localStorage.setItem('notifications',btoa('R'));
                    localStorage.setItem('topics',btoa('R'));
                    localStorage.setItem('splash',btoa('R'));
                    localStorage.setItem('management', btoa('R'));
                    return true;
                }
            },
            error => {
                return error;
            }
        );
    }

  logOut() {
        this.token = null;
        localStorage.removeItem(this.prefix);
  }
}
