import {Injectable} from '@nestjs/common';
import { Subject } from "rxjs";


@Injectable()
export class EventsService {

  private events: Subject<any> = new Subject();
  //private events: Record<string, Subject<any>> = {}

  addEvent(event) {
    this.events.next( { data: event} );
  }

  sendEvents(id: string) {
    return this.events.asObservable();

    // if (!this.events[id]) {
    //   this.events[id] = new Subject();
    // }
    // setInterval(() => {
    //   this.events[id].next({ data: { message: 'Hello World' } });
    // }, 1000);
    // return this.events[id].asObservable();

  }

}