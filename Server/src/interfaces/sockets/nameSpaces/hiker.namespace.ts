import { Server } from 'socket.io';

export function setupHikerNamespace(io: Server) {
  const hikerNamespace = io.of('/hiker');

  hikerNamespace.on('connection', socket => {
    console.log(`Hiker connected: ${socket.id}`);

    socket.on('hike:join', (hikeId: string) => {
      socket.join(hikeId);
      console.log(`Hiker ${socket.id} joined room: ${hikeId}`);
    });
  });
}
