import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Search, Star, Calendar, Video, ShieldCheck } from 'lucide-react';
import { doctors, specialityData, assets } from '../assets/assets_frontend/assets';

export default function TherapistsPage({ user }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('All');

  const filtered = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.degree.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpec = selectedSpeciality === 'All' || doc.speciality === selectedSpeciality;
    return matchesSearch && matchesSpec;
  });

  return (
    <div className="space-y-10 max-w-6xl mx-auto w-full py-8 px-4 sm:px-8 pb-24">

      {/* Header Bar */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
            <Heart className="w-7 h-7 text-[#5F6FFF]" />
            Find Certified Doctors & Care Specialists
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">Book confidential 1-on-1 sessions with verified medical experts</p>
        </div>
      </div>

      {/* Specialty Filter Grid with Icons */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Find by Speciality</h3>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedSpeciality('All')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shrink-0 cursor-pointer ${
              selectedSpeciality === 'All'
                ? 'bg-[#5F6FFF] text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-[#f0f2ff]'
            }`}
          >
            All Specialities
          </button>
          {specialityData.map((item) => (
            <button
              key={item.speciality}
              onClick={() => setSelectedSpeciality(item.speciality)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shrink-0 cursor-pointer ${
                selectedSpeciality === item.speciality
                  ? 'bg-[#5F6FFF] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-[#f0f2ff]'
              }`}
            >
              <img src={item.image} alt={item.speciality} className="w-6 h-6 object-contain" />
              <span>{item.speciality}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
        <input
          type="text"
          placeholder="Search by doctor name or specialty (e.g. Dr. Richard, General physician, Dermatologist)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5F6FFF] shadow-xs"
        />
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-3 bg-white p-12 rounded-3xl border border-slate-200 text-center text-xs sm:text-sm text-slate-500 font-bold">
            No doctors found matching your search criteria.
          </div>
        ) : (
          filtered.map((doc) => (
            <div
              key={doc._id}
              onClick={() => {
                navigate(`/appointment/${doc._id}`);
                window.scrollTo(0, 0);
              }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#5F6FFF] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Doctor Image Container */}
                <div className="bg-[#f0f2ff] overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-52 object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Doctor Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f2ff] text-[#5F6FFF] text-xs font-extrabold border border-[#c6cdff]">
                      <span className="w-2 h-2 rounded-full bg-[#5F6FFF] animate-ping" />
                      Available Today
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-900">${doc.fees} / Session</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#5F6FFF] transition-colors">{doc.name}</h3>
                      <img src={assets.verified_icon} alt="Verified" className="w-4 h-4 shrink-0" title="Verified Specialist" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">{doc.speciality} • {doc.degree}</p>
                    <p className="text-xs text-[#5F6FFF] font-extrabold mt-0.5">{doc.experience} Experience</p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                    {doc.about}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">100% Confidential</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/appointment/${doc._id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#5F6FFF] hover:bg-[#4d5ceb] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
