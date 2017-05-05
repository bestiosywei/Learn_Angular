import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  @Input() private rating: number = 0;
  private stars: boolean[];

  constructor() { }

  ngOnInit() {
    this.stars = [];
    for (let i = 0; i < 5; i++) {
      this.stars.push(i > this.rating);
    }
  }

}
