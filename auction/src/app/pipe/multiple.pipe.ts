import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiple'
})
export class MultiplePipe implements PipeTransform {
  // value是传进来的值，args?代表可选的参数
  // transform(value: any, args?: any): any {
  //   return null;
  // }

  transform(value: number, args?: number): any {
    if (!args) {
      args = 1;
    }
    return value * args;
  }

}
