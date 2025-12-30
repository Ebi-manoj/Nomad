import { Server } from 'socket.io';

export function setupUserNamespace(io: Server) {
  const userNamespace = io.of('/user');

  userNamespace.on('connection', socket => {
    console.log(`User namespace connected: ${socket.id}`);

    socket.on('user:join', (userId: string) => {
      socket.join(userId);
      console.log(`Socket ${socket.id} joined user room: ${userId}`);
    });
  });
}
