import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Smile, Calendar, Clock, Play, RefreshCw, CheckCircle2, User, BookOpen, Pause } from 'lucide-react';

export default function Dashboard({ token, onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMood, setSelectedMood] = useState('Peaceful');
  const [breathingTime, setBreathingTime] = useState(300);
  const [isBreathing, setIsBreathing] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok && data.user) {
          setUser(data.user);
        } else {
          setError(data.message || 'Failed to authenticate user.');
        }
      } catch (err) {
        setError('Error connecting to backend.');
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchMe();
  }, [token]);

  // Breathing Timer Effect
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
    { label: 'Peaceful', icon: '🌿', color: 'bg-emerald-100/80 text-emerald-900 border-emerald-300' },
    { label: 'Calm', icon: '😊', color: 'bg-teal-100/80 text-teal-900 border-teal-300' },
    { label: 'Anxious', icon: '😔', color: 'bg-amber-100/80 text-amber-900 border-amber-300' },
    { label: 'Tired', icon: '💤', color: 'bg-indigo-100/80 text-indigo-900 border-indigo-300' },
    { label: 'Hopeful', icon: '✨', color: 'bg-sky-100/80 text-sky-900 border-sky-300' }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto w-full pb-12">
      
      {/* Welcome Banner */}
      <div className="premium-card p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-7 h-7" />}
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-teal-950 tracking-tight">
              Welcome Back, <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{user?.name || 'Friend'}</span>!
            </h2>
            <p className="text-xs text-teal-700 mt-1">Take a deep breath. We are glad you are here today.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 rounded-2xl border border-emerald-200/80 text-xs font-bold text-emerald-900 shadow-xs">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>7-Day Mindfulness Streak Active</span>
        </div>
      </div>

      {/* Daily Mood Check-In Widget */}
      <div className="premium-card p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-teal-950 uppercase tracking-wider flex items-center gap-2">
            <Smile className="w-4 h-4 text-emerald-600" />
            Daily Emotional Check-In
          </h3>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Mood Recorded
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => setSelectedMood(m.label)}
              className={`p-4 rounded-2xl border text-xs font-extrabold flex flex-col items-center gap-2 transition-all cursor-pointer ${
                selectedMood === m.label
                  ? `${m.color} border-2 shadow-md transform -translate-y-1`
                  : 'bg-white/80 border-teal-100 text-teal-900 hover:bg-teal-50/50'
              }`}
            >
              <span className="text-2xl">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Interactive Breathing Circle & Scheduled Session */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Interactive Guided Box Breathing Exercise */}
        <div className="premium-card p-6 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-md shadow-emerald-500/20">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-teal-950">5-Min Box Breathing Reset</h3>
            </div>
            <p className="text-xs text-teal-800/80 leading-relaxed">
              Inhale 4s &bull; Hold 4s &bull; Exhale 4s &bull; Hold 4s. Proven to calm your nervous system.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-5 py-4">
            {/* Animated Pulsating Breathing Circle */}
            <div
              className={`w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex flex-col items-center justify-center text-white font-mono font-extrabold shadow-2xl transition-transform ${
                isBreathing ? 'animate-breathing scale-110' : ''
              }`}
            >
              <span className="text-xl">
                {Math.floor(breathingTime / 60)}:{(breathingTime % 60).toString().padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-emerald-100 mt-0.5">
                {isBreathing ? 'Breathe' : 'Ready'}
              </span>
            </div>

            <button
              onClick={toggleBreathing}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs transition-all shadow-md shadow-emerald-600/25 cursor-pointer flex items-center gap-2 active:scale-95"
            >
              {isBreathing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isBreathing ? 'Pause Breathing' : 'Start 5-Min Reset'}</span>
            </button>
          </div>
        </div>

        {/* Scheduled Therapy Session */}
        <div className="premium-card p-6 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-md shadow-emerald-500/20">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-teal-950">Next Scheduled Session</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 border border-emerald-300 text-[10px] font-extrabold">
                Confirmed
              </span>
            </div>

            <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-100 space-y-2 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                  J
                </div>
                <div>
                  <h4 className="font-extrabold text-teal-950 text-sm">Dr. Sarah Jenkins, PsyD</h4>
                  <p className="text-teal-700">Cognitive Behavioral Therapy (CBT)</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-emerald-800 font-bold pt-2 border-t border-teal-100/60">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-emerald-600" /> Tomorrow</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-600" /> 4:00 PM EST</span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200 transition-colors cursor-pointer"
          >
            Sign Out of Care Account
          </button>
        </div>

      </div>

    </div>
  );
}
