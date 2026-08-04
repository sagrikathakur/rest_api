import React, { useState } from 'react';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import Dashboard from './components/Dashboard';

export default function App() {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handleRegisterSuccess = (email) => {
    setRegisteredEmail(email);
    setTab('login');
  };

  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setTab('login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">

        {/* Brand Title */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Auth Portal</h1>
          <p className="text-sm text-slate-400 mt-1">React & Tailwind CSS v4 Authentication</p>
        </div>

        {/* Auth Toggle Tabs if not logged in */}
        {!token ? (
          <>
            <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setTab('login')}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  tab === 'login' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab('register')}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  tab === 'register' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {tab === 'login' ? (
              <SignInForm onLoginSuccess={handleLoginSuccess} initialEmail={registeredEmail} />
            ) : (
              <SignUpForm onSuccess={handleRegisterSuccess} />
            )}
          </>
        ) : (
          <Dashboard token={token} onLogout={handleLogout} />
        )}

      </div>
    </div>
  );
}
