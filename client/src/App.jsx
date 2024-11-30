import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminModules from './pages/AdminModules';
import AdminUsers from './pages/AdminUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/admin-modules" element={<AdminModules />} />
      </Routes>
    </Router>
  );
}

export default App;
