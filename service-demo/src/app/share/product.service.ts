import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable()
export class ProductService {

  constructor(public logger: LoggerService) { }

  getProduct (): Product {
    this.logger.log('服务之间的注入');
    return new Product(0, 'iphone7', 5888, '最新款的iPhone手机');
  }

}

export class Product {
  constructor (
    public id: number,
    public title: string,
    public price: number,
    public desc: string
  ){

  }
}
