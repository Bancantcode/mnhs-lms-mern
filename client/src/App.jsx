import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminModules from './pages/AdminModules';
import AdminUsers from './pages/AdminUsers';
import { AuthWrapper, AdminWrapper, GuestWrapper } from './auth/auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<GuestWrapper />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AuthWrapper />}>
          <Route path="/" element={<Dashboard />} />

          <Route element={<AdminWrapper />}>
            <Route path="/admin-users" element={<AdminUsers />} />
            <Route path="/admin-modules" element={<AdminModules />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
