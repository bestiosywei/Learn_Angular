import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WebSocketService {

  public ws: WebSocket;

  constructor() { }

  createObservableScoket(url:string): Observable<any> {
    // 连接WebSocket服务器
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
      }
    );
  }

  // 向服务器发送消息
  sendMessage(message: string) {
    this.ws.send(message);
  }

}
