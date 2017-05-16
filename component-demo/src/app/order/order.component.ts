import { Component, OnInit, Input } from '@angular/core';
import { PriceQuote } from '../price-quote/price-quote.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  // 从父组价的属性中传入
  // @Input()
  // public stockCode: string;

  // @Input()
  // public amount: number;

  @Input()
  public priceQuote: PriceQuote;

  constructor() { 
    // setInterval(() => {
    //   this.stockCode = 'XIAOMI';
    // }, 3000);
  }

  ngOnInit() {

  }

}
