import { Server } from 'socket.io';
import http from 'http';
import { setupRiderNameSpace } from './nameSpaces/rider.namespace';

export class SocketServer {
  private readonly io;
  constructor(server: http.Server, origins: string[]) {
    this.io = new Server(server, {
      cors: {
        origin: origins,
      },
    });
    this.setupNameSpaces();
  }

  setupNameSpaces() {
    setupRiderNameSpace(this.io);
  }

  getIo() {
    return this.io;
  }
}
