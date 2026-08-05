import React, { useState, useEffect, useRef } from 'react';
import { LogOut, User, LayoutDashboard, Heart, ChevronDown, BookOpen, Sparkles } from 'lucide-react';
import { assets } from '../assets/assets_frontend/assets';

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
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 px-4 sm:px-10 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer"
        >
          <img src={assets.logo} alt="Prescripto Logo" className="w-38 sm:w-44 h-auto object-contain" />
        </div>

        {/* Center: Basic Text Nav Links with #5F6FFF Underline */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('home')}
            className={`py-1 text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-colors cursor-pointer border-b-2 ${
              activePage === 'home'
                ? 'text-[#5F6FFF] border-[#5F6FFF]'
                : 'text-slate-700 border-transparent hover:text-[#5F6FFF]'
            }`}
          >
            HOME
          </button>

          <button
            onClick={() => handleNavClick('therapists')}
            className={`py-1 text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-colors cursor-pointer border-b-2 ${
              activePage === 'therapists' || activePage === 'doctors'
                ? 'text-[#5F6FFF] border-[#5F6FFF]'
                : 'text-slate-700 border-transparent hover:text-[#5F6FFF]'
            }`}
          >
            ALL DOCTORS
          </button>

          {token && (
            <>
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`py-1 text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-colors cursor-pointer border-b-2 ${
                  activePage === 'dashboard'
                    ? 'text-[#5F6FFF] border-[#5F6FFF]'
                    : 'text-slate-700 border-transparent hover:text-[#5F6FFF]'
                }`}
              >
                DASHBOARD
              </button>

              <button
                onClick={() => handleNavClick('journal')}
                className={`py-1 text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-colors cursor-pointer border-b-2 ${
                  activePage === 'journal'
                    ? 'text-[#5F6FFF] border-[#5F6FFF]'
                    : 'text-slate-700 border-transparent hover:text-[#5F6FFF]'
                }`}
              >
                MOOD JOURNAL
              </button>
            </>
          )}
        </nav>

        {/* Right: Action / Account */}
        <div className="flex items-center gap-4">
          {token ? (
            /* Logged In User Dropdown Submenu */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={assets.profile_pic} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-[#5F6FFF]" />
                <img src={assets.dropdown_icon} alt="Dropdown" className="w-3.5 h-3.5 opacity-70" />
              </button>

              {/* Submenu Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 bg-[#f0f2ff]">
                    <p className="text-sm font-extrabold text-slate-900 truncate">{user?.name || 'Member Account'}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">{user?.email || 'Logged In'}</p>
                  </div>

                  <div className="p-1 space-y-1">
                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-[#f0f2ff] hover:text-[#5F6FFF] rounded-xl transition-colors cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#5F6FFF]" />
                      <span>Wellness Dashboard</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('therapists')}
                      className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-[#f0f2ff] hover:text-[#5F6FFF] rounded-xl transition-colors cursor-pointer"
                    >
                      <Heart className="w-4 h-4 text-[#5F6FFF]" />
                      <span>Find Doctors</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('journal')}
                      className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-[#f0f2ff] hover:text-[#5F6FFF] rounded-xl transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-[#5F6FFF]" />
                      <span>Mood Journal</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('profile')}
                      className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-[#f0f2ff] hover:text-[#5F6FFF] rounded-xl transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4 text-[#5F6FFF]" />
                      <span>My Care Profile</span>
                    </button>
                  </div>

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out: Create Account Button with #5F6FFF */
            <button
              onClick={() => handleNavClick('register')}
              className="px-8 py-3 rounded-full bg-[#5F6FFF] hover:bg-[#4d5ceb] text-white font-extrabold text-xs sm:text-sm transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Create account
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
