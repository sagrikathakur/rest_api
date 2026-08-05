import React, { useState } from 'react';
import { Heart, Search, Star, Calendar, ShieldCheck, Tag, CheckCircle2, UserCheck, Video, Clock } from 'lucide-react';

export default function MyProducts({ user }) {
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
    <div className="space-y-8 max-w-5xl mx-auto w-full pb-12">
      {/* Header Bar */}
      <div className="premium-card p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-teal-950 flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-emerald-600" />
            Find Certified Therapists & Care Specialists
          </h2>
          <p className="text-xs text-teal-700 mt-1">Book confidential 1-on-1 therapy sessions</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4.5 h-4.5 text-teal-500 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search therapist name, specialty (e.g. Anxiety, CBT)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-teal-200 text-xs font-semibold text-teal-950 placeholder-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-teal-900 border border-teal-200 hover:bg-teal-50/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Therapist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-2 premium-card p-12 rounded-3xl text-center text-xs text-teal-700 font-bold">
            No care specialists found matching your search.
          </div>
        ) : (
          filtered.map((t) => (
            <div key={t.id} className="premium-card premium-card-hover p-6 rounded-3xl space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
                      {t.name.charAt(4)}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-teal-950 leading-tight">{t.name}</h3>
                      <p className="text-xs text-teal-700 mt-0.5">{t.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 text-amber-900 text-xs font-extrabold shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{t.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {t.specialties.map((spec) => (
                    <span key={spec} className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-900 border border-teal-100 text-[11px] font-bold">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="p-3 bg-teal-50/50 rounded-2xl border border-teal-100 text-xs space-y-1.5 text-teal-950">
                  <div className="flex items-center justify-between">
                    <span className="text-teal-700 flex items-center gap-1.5 font-medium"><Calendar className="w-3.5 h-3.5 text-emerald-600" /> Next Available:</span>
                    <span className="font-extrabold text-teal-950">{t.available}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-700 flex items-center gap-1.5 font-medium"><Video className="w-3.5 h-3.5 text-emerald-600" /> Consultation:</span>
                    <span className="font-bold">{t.mode}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-teal-50">
                <span className="text-sm font-extrabold text-teal-950">{t.price}</span>
                <button
                  onClick={() => alert(`Session requested with ${t.name}.`)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs transition-all shadow-md shadow-emerald-600/20 cursor-pointer active:scale-95"
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
