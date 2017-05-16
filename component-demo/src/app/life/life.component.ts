import { Component, OnInit, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.css']
})
export class LifeComponent implements OnInit, OnDestroy{

  // ngAfterViewInit(): void {
  //   console.log('子组件的视图初始化完毕');
  // }

  // ngAfterViewChecked(): void {
  //   console.log('子组件的视图更新检测完毕');
  // }

  constructor() { }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    console.log('life组件被销毁');
  }

  // greeting(name: string) {
  //   console.log(name);
  // }

}
