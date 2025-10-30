import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { AuthProvider } from './routes/AuthProvider.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { injectStore } from './utils/axiosInstance.ts';
import { SocketProvider } from './context/SocketContext.tsx';
injectStore(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <AuthProvider>
          <BrowserRouter>
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <App />
            </GoogleOAuthProvider>
          </BrowserRouter>
        </AuthProvider>
      </SocketProvider>
    </Provider>
    <Toaster position="bottom-right" />
  </StrictMode>
);
