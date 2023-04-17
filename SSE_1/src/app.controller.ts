import { Controller, Get, MessageEvent, Res, Sse } from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  @Get()
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, '..', 'client','index.html')).toString());
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((num:number) => ({ data: { number: num } } as MessageEvent)),
    );
  }


  @Sse('sse2')
  sse2(): Observable<any> {
    //data have to stream
    const arr = ['d1','d2', 'd3'];
    return new Observable((subscriber) => {
      while(arr.length){
        subscriber.next(arr.pop()); // data have to return in every chunk
      }
      if(arr.length == 0) subscriber.complete(); // complete the subscription
    });
  }


}
