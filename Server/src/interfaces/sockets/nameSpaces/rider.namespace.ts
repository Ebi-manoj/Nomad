import { Server } from 'socket.io';
import { IRiderLocationController } from '../controllers/IRiderLocationController';

export function setupRiderNameSpace(
  io: Server,
  controller: IRiderLocationController
) {
  const riderNamespace = io.of('/rider');

  riderNamespace.on('connection', socket => {
    console.log(`Socket connected${socket.id}`);

    socket.on('location:update', data => {
      controller.handleLocationUpdate(socket, data);
    });
  });
}
