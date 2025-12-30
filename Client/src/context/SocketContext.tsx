import { hikerSocket, riderSocket, userSocket } from '@/config/socket';
import { createContext, useContext, type ReactNode } from 'react';

interface SocketContextType {
  riderSocket: typeof riderSocket;
  hikerSocket: typeof hikerSocket;
  userSocket: typeof userSocket;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SocketContext.Provider value={{ riderSocket, hikerSocket, userSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used inside a SocketProvider');
  }
  return context;
};
