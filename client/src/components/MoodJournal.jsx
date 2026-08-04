import React, { useState } from 'react';
import { BookOpen, Plus, Heart, Sparkles, Calendar, Smile, Send } from 'lucide-react';

export default function MoodJournal({ user }) {
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
    <div className="space-y-8 max-w-4xl mx-auto w-full pb-12">
      {/* Header */}
      <div className="premium-card p-6 sm:p-8 rounded-3xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-teal-950 flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            Mindfulness Mood Journal
          </h2>
          <p className="text-xs text-teal-700 mt-1">Reflect on thoughts, track emotional trends, and capture moments of gratitude</p>
        </div>
      </div>

      {/* New Journal Entry Card */}
      <div className="premium-card p-6 sm:p-8 rounded-3xl space-y-6">
        <h3 className="text-sm font-extrabold text-teal-950 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Log Today's Reflection
        </h3>

        <form onSubmit={handleAddEntry} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-teal-950 mb-2">Select Current Mood</label>
            <div className="flex flex-wrap gap-2">
              {['Peaceful 🌿', 'Calm 😊', 'Reflective 🌊', 'Hopeful ✨', 'Anxious 😔'].map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setNewMood(m)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    newMood === m
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                      : 'bg-white text-teal-950 border-teal-200 hover:bg-teal-50/50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-teal-950 mb-1.5">Daily Reflection / Journal Notes</label>
            <textarea
              rows={3}
              required
              placeholder="How did you feel today? What thoughts were on your mind?"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-teal-200 text-xs font-semibold text-teal-950 placeholder-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-teal-950 mb-1.5">One Thing You Are Grateful For</label>
            <input
              type="text"
              placeholder="e.g. A warm cup of tea, a good conversation..."
              value={newGratitude}
              onChange={(e) => setNewGratitude(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-teal-200 text-xs font-semibold text-teal-950 placeholder-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs transition-all cursor-pointer shadow-md shadow-emerald-600/20 flex items-center gap-2 active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Save Journal Entry</span>
          </button>
        </form>
      </div>

      {/* Entry History */}
      <div className="space-y-4">
        <h3 className="text-xs font-extrabold text-teal-950 uppercase tracking-wider">Past Reflections</h3>

        <div className="space-y-4">
          {entries.map((item) => (
            <div key={item.id} className="premium-card p-6 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-teal-950">{item.mood}</span>
                <span className="text-xs font-bold text-teal-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" /> {item.date}
                </span>
              </div>
              <p className="text-xs text-teal-950 leading-relaxed font-medium">{item.note}</p>
              {item.gratitude && (
                <div className="text-xs text-emerald-900 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200 font-semibold">
                  💚 <strong>Gratitude:</strong> {item.gratitude}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
