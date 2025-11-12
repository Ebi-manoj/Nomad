import { Server } from 'socket.io';
import { IRealtimeGateway } from '../../application/providers/IRealtimeGateway';

export class SocketRealtimeGateway implements IRealtimeGateway {
  constructor(private readonly io: Server | undefined) {}

  async emitToRoom(
    namespace: string,
    room: string,
    event: string,
    payload: unknown
  ): Promise<void> {
    const ioInstance = this.io;
    if (!ioInstance) return;
    const ns = namespace.startsWith('/') ? namespace : `/${namespace}`;
    ioInstance.of(ns).to(room).emit(event, payload);
  }

  async emitToSocket(
    socketId: string,
    event: string,
    payload: unknown
  ): Promise<void> {
    const ioInstance = this.io;
    if (!ioInstance) return;
    ioInstance.to(socketId).emit(event, payload);
  }
}
