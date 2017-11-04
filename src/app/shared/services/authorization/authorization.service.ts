import { Injectable } from '@angular/core';
import { GLOBAL } from '../../../config/config';
import * as _ from 'lodash';

@Injectable()
export class AuthorizationService {
    private components: Array<string>;


    constructor() {
        this.components = GLOBAL.components;
    };

    logout() {
        for (let component of this.components) {
            localStorage.removeItem(component);
        }
    };

    hasReadPermision(component) {
        const badge = atob(localStorage.getItem(component));
        if (badge === '*') {
            return true;
        } else {
            return badge.includes('R');
        }
    };

}
