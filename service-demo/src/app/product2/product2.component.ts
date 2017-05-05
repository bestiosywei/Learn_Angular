import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../share/product.service';
// import { LogService } from '../share/log.service';

@Component({
  selector: 'app-product2',
  templateUrl: './product2.component.html',
  styleUrls: ['./product2.component.css']
  // providers: [{
  //   provide: ProductService,
  //   useClass: LogService
  // }]
})
export class Product2Component implements OnInit {

  public product: Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.product = this.productService.getProduct();
  }

}
