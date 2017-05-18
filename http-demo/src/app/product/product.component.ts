import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // public dataSource: Observable<any>;
  // public products: Array<any>;
  public products: Observable<any>;


  constructor(public http: Http) { 
    // 请求头
    let myHeaders: Headers = new Headers();
    myHeaders.append('Authorization', 'Basic 123456');

    // this.dataSource = this.http.get('/api/products').map((res) => res.json());
    this.products = this.http.get('/api/products', {headers: myHeaders}).map((res) => res.json());
  }

  ngOnInit() {
    // this.dataSource.subscribe(
    //   (data) => this.products = data
    // );
  }

}
