import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
// ngOnchanges事件
export class ChildComponent implements OnInit, OnChanges, DoCheck{

  // onchange钩子
  ngOnChanges(changes: SimpleChanges): void {
    console.log(JSON.stringify(changes, null, 2));
  }

  @Input()
  public greeting: string;

  @Input()
  public user: {name: string};

  public message: string = '初始化消息';

  public oldUsername: string = '';
  public changeDetected: boolean = false;
  public noChangeCount: number = 0;
  
  constructor() { }

  ngOnInit() {
  }

  // 变更检测
  ngDoCheck(): void{
    if (this.user.name !== this.oldUsername) {
      this.changeDetected = true;
      console.log('DoCheck: user.name从' + this.oldUsername + '变为' + this.user.name);
      this.oldUsername = this.user.name;
    }

    if (this.changeDetected) {
      this.noChangeCount = 0;
    } else {
      this.noChangeCount = this.noChangeCount + 1;
      console.log('DoCheck: user.name没变化时ngDoCheck方法已经被调用' + this.noChangeCount);
    }

    this.changeDetected = false;
  }
}
