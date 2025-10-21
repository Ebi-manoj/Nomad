import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSocket(nameSpace: string) {
  const url = `${import.meta.env.VITE_BASE_URL}${nameSpace}`;
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url, {
      transports: ['websocket'],
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket Connected', socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return socketRef.current;
}
