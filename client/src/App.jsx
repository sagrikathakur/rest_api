import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TherapistsPage from './pages/TherapistsPage';
import JournalPage from './pages/JournalPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [page, setPage] = useState(() => (localStorage.getItem('token') ? 'dashboard' : 'home'));
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [user, setUser] = useState(null);

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
        if (res.ok && data.user) setUser(data.user);
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };

    fetchUser();
  }, [token]);

  const handleRegisterSuccess = (email) => {
    setRegisteredEmail(email);
    setPage('login');
  };

  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
    setPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setPage('home');
  };

  const renderContent = () => {
    switch (page) {
      case 'home':
        return <HomePage token={token} setPage={setPage} />;

      case 'therapists':
        return <TherapistsPage user={user} />;

      case 'journal':
        if (!token) {
          return (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center max-w-md mx-auto space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900">Care Portal Required</h3>
              <p className="text-xs text-slate-500">Please sign in to log your daily mood & view private journal entries.</p>
              <button
                onClick={() => setPage('login')}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Sign In
              </button>
            </div>
          );
        }
        return <JournalPage user={user} />;

      case 'login':
        if (token) {
          setPage('dashboard');
          return null;
        }
        return (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onNavigateToSignUp={() => setPage('register')}
            initialEmail={registeredEmail}
          />
        );

      case 'register':
        if (token) {
          setPage('dashboard');
          return null;
        }
        return (
          <RegisterPage
            onSuccess={handleRegisterSuccess}
            onNavigateToSignIn={() => setPage('login')}
          />
        );

      case 'dashboard':
        if (!token) {
          return (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center max-w-md mx-auto space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900">Care Portal Required</h3>
              <p className="text-xs text-slate-500">Please sign in to access your wellness dashboard.</p>
              <button
                onClick={() => setPage('login')}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Sign In
              </button>
            </div>
          );
        }
        return <DashboardPage token={token} onLogout={handleLogout} />;

      case 'profile':
        if (!token) {
          return (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center max-w-md mx-auto space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900">Care Portal Required</h3>
              <p className="text-xs text-slate-500">Please sign in to access your care profile.</p>
              <button
                onClick={() => setPage('login')}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Sign In
              </button>
            </div>
          );
        }
        return <ProfilePage user={user} token={token} />;

      default:
        return <HomePage token={token} setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        token={token}
        user={user}
        activePage={page}
        setPage={setPage}
        onLogout={handleLogout}
      />

      {/* Main Page Content */}
      <main className="flex-1 flex flex-col justify-start items-center w-full">
        <div className="w-full my-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

