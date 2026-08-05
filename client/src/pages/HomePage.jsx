import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, PhoneCall, UserCheck, Smile, BookOpen, ShieldCheck, CalendarCheck, ArrowRight, Star } from 'lucide-react';
import { assets, specialityData, doctors } from '../assets/assets_frontend/assets';

export default function HomePage({ token, setPage }) {
  const navigate = useNavigate();
  const topDoctors = doctors.slice(0, 8);

  return (
    <div className="w-full space-y-20 pb-24">
      
      {/* 1. HERO HEADER BANNER (EDGE-TO-EDGE FULL WIDTH WITH ZERO OUTER PADDING) */}
      <div className="w-full px-0 pt-0 mt-0">
        <div className="flex flex-col md:flex-row flex-wrap bg-[#5F6FFF] rounded-none px-6 md:px-10 lg:px-20 relative overflow-hidden">
          
          {/* Left Text Content */}
          <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[8vw] md:mb-[-30px]">
            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
              Book Appointment <br /> With Trusted Doctors
            </p>
            <div className="flex flex-col md:flex-row items-center gap-3 text-white text-xs sm:text-sm font-light">
              <img className="w-28 shrink-0" src={assets.group_profiles} alt="Group Profiles" />
              <p className="leading-relaxed">
                Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block" /> schedule your appointment hassle-free.
              </p>
            </div>
            <button
              onClick={() => setPage('therapists')}
              className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-xs sm:text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 shadow-md font-semibold cursor-pointer"
            >
              <span>Book appointment</span>
              <img className="w-3" src={assets.arrow_icon} alt="Arrow" />
            </button>
          </div>

          {/* Right Header Image (Full Height & Bottom Aligned) */}
          <div className="md:w-1/2 relative flex items-end justify-center md:justify-end mt-4 md:mt-0">
            <img
              className="w-full md:absolute bottom-0 h-auto object-contain drop-shadow-xl"
              src={assets.header_img}
              alt="Header Doctors"
            />
          </div>

        </div>
      </div>

      {/* 2. FIND BY SPECIALITY SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-lg mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Find by Speciality</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
          </p>
        </div>

        {/* Specialities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 pt-2">
          {specialityData.map((item) => (
            <div
              key={item.speciality}
              onClick={() => setPage('therapists')}
              className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-[#5F6FFF] hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center space-y-3 cursor-pointer transform hover:-translate-y-1.5"
            >
              <div className="w-20 h-20 rounded-full bg-[#f0f2ff] group-hover:bg-[#e2e6ff] flex items-center justify-center transition-colors p-3">
                <img src={item.image} alt={item.speciality} className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-slate-800 group-hover:text-[#5F6FFF] transition-colors leading-tight">
                {item.speciality}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. TOP DOCTORS TO BOOK GRID */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-lg mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Top Doctors to Book</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {topDoctors.map((doc) => (
            <div
              key={doc._id}
              onClick={() => {
                navigate(`/appointment/${doc._id}`);
                window.scrollTo(0, 0);
              }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#5F6FFF] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="bg-[#f0f2ff] overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-48 object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5F6FFF]" />
                    <span className="text-xs font-extrabold text-[#5F6FFF]">Available</span>
                  </div>

                  <div className="flex items-center gap-1.5 pt-1">
                    <h3 className="text-base font-black text-slate-900 group-hover:text-[#5F6FFF] transition-colors truncate">{doc.name}</h3>
                    <img src={assets.verified_icon} alt="Verified" className="w-4 h-4 shrink-0" title="Verified Specialist" />
                  </div>

                  <p className="text-xs font-bold text-slate-500">{doc.speciality}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Button */}
        <div className="text-center pt-4">
          <button
            onClick={() => setPage('therapists')}
            className="px-10 py-4 rounded-full bg-[#f0f2ff] hover:bg-[#e2e6ff] text-slate-800 font-extrabold text-xs sm:text-sm transition-all cursor-pointer hover:shadow-md active:scale-95"
          >
            more
          </button>
        </div>
      </div>

      {/* 4. BOOK APPOINTMENT BANNER SECTION WITH ASSETS.APPOINTMENT_IMG */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="bg-[#5F6FFF] rounded-3xl p-8 sm:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-5 max-w-xl z-10 text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-xs sm:text-sm font-extrabold tracking-wide backdrop-blur-md border border-white/20">
              <CalendarCheck className="w-4 h-4" />
              Book Appointment
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Book Appointment <br className="hidden sm:inline" /> With 100+ Trusted Doctors
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-medium">
              Simply browse through our extensive list of verified doctors, book your appointment hassle-free, and receive care tailored to your needs.
            </p>
            <button
              onClick={() => setPage('register')}
              className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs sm:text-sm rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer active:scale-95"
            >
              Create account
            </button>
          </div>
          <div className="w-full md:w-1/2 max-w-md z-10 flex justify-center md:justify-end">
            <img
              src={assets.appointment_img}
              alt="Book Appointment Doctor"
              className="w-full max-w-xs sm:max-w-sm h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* 5. EMERGENCY CRISIS CALLOUT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="bg-[#f0f2ff] border border-blue-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="p-3 bg-[#5F6FFF] text-white rounded-2xl shrink-0 shadow-md">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">24/7 Crisis & Support Lifeline</h4>
              <p className="text-xs text-slate-600 font-semibold mt-0.5">Free, confidential support is available anytime for you or your loved ones.</p>
            </div>
          </div>
          <a
            href="tel:988"
            className="px-6 py-3 bg-[#5F6FFF] hover:bg-[#4d5ceb] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shrink-0 shadow-md active:scale-95"
          >
            Call 988 Lifeline
          </a>
        </div>
      </div>

    </div>
  );
}
