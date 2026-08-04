import React, { useEffect, useState } from 'react';

export default function Dashboard({ token, onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok && data.user) {
          setUser(data.user);
        } else {
          setError(data.message || 'Failed to authenticate user.');
        }
      } catch (err) {
        setError('Error connecting to backend.');
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchMe();
  }, [token]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-md mx-auto text-center space-y-4">
      <h2 className="text-2xl font-bold text-white">Protected Dashboard</h2>

      {loading ? (
        <p className="text-sm text-slate-400">Loading user profile...</p>
      ) : error ? (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
          {error}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2 text-sm text-slate-300">
          <p><strong className="text-slate-400">ID:</strong> {user?.id}</p>
          <p><strong className="text-slate-400">Name:</strong> {user?.name}</p>
          <p><strong className="text-slate-400">Email:</strong> {user?.email}</p>
        </div>
      )}

      <button
        onClick={onLogout}
        className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors mt-4"
      >
        Sign Out
      </button>
    </div>
  );
}
