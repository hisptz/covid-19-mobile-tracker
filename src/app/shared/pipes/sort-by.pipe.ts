import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { reverse } from 'dns';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(list: any[], sortAttribute: string, order: string = 'ASC'): any {
    if (!list || !sortAttribute) {
      return list;
    }

    return order === 'ASC'
      ? _.sortBy(list, [sortAttribute])
      : _.reverse(_.sortBy(list, [sortAttribute]));
  }
}
