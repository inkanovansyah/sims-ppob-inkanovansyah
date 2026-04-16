import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
