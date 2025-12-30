import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const riderSocket = io(`${BASE_URL}/rider`, {
  transports: ['websocket'],
  autoConnect: false,
});

export const hikerSocket = io(`${BASE_URL}/hiker`, {
  transports: ['websocket'],
  autoConnect: false,
});

export const userSocket = io(`${BASE_URL}/user`, {
  transports: ['websocket'],
  autoConnect: false,
});
