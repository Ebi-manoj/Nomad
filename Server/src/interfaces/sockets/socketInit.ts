import { Server } from 'socket.io';
import http from 'http';
import { setupRiderNameSpace } from './nameSpaces/rider.namespace';
import { locationUpdateComposer } from '../../infra/services/composer/sockets/locationUpdate.composer';
import { setupHikerNamespace } from './nameSpaces/hiker.namespace';

export class SocketServer {
  private static io: Server;
  static init(server: http.Server, origins: string[]) {
    if (!this.io) {
      this.io = new Server(server, {
        cors: { origin: origins },
      });
      console.log('SocketServer initialized');
    }
    this.setupNameSpaces(this.io);
    return this.io;
  }

  static setupNameSpaces(io: Server) {
    const locationUpdateController = locationUpdateComposer();
    setupRiderNameSpace(io, locationUpdateController);
    setupHikerNamespace(io);
  }

  static getIo() {
    return this.io;
  }
}
