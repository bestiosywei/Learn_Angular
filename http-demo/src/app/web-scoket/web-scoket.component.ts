import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../shared/web-socket.service';

@Component({
  selector: 'app-web-scoket',
  templateUrl: './web-scoket.component.html',
  styleUrls: ['./web-scoket.component.css']
})
export class WebScoketComponent implements OnInit {

  constructor(public wsService: WebSocketService) { }

  ngOnInit() {
    this.wsService.createObservableScoket('ws://localhost:8085').subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('流已经结束了')
    );
  }

  sendMessageToServer() {
    this.wsService.sendMessage('hello from clients');
  }

}
