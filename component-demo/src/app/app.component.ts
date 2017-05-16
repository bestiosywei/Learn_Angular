import { Component, ViewChild, OnInit, AfterContentInit, AfterContentChecked, AfterViewInit } from '@angular/core';
// import { PriceQuote } from './price-quote/price-quote.component';
import { LifeComponent } from './life/life.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // stock = '';
  // priceQuote: PriceQuote = new PriceQuote('', 0);
  // event是子组件传过来的参数,其类型为PriceQuote
  // buyHandler(event: PriceQuote) {
  //   this.priceQuote = event;
  // }

  // public greeting:string = 'hello';
  // public user: { name: string} = {name: 'Tom'};
  // public message: string;
  constructor() {
    
  }

  // public title: string = 'it works';
  // public divContent: string = '<div>hello angular</div>';
  // @ViewChild('child1')
  // child1: LifeComponent;

  // ngOnInit(): void{
  //   this.child1.greeting('tom');
  // }

  // ngAfterViewInit(): void {
  //   console.log('父组件的视图初始化完毕');
  //   // this.message = 'hello';
  //   setTimeout(() => {
  //     this.message = 'hello';
  //   }, 0);
  // }

  // ngAfterViewChecked(): void {
  //   console.log('父组件的视图更新检测完毕');
  // }

  // ngAfterContentInit(): void {
  //   console.log('父组件投影内容初始化完成');
  // }

  // ngAfterContentChecked(): void {
  //   console.log('父组件的投影内容变更检测完毕');
  // }

  // ngAfterViewInit(): void {
  //   console.log('父组件视图内容初始化完毕');
  // }
}
