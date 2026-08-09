import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TherapistsPage from './pages/TherapistsPage';
import JournalPage from './pages/JournalPage';
import ProfilePage from './pages/ProfilePage';
import AppointmentPage from './pages/AppointmentPage';
import OtpPage from './pages/OtpPage';

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.user) {
          setUser(data.user);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          setToken('');
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };

    fetchUser();
  }, [token]);

  const setPage = (pageName) => {
    if (pageName === 'home') navigate('/');
    else navigate(`/${pageName}`);
  };

  const activePage = location.pathname === '/' 
    ? 'home' 
    : location.pathname.replace('/', '');

  const handleRegisterSuccess = (email) => {
    setRegisteredEmail(email);
    navigate('/login');
  };

  const handleLoginSuccess = (newToken, userObj) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    if (userObj) setUser(userObj);
    navigate('/dashboard');
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        await fetch('http://localhost:3000/api/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken })
        });
      } catch (err) {
        console.error('Failed to revoke session on server:', err);
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setToken('');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        token={token}
        user={user}
        activePage={activePage}
        setPage={setPage}
        onLogout={handleLogout}
      />

      {/* Main Page Content */}
      <main className="flex-1 flex flex-col justify-start items-center w-full">
        <div className="w-full my-auto">
          <Routes>
            <Route path="/" element={<HomePage token={token} setPage={setPage} />} />
            <Route path="/therapists" element={<TherapistsPage user={user} />} />
            <Route path="/doctors" element={<TherapistsPage user={user} />} />
            <Route path="/appointment/:docId" element={<AppointmentPage user={user} />} />
            <Route
              path="/journal"
              element={
                token ? (
                  <JournalPage user={user} />
                ) : (
                  <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center max-w-md mx-auto space-y-4 shadow-xs">
                    <h3 className="text-lg font-bold text-slate-900">Care Portal Required</h3>
                    <p className="text-xs text-slate-500">Please sign in to log your daily mood & view private journal entries.</p>
                    <button
                      onClick={() => navigate('/login')}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      Sign In
                    </button>
                  </div>
                )
              }
            />
            <Route
              path="/login"
              element={
                token ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <LoginPage
                    onLoginSuccess={handleLoginSuccess}
                    onNavigateToSignUp={() => navigate('/register')}
                    initialEmail={registeredEmail}
                  />
                )
              }
            />
            <Route
              path="/register"
              element={
                token ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <RegisterPage
                    onSuccess={handleRegisterSuccess}
                    onNavigateToSignIn={() => navigate('/login')}
                  />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                token ? (
                  <DashboardPage token={token} user={user} onLogout={handleLogout} />
                ) : (
                  <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center max-w-md mx-auto space-y-4 shadow-xs">
                    <h3 className="text-lg font-bold text-slate-900">Care Portal Required</h3>
                    <p className="text-xs text-slate-500">Please sign in to access your wellness dashboard.</p>
                    <button
                      onClick={() => navigate('/login')}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      Sign In
                    </button>
                  </div>
                )
              }
            />
            <Route
              path="/profile"
              element={
                token ? (
                  <ProfilePage user={user} token={token} />
                ) : (
                  <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center max-w-md mx-auto space-y-4 shadow-xs">
                    <h3 className="text-lg font-bold text-slate-900">Care Portal Required</h3>
                    <p className="text-xs text-slate-500">Please sign in to access your care profile.</p>
                    <button
                      onClick={() => navigate('/login')}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      Sign In
                    </button>
                  </div>
                )
              }
            />
            <Route path="/verify-otp" element={<OtpPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

