export interface IRealtimeGateway {
  emitToRoom(
    namespace: string,
    room: string,
    event: string,
    payload: unknown
  ): Promise<void>;

  emitToSocket(
    socketId: string,
    event: string,
    payload: unknown
  ): Promise<void>;
}
