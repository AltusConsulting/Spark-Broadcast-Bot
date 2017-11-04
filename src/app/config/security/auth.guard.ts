import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { GLOBAL } from '../config';
import { AuthorizationService } from '../../shared/services/authorization/authorization.service'

@Injectable()
export class AuthGuard implements CanActivate {
    private prefix: string;

    constructor(private router: Router, private _authorizationService: AuthorizationService) {
        this.prefix = GLOBAL.token_prefix;
    };

    canActivate(route: ActivatedRouteSnapshot) {
        if (this.loggedIn() ) {
            let role = route.data.roles;
            if (this._authorizationService.hasReadPermision(role)) {
                return true;
            } else {
                return false;
            }
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

    loggedIn() {
        let token = localStorage.getItem(this.prefix + '_' + 'access_token');
        if (token) {
            return true;
        }
    }
}
