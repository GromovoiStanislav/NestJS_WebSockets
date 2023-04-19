import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { io, Socket } from 'socket.io-client';

describe('EventsGateway', () => {
  let app: INestApplication;
  let socket: Socket;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.listen(3000);
  });

  beforeEach(() => {
    socket = io('http://localhost:3000');
    socket.connect();
  });

  describe('findAll', () => {
    it('should receive 5 numbers', done => {
      let eventCount = 1;
      socket.emit('events', { test: 'test' });
      socket.on('event', data => {
        expect(data).toBe(eventCount);
        if (++eventCount > 5) {
          done();
        }
      });
    });
  });

  describe('identity', () => {
    it('should return the same number has what was sent', done => {
      socket.emit('identity', 0, response => {
        expect(response).toBe(0);
        done();
      });
    });
  });

  afterEach(() => {
    socket.disconnect();
  });

  afterAll(async () => {
    await app.close();
  });
});
