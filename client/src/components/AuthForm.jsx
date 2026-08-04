import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, LogIn, UserPlus } from 'lucide-react';

export default function AuthForm({ initialTab = 'login', onLoginSuccess, onRegisterSuccess, initialEmail = '' }) {
  const [mode, setMode] = useState(initialTab); // 'login' | 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: initialEmail,
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabSwitch = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const endpoint = mode === 'login' ? 'http://localhost:3000/api/login' : 'http://localhost:3000/api/register';
    const body = mode === 'login'
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        if (mode === 'login') {
          if (data.token) {
            localStorage.setItem('token', data.token);
            if (onLoginSuccess) onLoginSuccess(data.token);
          }
        } else {
          setSuccess('Account created successfully! You can now sign in.');
          setMode('login');
          if (onRegisterSuccess) onRegisterSuccess(formData.email);
        }
      } else {
        setError(data.message || `${mode === 'login' ? 'Sign In' : 'Registration'} failed.`);
      }
    } catch (err) {
      setError('Could not connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm max-w-md mx-auto w-full space-y-5">
      
      {/* 2-in-1 Header & Logo */}
      <div className="text-center space-y-1">
        <div className="inline-flex p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md shadow-emerald-500/20 mb-1">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {mode === 'login' ? 'Welcome Back to MindCare' : 'Join MindCare Portal'}
        </h2>
        <p className="text-xs text-slate-500 font-semibold">
          {mode === 'login' ? 'Sign in to access your confidential care portal' : 'Create your private care account'}
        </p>
      </div>

      {/* 2-IN-1 MODE TOGGLE TABS */}
      <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
        <button
          type="button"
          onClick={() => handleTabSwitch('login')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            mode === 'login'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Sign In</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabSwitch('register')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            mode === 'register'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Create Account</span>
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
          {success}
        </div>
      )}

      {/* 2-in-1 Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {mode === 'register' && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-300 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email address</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-300 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-300 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        {mode === 'register' && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-300 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs transition-all disabled:opacity-50 mt-2 cursor-pointer shadow-md shadow-emerald-600/20 active:scale-95"
        >
          {loading ? (mode === 'login' ? 'Signing In...' : 'Registering...') : (mode === 'login' ? 'Sign In' : 'Create Free Account')}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-2 border-t border-slate-100 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Strictly confidential & HIPAA compliant</span>
        </div>
      </form>
    </div>
  );
}
