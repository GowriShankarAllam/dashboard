import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Layout } from './components/layout/Layout';

// Auth pages
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

// Dashboard pages
import Dashboard from './pages/dashboard/Dashboard';

// Role-specific pages
import ExamsList from './pages/exams/ExamsList';
import EventsList from './pages/events/EventsList';
import AttendanceTracker from './pages/attendance/AttendanceTracker';
import Leaderboard from './pages/leaderboard/Leaderboard';

function App() {
  const { checkAuth, isLoading } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard\" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="exams" element={<ExamsList />} />
          <Route path="my-exams" element={<ExamsList />} />
          <Route path="events" element={<EventsList />} />
          <Route path="attendance" element={<AttendanceTracker />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/dashboard\" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;