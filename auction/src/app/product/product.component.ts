import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../share/product.service';
import { FormControl } from '@angular/forms';
import 'rxjs/Rx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Product[];
  // 用户搜索的关键字
  private keyword: string;
  private titleFilter: FormControl = new FormControl();

  private imgUrl: string = 'http://placehold.it/320x150';

  constructor(private productService: ProductService) { 
    this.titleFilter.valueChanges
       .debounceTime(500) //用户500毫秒后没有输入，则改变这个值
       .subscribe(
         value => this.keyword = value
        )
  }
  ngOnInit () {
    this.products = this.productService.getProducts();
  }

}

