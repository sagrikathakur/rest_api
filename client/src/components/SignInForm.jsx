import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, Lock } from 'lucide-react';

export default function SignInForm({ onLoginSuccess, onNavigateToSignUp, initialEmail = '' }) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok && data.success && data.token) {
        localStorage.setItem('token', data.token);
        if (onLoginSuccess) onLoginSuccess(data.token);
      } else {
        setError(data.message || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Could not connect to backend server at http://localhost:3000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-card p-8 rounded-3xl max-w-md mx-auto w-full space-y-6 shadow-xl">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md shadow-emerald-500/20 mb-1">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-teal-950 tracking-tight">Welcome Back to MindCare</h2>
        <p className="text-xs text-teal-700 font-medium">Sign in to access your confidential care portal.</p>
      </div>

      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-teal-950 mb-1.5">Email address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full px-4 py-3 rounded-2xl bg-white border border-teal-200 text-xs font-semibold text-teal-950 placeholder-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-teal-950 mb-1.5">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-2xl bg-white border border-teal-200 text-xs font-semibold text-teal-950 placeholder-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs transition-all disabled:opacity-50 mt-2 cursor-pointer shadow-lg shadow-emerald-600/20 active:scale-95"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-teal-700 pt-3 border-t border-teal-50 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Strictly confidential & 100% secure</span>
        </div>

        {onNavigateToSignUp && (
          <p className="text-center text-xs text-teal-800 pt-1 font-medium">
            New to MindCare?{' '}
            <button
              type="button"
              onClick={onNavigateToSignUp}
              className="text-emerald-700 font-extrabold hover:underline cursor-pointer"
            >
              Create Free Account
            </button>
          </p>
        )}
      </form>
    </div>
  );
}
