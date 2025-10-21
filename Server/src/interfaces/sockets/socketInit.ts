import { Server } from 'socket.io';
import http from 'http';
import { setupRiderNameSpace } from './nameSpaces/rider.namespace';
import { locationUpdateComposer } from '../../infra/services/composer/sockets/locationUpdate.composer';

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
    const locationUpdateController = locationUpdateComposer();
    setupRiderNameSpace(this.io, locationUpdateController);
  }

  getIo() {
    return this.io;
  }
}
