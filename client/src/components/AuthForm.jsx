import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, LogIn, UserPlus, KeyRound, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

export default function AuthForm({ initialTab = 'login', onLoginSuccess, onRegisterSuccess, initialEmail = '' }) {
  const [mode, setMode] = useState(initialTab); // 'login' | 'register' | 'otp' | 'forgot'
  const [formData, setFormData] = useState({
    name: '',
    email: initialEmail,
    password: '',
    confirmPassword: ''
  });

  // OTP Verification State
  const [otp, setOtp] = useState('');
  const [otpStep, setOtpStep] = useState(1); // 1: send OTP, 2: verify code
  const [receivedOtpHint, setReceivedOtpHint] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  // Forgot Password State
  const [forgotStep, setForgotStep] = useState(1); // 1: send OTP, 2: reset password
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

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
    setOtp('');
    setOtpStep(1);
    setForgotStep(1);
    setNewPassword('');
    setConfirmNewPassword('');
    setOtpVerified(false);
    setReceivedOtpHint('');
  };

  // Handle standard Login / Register submit
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
      ? { email: formData.email.trim(), password: formData.password }
      : { ...formData, email: formData.email.trim() };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        if (mode === 'login') {
          const tokenToUse = data.accessToken || data.token;
          if (tokenToUse) {
            localStorage.setItem('token', tokenToUse);
            if (data.refreshToken) {
              localStorage.setItem('refreshToken', data.refreshToken);
            }
            if (onLoginSuccess) onLoginSuccess(tokenToUse, data.user);
          } else {
            setError('Login succeeded but no token was returned.');
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

  // Handle Send OTP (POST /auth/send-otp)
  const handleSendOtp = async (e, targetStepSetter) => {
    e?.preventDefault();
    if (!formData.email) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(`Verification OTP sent to ${formData.email.trim()}`);
        if (data.otp) setReceivedOtpHint(data.otp);
        targetStepSetter(2);
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setError('Could not connect to backend server at http://localhost:3000');
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP (POST /auth/verify-otp)
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError('Please enter the 6-digit OTP code.');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email.trim(), otp: otp.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.success && data.verified) {
        setOtpVerified(true);
        setSuccess('OTP verified successfully! Identity confirmed.');
      } else {
        setError(data.message || 'Invalid or expired OTP code.');
      }
    } catch (err) {
      setError('Could not connect to backend server at http://localhost:3000');
    } finally {
      setLoading(false);
    }
  };

  // Handle Password Reset via OTP (POST /auth/reset-password)
  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError('Please enter the 6-digit OTP code.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          otp: otp.trim(),
          newPassword: newPassword,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess('Password reset successfully! You can now sign in with your new password.');
        setMode('login');
        setFormData({ ...formData, password: '' });
      } else {
        setError(data.message || 'Failed to reset password.');
      }
    } catch (err) {
      setError('Could not connect to backend server at http://localhost:3000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl max-w-md mx-auto w-full space-y-5 font-sans">
      
      {/* Form Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md shadow-emerald-500/20 mb-1">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {mode === 'login' 
            ? 'Welcome Back' 
            : mode === 'register' 
            ? 'Join MindCare Portal' 
            : mode === 'otp' 
            ? 'OTP Quick Verify' 
            : 'Reset Password'}
        </h2>
        <p className="text-xs text-slate-500 font-semibold">
          {mode === 'login' 
            ? 'Sign in to access your confidential care portal' 
            : mode === 'register' 
            ? 'Create your private care account' 
            : mode === 'otp'
            ? 'Enter email to send and verify 6-digit OTP code'
            : 'Reset your password securely using a 6-digit OTP code'}
        </p>
      </div>

      {/* 3-in-1 MODE TOGGLE TABS */}
      <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/80 gap-0.5">
        <button
          type="button"
          onClick={() => handleTabSwitch('login')}
          className={`flex-1 py-2 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1 ${
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
          className={`flex-1 py-2 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1 ${
            mode === 'register'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Register</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabSwitch('forgot')}
          className={`flex-1 py-2 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1 ${
            mode === 'forgot'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-amber-700 font-bold'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Forgot Pass?</span>
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-start gap-2">
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold space-y-2">
          <div>{success}</div>
          {receivedOtpHint && (mode === 'otp' ? !otpVerified : mode === 'forgot') && (
            <div className="p-2 bg-emerald-100/80 rounded-xl text-emerald-950 text-xs flex items-center justify-between font-mono">
              <span>Simulated OTP: <strong>{receivedOtpHint}</strong></span>
              <button
                type="button"
                onClick={() => setOtp(receivedOtpHint)}
                className="px-2 py-0.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-sans font-bold rounded-md transition-colors cursor-pointer"
              >
                Auto-Fill
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 1 & 2: SIGN IN / REGISTER FORM */}
      {(mode === 'login' || mode === 'register') && (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                autoComplete="name"
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
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-300 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => handleTabSwitch('forgot')}
                  className="text-[11px] font-extrabold text-emerald-700 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <input
              type="password"
              name="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
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
                autoComplete="new-password"
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
            <span>Strictly confidential & 100% secure</span>
          </div>
        </form>
      )}

      {/* MODE 3: FORGOT PASSWORD VIA OTP */}
      {mode === 'forgot' && (
        <div className="space-y-4">
          {forgotStep === 1 ? (
            /* FORGOT STEP 1: Request OTP code for password reset */
            <form onSubmit={(e) => handleSendOtp(e, setForgotStep)} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Registered Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-300 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-xs transition-all disabled:opacity-50 mt-1 cursor-pointer shadow-md shadow-amber-600/20 active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? 'Sending Reset OTP...' : 'Send Reset OTP Code'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          ) : (
            /* FORGOT STEP 2: Enter 6-digit OTP + New Password */
            <form onSubmit={handleResetPasswordSubmit} className="space-y-3.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">Enter 6-Digit OTP Code</label>
                  <button
                    type="button"
                    onClick={() => setForgotStep(1)}
                    className="text-[11px] font-bold text-amber-700 hover:underline cursor-pointer"
                  >
                    Resend OTP
                  </button>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="483921"
                  className="w-full px-4 py-2.5 text-center tracking-[0.3em] font-mono text-base font-bold rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-300 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-300 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-xs transition-all disabled:opacity-50 mt-1 cursor-pointer shadow-md shadow-amber-600/20 active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? 'Resetting Password...' : 'Reset Password & Sign In'}
                {!loading && <CheckCircle2 className="w-4 h-4" />}
              </button>
            </form>
          )}

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => handleTabSwitch('login')}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Remember your password? Back to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
