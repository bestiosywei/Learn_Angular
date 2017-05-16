import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit, OnChanges{

  @Input() private rating: number = 0;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  // 只有输入与输出的名字相同,输出输出+change，双向数据绑定
  // 才能用[(rating)]----不然的话，这个输出的绑定要取你的取的名字，
  // 即输出与输入的绑定分开绑定

  private stars: boolean[];

  // 星星是否能点击，默认都不能点击
  @Input()
  private readonly: boolean = true;

  constructor() { }

  // 输入属性发生改变
  ngOnChanges(changes: SimpleChanges) {
    this.stars = [];
    for (let i = 0; i < 5; i++) {
      this.stars.push(i >= this.rating);
    }
  }

  ngOnInit() {

  }

  // 星星的点击事件
  clickStar(index: number) {
    // 如果不是星星点击事件，不是只读的话
    if (!this.readonly) {
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }

}
