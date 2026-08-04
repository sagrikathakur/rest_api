import React, { useState } from 'react';
import { Heart, Search, Star, Calendar, Video } from 'lucide-react';

export default function TherapistsPage({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const therapists = [
    {
      id: 1,
      name: 'Dr. Sarah Jenkins, PsyD',
      title: 'Clinical Psychologist & CBT Specialist',
      specialties: ['Anxiety', 'Stress Management', 'CBT'],
      rating: '4.9',
      reviews: 142,
      price: '$90 / Session',
      available: 'Tomorrow at 4:00 PM',
      mode: 'Video & Chat'
    },
    {
      id: 2,
      name: 'Marcus Vance, LMFT',
      title: 'Licensed Marriage & Family Therapist',
      specialties: ['Relationship Care', 'Mindfulness', 'Communication'],
      rating: '4.8',
      reviews: 98,
      price: '$85 / Session',
      available: 'Thursday at 2:30 PM',
      mode: 'Video Call'
    },
    {
      id: 3,
      name: 'Elena Rostova, LCSW',
      title: 'Licensed Clinical Social Worker',
      specialties: ['Depression', 'Trauma Recovery', 'Self-Esteem'],
      rating: '5.0',
      reviews: 185,
      price: '$95 / Session',
      available: 'Friday at 10:00 AM',
      mode: 'Video & Chat'
    },
    {
      id: 4,
      name: 'David Chen, MA',
      title: 'Mindfulness & Sleep Wellness Coach',
      specialties: ['Sleep Hygiene', 'Guided Meditation', 'Burnout'],
      rating: '4.9',
      reviews: 76,
      price: '$70 / Session',
      available: 'Today at 6:00 PM',
      mode: 'Audio & Video'
    }
  ];

  const categories = ['All', 'Anxiety', 'Mindfulness', 'Depression', 'Relationship Care'];

  const filtered = therapists.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || t.specialties.includes(selectedCategory);
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full py-8 px-4 sm:px-8">

      {/* Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Heart className="w-5 h-5 text-emerald-600" />
            Find Certified Therapists & Care Specialists
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Book confidential, HIPAA-compliant 1-on-1 therapy sessions</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search therapist name, specialty (e.g. Anxiety, CBT)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Therapist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 bg-white p-8 rounded-3xl border border-slate-200 text-center text-xs text-slate-500 font-bold">
            No care specialists found matching your search.
          </div>
        ) : (
          filtered.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-black text-base flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
                      {t.name.charAt(4)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">{t.name}</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">{t.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 text-amber-900 text-[11px] font-bold shrink-0">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{t.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {t.specialties.map((spec) => (
                    <span key={spec} className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-900 border border-teal-100 text-[10px] font-bold">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] space-y-1 text-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1"><Calendar className="w-3 h-3 text-emerald-600" /> Next Available:</span>
                    <span className="font-bold text-slate-900">{t.available}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1"><Video className="w-3 h-3 text-emerald-600" /> Consultation:</span>
                    <span className="font-semibold">{t.mode}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-900">{t.price}</span>
                <button
                  onClick={() => alert(`Session requested with ${t.name}.`)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs active:scale-95"
                >
                  Book Session
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
