import React, { useState, useEffect, useRef } from 'react';
import { HeartHandshake, LogOut, User, LayoutDashboard, Heart, ChevronDown, Home, PhoneCall, BookOpen, Sparkles } from 'lucide-react';

export default function Navbar({
  token,
  user,
  activePage,
  setPage,
  onLogout
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page) => {
    setPage(page);
    setDropdownOpen(false);
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 px-4 sm:px-8 py-3 shadow-xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-slate-900 tracking-tight block leading-tight">
                MindCare
              </span>
              <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Portal
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold leading-none mt-0.5">Mental Health & Wellness</p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          <button
            onClick={() => handleNavClick('home')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePage === 'home'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => handleNavClick('therapists')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePage === 'therapists'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-emerald-600" />
            <span>Find Therapists</span>
          </button>

          {token && (
            <>
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePage === 'dashboard'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => handleNavClick('journal')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePage === 'journal'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mood Journal</span>
              </button>
            </>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* 24/7 Helpline Pill */}
          <a
            href="tel:988"
            className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold transition-all shadow-xs"
            title="Immediate Crisis Support Line"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>Lifeline: <strong className="text-rose-950">988</strong></span>
          </a>

          {token ? (
            /* Logged In User Dropdown Submenu */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-900 transition-all cursor-pointer shadow-xs"
              >
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                  {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                </div>
                <span className="hidden sm:inline text-xs font-bold text-slate-900 max-w-[120px] truncate">
                  {user?.name || 'Account'}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Submenu Card */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-lg py-1.5 z-50">
                  {/* User info Header */}
                  <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/60">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Member Account'}</p>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">{user?.email || 'Logged In'}</p>
                  </div>

                  {/* Submenu Items */}
                  <div className="p-1 space-y-0.5">
                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        activePage === 'dashboard' ? 'bg-emerald-50 text-emerald-900' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                      <span>Wellness Dashboard</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('therapists')}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        activePage === 'therapists' ? 'bg-emerald-50 text-emerald-900' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Heart className="w-4 h-4 text-emerald-600" />
                      <span>Find Therapists</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('journal')}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        activePage === 'journal' ? 'bg-emerald-50 text-emerald-900' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      <span>Mood Journal</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('profile')}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        activePage === 'profile' ? 'bg-emerald-50 text-emerald-900' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <User className="w-4 h-4 text-emerald-600" />
                      <span>My Care Profile</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 my-1"></div>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out Buttons */
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('login')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Sign In
              </button>

              <button
                onClick={() => handleNavClick('register')}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xs transition-all cursor-pointer"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
