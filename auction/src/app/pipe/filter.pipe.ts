import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // list是产品列表 filterFiled是过滤的字段 keyword用户输入的字段
  transform(list: any[], filterField: string, keyword: string): any {
    // 如果没有传递过滤字段或者用户的输入字段
    // 则直接返回产品列表
    if (!filterField || !keyword) {
      return list;
    }
    // 数组的过滤，true保留，false则不保留
    return list.filter(item => {
      let fieldValue = item[filterField];
      return fieldValue.indexOf(keyword) >= 0;
    });
  }

}
