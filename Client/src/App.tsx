import { Route, Routes } from 'react-router-dom';
import './index.css';
import { Signup } from './pages/Auth/Signup';
import { AuthLayout } from './layouts/AuthLayout';
import { Login } from './pages/Auth/Login';

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="sign-up" element={<Signup />} />
        <Route path="sign-in" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
