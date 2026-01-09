import { Server } from 'socket.io';
import { IRiderLocationController } from '../controllers/IRiderLocationController';

export function setupRiderNameSpace(
  io: Server,
  controller: IRiderLocationController
) {
  const riderNamespace = io.of('/rider');

  riderNamespace.on('connection', socket => {
    console.log(`Rider connected${socket.id}`);

    socket.on('location:update', data => {
      controller.handleLocationUpdate(socket.id, data);
    });

    socket.on('ride:join', (rideId: string) => {
      socket.join(rideId);
      console.log(`Rider ${socket.id} joined ride room: ${rideId}`);
    });

    socket.on('chat:join', (roomId: string) => {
      socket.join(roomId);
      console.log(`Rider ${socket.id} joined chat room: ${roomId}`);
    });

    socket.on('chat:leave', (roomId: string) => {
      socket.leave(roomId);
      console.log(`Rider ${socket.id} left chat room: ${roomId}`);
    });
  });
}
