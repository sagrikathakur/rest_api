import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, PhoneCall, UserCheck, Smile, BookOpen, ShieldCheck } from 'lucide-react';
import { heroImages } from '../assets/heroImages';

export default function HomePage({ token, setPage }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slide transition every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  return (
    <div className="w-full space-y-12 pb-16">
      
      {/* 100% FULL-WIDTH IMAGE HERO CAROUSEL (ASSETS DRIVEN) */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[580px] lg:h-[650px] overflow-hidden bg-slate-950 shadow-md group">
        
        {/* Slides */}
        {heroImages.map((item, index) => (
          <div
            key={item.id || index}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
            }`}
          >
            <img
              src={item.url}
              alt={item.alt || `Hero Slide ${index + 1}`}
              className="w-full h-full object-cover object-center block"
            />
          </div>
        ))}

        {/* Previous Arrow Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white backdrop-blur-md transition-all cursor-pointer shadow-xl border border-white/20 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Arrow Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white backdrop-blur-md transition-all cursor-pointer shadow-xl border border-white/20 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Indicators / Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-slate-950/60 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                index === currentIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* LOWER SECTION (CENTERED CONTAINER BELOW HERO) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Emergency Crisis Callout */}
        <div className="bg-gradient-to-r from-rose-50 via-rose-50/50 to-amber-50 border border-rose-200 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-2.5 bg-rose-600 text-white rounded-2xl shrink-0 shadow-md shadow-rose-600/20">
              <PhoneCall className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-rose-950">24/7 Crisis & Suicide Prevention Lifeline</h4>
              <p className="text-[11px] text-rose-700 mt-0.5">Free, confidential support is available anytime for you or your loved ones.</p>
            </div>
          </div>
          <a
            href="tel:988"
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shrink-0 shadow-xs active:scale-95"
          >
            Call 988 Lifeline
          </a>
        </div>

        {/* 4 Pillars of MindCare */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Holistic Mental Healthcare Services</h2>
            <p className="text-xs text-slate-500">Everything you need for emotional support and self-care</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all space-y-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl w-fit shadow-md shadow-emerald-500/20">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">1-on-1 Certified Therapy</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Book virtual or in-person sessions with licensed psychologists specializing in CBT & Anxiety.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all space-y-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl w-fit shadow-md shadow-emerald-500/20">
                <Smile className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">Daily Mood Tracker</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Log daily emotions, track stress patterns, and receive personalized mindfulness insights.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all space-y-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl w-fit shadow-md shadow-emerald-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">Mindfulness Journal</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Express thoughts with daily guided gratitude prompts and secure private notes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all space-y-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl w-fit shadow-md shadow-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">100% Confidential</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                HIPAA-compliant, end-to-end encrypted storage ensuring your privacy is completely safe.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
