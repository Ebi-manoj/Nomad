import { useEffect, useRef } from 'react';
import { GoogleApiWrapper } from './components/GoogleApiWrapper';
import './index.css';
import { AppRouter } from './routes/index.routes';
import { Socket, io } from 'socket.io-client';

function App() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3000/rider');

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <GoogleApiWrapper>
      <AppRouter />
    </GoogleApiWrapper>
  );
}

export default App;
