import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], term): any {
        return term 
            ? items.filter(item => item.text.indexOf(term) !== -1)
            : items;
    }
}