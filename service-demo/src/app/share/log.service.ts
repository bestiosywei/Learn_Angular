import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { ProductService, Product } from './product.service';

@Injectable()
export class LogService implements ProductService {

  getProduct(): Product {
    return new Product (1, '小米8', 3942, '最新款的小米手机');
  }
  constructor(public logger: LoggerService) { }

}
