import { Component, OnInit, AfterContentChecked, AfterContentInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.css']
})
export class Child1Component implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
  }
  
  ngOnDestroy(): void {
    console.log('child组件被销毁');
  }

  // ngAfterContentInit(): void {
  //   console.log('子组件投影内容初始化完成');
  // }

  // ngAfterContentChecked(): void {
  //   console.log('子组件的投影内容变更检测完毕');
  // }

}
