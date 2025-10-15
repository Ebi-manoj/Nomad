import { GoogleApiWrapper } from './components/GoogleApiWrapper';
import './index.css';
import { AppRouter } from './routes/index.routes';

function App() {
  return (
    <GoogleApiWrapper>
      <AppRouter />
    </GoogleApiWrapper>
  );
}

export default App;
