import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';

export interface Out {
 name?: string,
 lastname?: string,
 message?: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'angular-websocket';
  inputData = { action: 'onMessage', message: 'Hello everyone' };
  outputData: Out | undefined;

  constructor(private websocketService: WebsocketService) {}

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }

  ngAfterViewInit(): void {
    this.websocketService.connect();
    this.websocketService.send(this.inputData);
    this.websocketService.send(this.inputData);
    this.websocketService.socket$.subscribe(
      msg => {
        console.log('message received: ' + JSON.stringify(msg))
        this.outputData = msg;
      }, // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    )
  }

}
