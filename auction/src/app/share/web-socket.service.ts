import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class WebSocketService {

  public ws: WebSocket;

  constructor() { }

  createObservableSocket(url:string, id:number): Observable<any> {
    // 连接WebSocket服务器
    this.ws = new WebSocket(url);
    return new Observable<string>(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        this.ws.onopen = (event) => this.sendMessage({productId: id});
        return () => this.ws.close();
      }
    )
  }

  // 向服务器发送消息
  sendMessage(message: any) {
    this.ws.send(JSON.stringify(message));
  }

}