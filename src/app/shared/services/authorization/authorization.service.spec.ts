import { TestBed, inject, async } from '@angular/core/testing';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {encodeTestToken} from 'angular2-jwt/angular2-jwt-test-helpers';
import { HttpModule, Http } from '@angular/http';
import { AuthorizationService } from './authorization.service';

describe('AuthorizationService', () => {
    let service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [AuthorizationService, AuthHttp,  {
            provide: AuthHttp,
            useFactory: (http) => {
              return new AuthHttp(new AuthConfig({
                tokenName: 'token',
                tokenGetter: (() => encodeTestToken(this)),
                globalHeaders: [{'Content-Type': 'application/json'}]
              }), http);
            },
            deps: [Http]
          }, HttpModule]
      });
    });


    beforeEach(inject([AuthorizationService], s => {
        service = s;
    }));

    it('should be created', () => {
    expect(service).toBeTruthy();
    });
});
