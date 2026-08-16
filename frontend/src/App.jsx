import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDashboard from './pages/UserDashboard';
import OfficialDashboard from './pages/OfficialDashboard';
import NewComplaintPage from './pages/NewComplaintPage';
import MyComplaintsPage from './pages/MyComplaintsPage';
import SettingsPage from './pages/SettingsPage';

// Simple Protected Route wrapper
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/" replace />;

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard/citizen" element={<UserDashboard />} />
        <Route path="/dashboard/citizen/complaints" element={<MyComplaintsPage />} />
        <Route path="/dashboard/citizen/settings" element={<SettingsPage />} />
        <Route path="/dashboard/official" element={<OfficialDashboard />} />
        <Route path="/complaint/new" element={<NewComplaintPage />} />
      </Routes>
    </Router>
  );
}

export default App;
