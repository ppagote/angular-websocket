import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, switchAll, tap } from 'rxjs/operators';
import { Subject, EMPTY } from 'rxjs';

@Injectable()
export class WebsocketService {
  public socket$!: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$;

  constructor() {
  }

  public connect(): WebSocketSubject<any> {
    console.log("connect")
    this.socket$ = webSocket({
      url: 'wss://411wh6tdr3.execute-api.us-east-1.amazonaws.com/production',
      openObserver: {
        next: () => {
          console.log('connection ok');
        },
      },
      closeObserver: {
        next: () => {
          console.log('disconnect ok');
        },
      },
    });


    return this.socket$;
    /* this.socket$.subscribe(
      (msg) => {
        console.log('message received: ' + msg);
      },
      (err) => console.log(err),
      () => console.log('complete')
    ); */
  }

  public send(msg: Object) {
    this.socket$.next(msg);
  }

  public disconnect() {
    this.socket$.complete();
  }
}
