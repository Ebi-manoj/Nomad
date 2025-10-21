import { Server } from 'socket.io';

export function setupRiderNameSpace(io: Server) {
  const riderNamespace = io.of('/rider');

  riderNamespace.on('connection', socket => {
    console.log(`Socket connected${socket.id}`);
  });
}
