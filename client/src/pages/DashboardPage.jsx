import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Smile, Calendar, Clock, Play, Pause, User } from 'lucide-react';

export default function DashboardPage({ token, onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState('Peaceful');
  const [breathingTime, setBreathingTime] = useState(300);
  const [isBreathing, setIsBreathing] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.user) setUser(data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchMe();
  }, [token]);

  useEffect(() => {
    let timer;
    if (isBreathing && breathingTime > 0) {
      timer = setInterval(() => setBreathingTime((t) => t - 1), 1000);
    } else if (breathingTime === 0) {
      setIsBreathing(false);
    }
    return () => clearInterval(timer);
  }, [isBreathing, breathingTime]);

  const toggleBreathing = () => {
    if (breathingTime === 0) setBreathingTime(300);
    setIsBreathing(!isBreathing);
  };

  const moods = [
    { label: 'Peaceful', icon: '🌿', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    { label: 'Calm', icon: '😊', color: 'bg-teal-100 text-teal-900 border-teal-300' },
    { label: 'Anxious', icon: '😔', color: 'bg-amber-100 text-amber-900 border-amber-300' },
    { label: 'Tired', icon: '💤', color: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
    { label: 'Hopeful', icon: '✨', color: 'bg-sky-100 text-sky-900 border-sky-300' }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full py-8 px-4 sm:px-8">

      
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Welcome Back, <span className="text-emerald-700">{user?.name || 'Friend'}</span>!
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Take a deep breath. We are glad you are here today.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-1.5 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-800 shadow-xs">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>7-Day Mindfulness Streak</span>
        </div>
      </div>

      {/* Daily Mood Check-In Widget */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Smile className="w-4 h-4 text-emerald-600" />
            Daily Emotional Check-In
          </h3>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Recorded Today
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => setSelectedMood(m.label)}
              className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                selectedMood === m.label
                  ? `${m.color} border-2 shadow-xs scale-105`
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="text-2xl">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Guided Box Breathing & Scheduled Session */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 5-Min Guided Box Breathing */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-md">
                <Heart className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">5-Min Box Breathing Reset</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Inhale 4s &bull; Hold 4s &bull; Exhale 4s &bull; Hold 4s. Promotes immediate stress reduction.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 py-2">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex flex-col items-center justify-center text-white font-mono font-bold shadow-lg shadow-emerald-500/25">
              <span className="text-lg">
                {Math.floor(breathingTime / 60)}:{(breathingTime % 60).toString().padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider opacity-80">
                {isBreathing ? 'Breathe' : 'Ready'}
              </span>
            </div>

            <button
              onClick={toggleBreathing}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-2 shadow-sm active:scale-95"
            >
              {isBreathing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isBreathing ? 'Pause Breathing' : 'Start 5-Min Reset'}</span>
            </button>
          </div>
        </div>

        {/* Scheduled Therapy Session */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-md">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Next Scheduled Session</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                Confirmed
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-xs text-slate-800">
              <p className="font-bold text-slate-900">Dr. Sarah Jenkins, PsyD</p>
              <p className="text-slate-500">Cognitive Behavioral Therapy (CBT)</p>
              <div className="flex items-center gap-3 text-emerald-700 font-bold pt-1">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-emerald-600" /> Tomorrow</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-600" /> 4:00 PM EST</span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 transition-colors cursor-pointer"
          >
            Sign Out of Account
          </button>
        </div>

      </div>

    </div>
  );
}
