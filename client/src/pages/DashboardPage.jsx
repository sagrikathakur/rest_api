import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Smile, Calendar, Clock, Play, Pause, User, ArrowRight, BookOpen, ShieldCheck, Flame, Award, CheckCircle2 } from 'lucide-react';
import { doctors, assets } from '../assets/assets_frontend/assets';

export default function DashboardPage({ token, onLogout }) {
  const navigate = useNavigate();
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
    { label: 'Peaceful', icon: '🌿' },
    { label: 'Calm', icon: '😊' },
    { label: 'Reflective', icon: '🌊' },
    { label: 'Hopeful', icon: '✨' },
    { label: 'Energetic', icon: '⚡' }
  ];

  const upcomingDoctor = doctors[0]; // Dr. Richard James

  return (
    <div className="space-y-10 max-w-6xl mx-auto w-full py-8 px-4 sm:px-8 pb-24">

      {/* 1. WELCOME HEADER BANNER */}
      <div className="bg-[#5F6FFF] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-5 z-10">
          <div className="w-16 h-16 rounded-2xl bg-white text-[#5F6FFF] font-black text-2xl flex items-center justify-center shadow-lg shrink-0 border-2 border-white">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-8 h-8" />}
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold backdrop-blur-md border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Wellness Space</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Welcome Back, {user?.name || 'Member'}!
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium">
              Take a deep breath. We are glad to support your health journey today.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 z-10 shrink-0">
          <div className="px-4 py-2 rounded-full bg-white/20 text-white text-xs sm:text-sm font-extrabold backdrop-blur-md border border-white/20 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-300" />
            <span>7-Day Streak</span>
          </div>
        </div>
      </div>

      {/* 2. STATS METRICS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3.5 bg-[#f0f2ff] text-[#5F6FFF] rounded-2xl shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Appointments</p>
            <p className="text-lg sm:text-xl font-black text-slate-900">3 Sessions</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3.5 bg-[#f0f2ff] text-[#5F6FFF] rounded-2xl shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Streak</p>
            <p className="text-lg sm:text-xl font-black text-slate-900">7 Active Days</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3.5 bg-[#f0f2ff] text-[#5F6FFF] rounded-2xl shrink-0">
            <Smile className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Top Mood</p>
            <p className="text-sm sm:text-base font-black text-slate-900 truncate">Peaceful 🌿</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3.5 bg-[#f0f2ff] text-[#5F6FFF] rounded-2xl shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Care Status</p>
            <p className="text-sm sm:text-base font-black text-[#5F6FFF]">Verified Member</p>
          </div>
        </div>
      </div>

      {/* 3. DAILY EMOTIONAL CHECK-IN */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <Smile className="w-5 h-5 text-[#5F6FFF]" />
            Daily Emotional Check-In
          </h2>
          <span className="text-xs font-extrabold text-[#5F6FFF] bg-[#f0f2ff] px-3 py-1 rounded-full border border-[#c6cdff]">
            Recorded Today
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => setSelectedMood(m.label)}
              className={`p-4 rounded-2xl border text-xs sm:text-sm font-extrabold flex flex-col items-center gap-2 transition-all cursor-pointer ${
                selectedMood === m.label
                  ? 'bg-[#5F6FFF] text-white border-[#5F6FFF] shadow-md scale-102'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-[#f0f2ff]'
              }`}
            >
              <span className="text-2xl">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. TWO-COLUMN GRID: GUIDED BOX BREATHING & SCHEDULED APPOINTMENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 5-MIN GUIDED BREATHING RESET */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-[#5F6FFF] text-white rounded-xl shadow-md">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">5-Min Box Breathing Reset</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
              Inhale 4s &bull; Hold 4s &bull; Exhale 4s &bull; Hold 4s. Promotes immediate stress reduction.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-5 py-4">
            <div className="w-28 h-28 rounded-full bg-[#5F6FFF] flex flex-col items-center justify-center text-white font-mono font-black shadow-xl border-4 border-[#f0f2ff]">
              <span className="text-xl">
                {Math.floor(breathingTime / 60)}:{(breathingTime % 60).toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase tracking-wider opacity-90 font-extrabold mt-0.5">
                {isBreathing ? 'Breathe' : 'Ready'}
              </span>
            </div>

            <button
              onClick={toggleBreathing}
              className="px-8 py-3.5 rounded-full bg-[#5F6FFF] hover:bg-[#4d5ceb] text-white font-extrabold text-xs sm:text-sm transition-all cursor-pointer inline-flex items-center gap-2 shadow-md active:scale-95"
            >
              {isBreathing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isBreathing ? 'Pause Breathing' : 'Start 5-Min Reset'}</span>
            </button>
          </div>
        </div>

        {/* SCHEDULED DOCTOR APPOINTMENT */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-[#5F6FFF] text-white rounded-xl shadow-md">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900">Next Scheduled Session</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#f0f2ff] text-[#5F6FFF] border border-[#c6cdff] text-xs font-extrabold">
                Confirmed
              </span>
            </div>

            {/* Doctor Info Card */}
            <div
              onClick={() => navigate(`/appointment/${upcomingDoctor._id}`)}
              className="p-4 bg-[#f0f2ff] rounded-2xl border border-[#c6cdff] space-y-3 cursor-pointer hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={upcomingDoctor.image}
                  alt={upcomingDoctor.name}
                  className="w-14 h-14 object-cover object-top rounded-xl border border-white shadow-sm shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-[#5F6FFF] transition-colors">{upcomingDoctor.name}</h4>
                    <img src={assets.verified_icon} alt="Verified" className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-bold text-slate-500">{upcomingDoctor.speciality} &bull; {upcomingDoctor.degree}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-extrabold text-[#5F6FFF] pt-1 border-t border-blue-200/60">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#5F6FFF]" /> Tomorrow, Aug 6</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#5F6FFF]" /> 10:00 AM</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => navigate(`/appointment/${upcomingDoctor._id}`)}
              className="w-full py-3.5 px-6 rounded-full bg-[#5F6FFF] hover:bg-[#4d5ceb] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>View Appointment Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onLogout}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-bold text-xs border border-slate-200 transition-colors cursor-pointer"
            >
              Sign Out of Account
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
