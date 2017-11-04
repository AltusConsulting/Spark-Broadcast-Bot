import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../../../config/config';

@Injectable()
export class InterceptorService {
    private headers: Headers;
    private options: RequestOptions;
    private prefix: string;

    constructor() {
        this.prefix = GLOBAL.token_prefix;
    }

    setOptions(url): RequestOptions {
        this.headers = new Headers({
            'Authorization': 'Bearer ' + this.getToken(url)
        });
        return new RequestOptions({headers: this.headers});
    };

    getToken(url) {
        const regex = new RegExp('^(?:https?:\/\/.*)?(?:\/\\w+\-?\\w*)?\/api\/[a-zA-Z_]+');
        if (regex.test(url)) {
            const modulo = regex.exec(url)[0].split('/').pop();
            const data = localStorage.getItem(this.prefix + '_' + modulo);
            return JSON.parse(data).token;
        } else {
            console.log('No token present');
            return null;
        }
    };
}
