import React from 'react';
import { HeartHandshake, ShieldCheck, Heart, Sparkles, PhoneCall, BookOpen, Calendar, ArrowRight, UserCheck, Smile, Star, CheckCircle2 } from 'lucide-react';

export default function HomePage({ token, setPage }) {
  return (
    <div className="space-y-16 max-w-5xl mx-auto w-full pb-16">
      
      {/* Hero Banner Section */}
      <div className="relative bg-gradient-to-br from-emerald-500/10 via-white to-teal-500/10 border border-teal-100 rounded-3xl p-8 sm:p-14 text-center space-y-8 shadow-sm overflow-hidden">
        {/* Soft background ambient glow blobs */}
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-teal-300/20 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-emerald-200/80 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
            <span>Trusted & Confidential Mental Healthcare</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-teal-950 tracking-tight leading-tight max-w-3xl mx-auto">
            Prioritize Your <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent">Mental Wellness</span> & Peace of Mind
          </h1>

          <p className="text-xs sm:text-base text-teal-800/80 max-w-2xl mx-auto leading-relaxed">
            Connect with licensed therapists, track your daily emotional journey, and practice mindfulness with 100% HIPAA-compliant security.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {token ? (
              <>
                <button
                  onClick={() => setPage('dashboard')}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-600/25 cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
                >
                  <span>Go to Wellness Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setPage('therapists')}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-teal-50/60 text-teal-950 font-bold text-xs border border-teal-200 transition-all cursor-pointer shadow-xs hover:-translate-y-0.5"
                >
                  <Heart className="w-4 h-4 text-emerald-600" />
                  <span>Find a Therapist</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setPage('register')}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-600/25 cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
                >
                  <span>Get Started for Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setPage('therapists')}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-teal-50/60 text-teal-950 font-bold text-xs border border-teal-200 transition-all cursor-pointer shadow-xs hover:-translate-y-0.5"
                >
                  <Heart className="w-4 h-4 text-emerald-600" />
                  <span>Explore Care Directory</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Live Statistics Counter Bar */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-teal-100/80">
          <div className="space-y-0.5">
            <p className="text-2xl font-extrabold text-teal-950">10k+</p>
            <p className="text-[11px] font-bold text-teal-700">Care Sessions Completed</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-2xl font-extrabold text-teal-950">4.9 / 5</p>
            <p className="text-[11px] font-bold text-teal-700">Member Rating Average</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-2xl font-extrabold text-teal-950">100%</p>
            <p className="text-[11px] font-bold text-teal-700">HIPAA & Data Private</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-2xl font-extrabold text-teal-950">24 / 7</p>
            <p className="text-[11px] font-bold text-teal-700">Crisis Lifeline Active</p>
          </div>
        </div>
      </div>

      {/* Emergency Lifeline Callout */}
      <div className="bg-gradient-to-r from-rose-500/10 via-rose-50 to-orange-500/10 border border-rose-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="p-3 bg-rose-600 text-white rounded-2xl shrink-0 shadow-md shadow-rose-600/20">
            <PhoneCall className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-rose-950">24/7 Crisis & Suicide Prevention Lifeline</h4>
            <p className="text-xs text-rose-800 mt-0.5">Free, confidential support is available anytime for you or your loved ones.</p>
          </div>
        </div>
        <a
          href="tel:988"
          className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-2xl transition-all shrink-0 shadow-md shadow-rose-600/20 active:scale-95"
        >
          Call 988 Lifeline
        </a>
      </div>

      {/* Core Services Section */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-teal-950 tracking-tight">Holistic Mental Healthcare Services</h2>
          <p className="text-xs text-teal-700 max-w-md mx-auto">Designed by mental health experts for your long-term emotional well-being</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="premium-card premium-card-hover p-6 rounded-3xl space-y-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl w-fit shadow-md shadow-emerald-500/20">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-extrabold text-teal-950">1-on-1 Certified Therapy</h3>
            <p className="text-xs text-teal-800/80 leading-relaxed">
              Book virtual or in-person sessions with licensed psychologists specializing in CBT & Anxiety.
            </p>
          </div>

          <div className="premium-card premium-card-hover p-6 rounded-3xl space-y-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl w-fit shadow-md shadow-emerald-500/20">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-extrabold text-teal-950">Daily Mood Tracker</h3>
            <p className="text-xs text-teal-800/80 leading-relaxed">
              Log daily emotions, track stress patterns, and receive personalized mindfulness recommendations.
            </p>
          </div>

          <div className="premium-card premium-card-hover p-6 rounded-3xl space-y-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl w-fit shadow-md shadow-emerald-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-extrabold text-teal-950">Guided Reflection Journal</h3>
            <p className="text-xs text-teal-800/80 leading-relaxed">
              Express thoughts with daily guided gratitude prompts and secure private notes.
            </p>
          </div>

          <div className="premium-card premium-card-hover p-6 rounded-3xl space-y-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl w-fit shadow-md shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-extrabold text-teal-950">HIPAA Compliant</h3>
            <p className="text-xs text-teal-800/80 leading-relaxed">
              Your privacy is paramount. End-to-end encrypted storage guarantees total confidentiality.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
