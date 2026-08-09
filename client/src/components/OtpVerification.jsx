import React, { useState } from 'react';
import { KeyRound, Mail, CheckCircle2, AlertCircle, ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';

export default function OtpVerification() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: enter email, 2: enter OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [verified, setVerified] = useState(false);
  const [receivedOtpHint, setReceivedOtpHint] = useState('');

  // Handle Send OTP
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(`Verification code sent to ${email}`);
        if (data.otp) {
          setReceivedOtpHint(data.otp);
        }
        setStep(2);
      } else {
        setError(data.message || 'Failed to send OTP code.');
      }
    } catch (err) {
      setError('Could not connect to authentication server at http://localhost:3000');
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    if (!otp || otp.length !== 6) {
      setError('Please enter the complete 6-digit OTP code.');
      return;
    }

    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), otp: otp.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.success && data.verified) {
        setVerified(true);
        setSuccessMsg('Email identity successfully verified!');
      } else {
        setError(data.message || 'Invalid or expired OTP code.');
      }
    } catch (err) {
      setError('Could not connect to authentication server at http://localhost:3000');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEmail('');
    setOtp('');
    setStep(1);
    setError('');
    setSuccessMsg('');
    setVerified(false);
    setReceivedOtpHint('');
  };

  return (
    <div className="max-w-md mx-auto w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white text-center space-y-2">
        <div className="inline-flex p-3 bg-white/10 rounded-2xl backdrop-blur-md mb-1 shadow-inner">
          <KeyRound className="w-7 h-7 text-emerald-100" />
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">OTP Authentication</h2>
        <p className="text-xs text-emerald-100 font-medium">Secure Two-Factor & Email Verification</p>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Status Alerts */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2.5 shadow-xs">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-start gap-2.5 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              {successMsg}
              {receivedOtpHint && !verified && (
                <div className="mt-2 p-2 bg-emerald-100/70 rounded-xl text-emerald-950 text-xs flex items-center justify-between">
                  <span>Simulated OTP: <strong className="font-mono text-sm tracking-widest">{receivedOtpHint}</strong></span>
                  <button
                    type="button"
                    onClick={() => setOtp(receivedOtpHint)}
                    className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Auto-Fill
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Verification Success State */}
        {verified ? (
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900">Verification Complete</h3>
              <p className="text-xs text-slate-500 font-medium">Your email <span className="font-bold text-slate-700">{email}</span> has been verified.</p>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Verify Another Email</span>
            </button>
          </div>
        ) : step === 1 ? (
          /* STEP 1: Enter Email */
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>Enter Email Address</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-xs"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-600/20 active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating & Sending OTP...</span>
                </>
              ) : (
                <>
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Cryptographically hashed SHA-256 OTP storage</span>
            </div>
          </form>
        ) : (
          /* STEP 2: Enter OTP Code */
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Enter 6-Digit OTP</span>
                </label>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Change Email
                </button>
              </div>

              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="483921"
                className="w-full px-4 py-3 text-center tracking-[0.4em] font-mono text-lg font-bold rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-xs"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-600/20 active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <span>Verify OTP</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
              <span className="text-slate-500 font-medium">Didn't receive code?</span>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="text-emerald-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Resend OTP</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
