import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck } from 'lucide-react';

export default function SignUpForm({ onSuccess, onNavigateToSignIn }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess('Account created successfully! You can now log in.');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        if (onSuccess) onSuccess(formData.email);
      } else {
        setError(data.message || 'Registration failed.');
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
        <h2 className="text-2xl font-extrabold text-teal-950 tracking-tight">Join MindCare Today</h2>
        <p className="text-xs text-teal-700 font-medium">Create your private care account to start your journey.</p>
      </div>

      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-teal-950 mb-1.5">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="w-full px-4 py-3 rounded-2xl bg-white border border-teal-200 text-xs font-semibold text-teal-950 placeholder-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-teal-950 mb-1.5">Email address</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className="w-full px-4 py-3 rounded-2xl bg-white border border-teal-200 text-xs font-semibold text-teal-950 placeholder-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-teal-950 mb-1.5">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-2xl bg-white border border-teal-200 text-xs font-semibold text-teal-950 placeholder-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-teal-950 mb-1.5">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-2xl bg-white border border-teal-200 text-xs font-semibold text-teal-950 placeholder-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs transition-all disabled:opacity-50 mt-2 cursor-pointer shadow-lg shadow-emerald-600/20 active:scale-95"
        >
          {loading ? 'Creating Account...' : 'Get Started'}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-teal-700 pt-3 border-t border-teal-50 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Encrypted storage & confidential care guarantee</span>
        </div>

        {onNavigateToSignIn && (
          <p className="text-center text-xs text-teal-800 pt-1 font-medium">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onNavigateToSignIn}
              className="text-emerald-700 font-extrabold hover:underline cursor-pointer"
            >
              Sign In
            </button>
          </p>
        )}
      </form>
    </div>
  );
}
