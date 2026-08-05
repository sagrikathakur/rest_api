import React, { useState } from 'react';
import { BookOpen, Sparkles, Calendar, Send, Heart, Smile, Flame, Award, Trash2 } from 'lucide-react';

export default function MoodJournal({ user }) {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: 'Today, 9:30 AM',
      mood: 'Peaceful 🌿',
      moodColor: 'bg-blue-50 text-blue-800 border-blue-200',
      note: 'Completed 15 minutes of guided morning breathwork. Noticed my shoulder tension releasing. Feeling grounded and clear-headed.',
      gratitude: 'Grateful for the quiet morning sunshine and a hot cup of chamomile tea.',
      tag: '#MorningMindfulness'
    },
    {
      id: 2,
      date: 'Yesterday, 8:15 PM',
      mood: 'Hopeful ✨',
      moodColor: 'bg-blue-50 text-blue-900 border-blue-200',
      note: 'Had a breakthrough conversation during therapy. Practiced cognitive reframing techniques to reduce evening overthinking.',
      gratitude: 'Grateful for compassionate care guidance and supportive friends.',
      tag: '#TherapyBreakthrough'
    }
  ]);

  const moodOptions = [
    { label: 'Peaceful 🌿', color: 'bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100' },
    { label: 'Calm 😊', color: 'bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100' },
    { label: 'Reflective 🌊', color: 'bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100' },
    { label: 'Hopeful ✨', color: 'bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100' },
    { label: 'Energetic ⚡', color: 'bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100' },
    { label: 'Anxious 😔', color: 'bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100' }
  ];

  const [selectedMood, setSelectedMood] = useState(moodOptions[0]);
  const [newNote, setNewNote] = useState('');
  const [newGratitude, setNewGratitude] = useState('');
  const [selectedTag, setSelectedTag] = useState('#DailyReflection');

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const newJournal = {
      id: Date.now(),
      date: 'Just now',
      mood: selectedMood.label,
      moodColor: selectedMood.color,
      note: newNote,
      gratitude: newGratitude || 'Grateful for taking time for self-reflection today.',
      tag: selectedTag
    };

    setEntries([newJournal, ...entries]);
    setNewNote('');
    setNewGratitude('');
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto w-full pb-16">
      {/* HEADER & MOOD ANALYTICS BAR */}
      <div className="space-y-6">
        <div className="bg-blue-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-extrabold backdrop-blur-md border border-white/20">
              <Sparkles className="w-4 h-4 text-blue-200 animate-spin" />
              <span>Personal Wellness Space</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Mindfulness & Mood Journal</h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-md font-medium">
              Log daily emotions, track cognitive wellness trends, and build lasting gratitude habits.
            </p>
          </div>
        </div>

        {/* ANALYTICS SUMMARY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500">Reflections</p>
              <p className="text-xl font-black text-slate-900">{entries.length} Entries</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500">Streak</p>
              <p className="text-xl font-black text-slate-900">5 Days Active</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500">Top Mood</p>
              <p className="text-sm font-black text-slate-900 truncate">Peaceful 🌿</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500">Wellness Score</p>
              <p className="text-xl font-black text-slate-900">94 / 100</p>
            </div>
          </div>
        </div>
      </div>

      {/* NEW REFLECTION JOURNAL ENTRY FORM */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Log Today's Reflection & Mood
          </h2>
          <span className="text-xs font-bold text-slate-400">100% Confidential</span>
        </div>

        <form onSubmit={handleAddEntry} className="space-y-6">
          {/* Mood Selection Options Grid */}
          <div className="space-y-3">
            <label className="block text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">1. How are you feeling right now?</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {moodOptions.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => setSelectedMood(item)}
                  className={`px-3 py-3 rounded-2xl text-xs sm:text-sm font-black border transition-all cursor-pointer text-center ${
                    selectedMood.label === item.label
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-102'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reflection Text Area */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">2. Daily Reflection / Journal Notes</label>
            <textarea
              rows={3}
              required
              placeholder="What experiences, thoughts, or emotions stood out today? Write freely..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            />
          </div>

          {/* Gratitude & Tag Input Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">3. What are you grateful for today?</label>
              <input
                type="text"
                placeholder="e.g. Morning sunshine, a good chat..."
                value={newGratitude}
                onChange={(e) => setNewGratitude(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">4. Reflection Tag</label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs cursor-pointer"
              >
                <option value="#DailyReflection">#DailyReflection</option>
                <option value="#MorningMindfulness">#MorningMindfulness</option>
                <option value="#TherapyBreakthrough">#TherapyBreakthrough</option>
                <option value="#GratitudePractice">#GratitudePractice</option>
                <option value="#SelfCare">#SelfCare</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2.5 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Save Reflection Entry</span>
            </button>
          </div>
        </form>
      </div>

      {/* PAST REFLECTIONS TIMELINE */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Reflection Timeline History
          </h3>
          <span className="text-xs font-bold text-slate-500">{entries.length} Saved Entries</span>
        </div>

        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-xs text-slate-500 font-bold">
              No journal reflections saved yet. Log your first reflection above!
            </div>
          ) : (
            entries.map((item) => (
              <div key={item.id} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all space-y-4 relative group">
                {/* Entry Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
                      {item.mood}
                    </span>
                    <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-extrabold">
                      {item.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500 flex items-center gap-1.5 font-bold">
                      <Calendar className="w-4 h-4 text-blue-600" /> {item.date}
                    </span>
                    <button
                      onClick={() => handleDeleteEntry(item.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1 rounded-lg cursor-pointer"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Entry Note Content */}
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                  {item.note}
                </p>

                {/* Gratitude Callout */}
                {item.gratitude && (
                  <div className="text-xs sm:text-sm text-blue-950 bg-blue-50/80 p-4 rounded-2xl border border-blue-200 font-semibold flex items-start gap-2.5">
                    <Heart className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-blue-950 font-black">Gratitude:</strong> {item.gratitude}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
