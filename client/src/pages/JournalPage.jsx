import React, { useState } from 'react';
import { BookOpen, Sparkles, Calendar, Send } from 'lucide-react';

export default function JournalPage({ user }) {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: 'Today, 9:30 AM',
      mood: 'Peaceful 🌿',
      note: 'Practiced 10 minutes of morning breathing exercise. Feeling calm and clear-headed.',
      gratitude: 'Grateful for quiet morning sunshine.'
    },
    {
      id: 2,
      date: 'Yesterday, 8:15 PM',
      mood: 'Grateful ✨',
      note: 'Had a reassuring conversation with my therapist. Learned a helpful cognitive reframing technique.',
      gratitude: 'Grateful for supportive friends.'
    }
  ]);

  const [newMood, setNewMood] = useState('Peaceful 🌿');
  const [newNote, setNewNote] = useState('');
  const [newGratitude, setNewGratitude] = useState('');

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newNote) return;
    const newJournal = {
      id: Date.now(),
      date: 'Just now',
      mood: newMood,
      note: newNote,
      gratitude: newGratitude || 'Grateful for a quiet moment of mindfulness.'
    };
    setEntries([newJournal, ...entries]);
    setNewNote('');
    setNewGratitude('');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto w-full py-8 px-4 sm:px-8">

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            Mindfulness Mood Journal
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Reflect on thoughts and capture moments of gratitude in private</p>
        </div>
      </div>

      {/* New Journal Entry Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Log Today's Reflection
        </h3>

        <form onSubmit={handleAddEntry} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Current Mood</label>
            <div className="flex flex-wrap gap-2">
              {['Peaceful 🌿', 'Calm 😊', 'Reflective 🌊', 'Hopeful ✨', 'Anxious 😔'].map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setNewMood(m)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    newMood === m
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Daily Reflection / Journal Notes</label>
            <textarea
              rows={3}
              required
              placeholder="How did you feel today? What thoughts were on your mind?"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-300 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">One Thing You Are Grateful For</label>
            <input
              type="text"
              placeholder="e.g. A warm cup of tea, a good conversation..."
              value={newGratitude}
              onChange={(e) => setNewGratitude(e.target.value)}
              className="w-full px-3.5 py-2 rounded-2xl bg-white border border-slate-300 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs flex items-center gap-2 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Save Journal Entry</span>
          </button>
        </form>
      </div>

      {/* Entry History */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Past Reflections</h3>

        <div className="space-y-3">
          {entries.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{item.mood}</span>
                <span className="text-[11px] text-slate-500 flex items-center gap-1 font-semibold">
                  <Calendar className="w-3 h-3 text-emerald-600" /> {item.date}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">{item.note}</p>
              {item.gratitude && (
                <p className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-2xl border border-emerald-200 font-semibold">
                  💚 <strong>Gratitude:</strong> {item.gratitude}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
