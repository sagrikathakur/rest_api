import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Calendar, Clock, ArrowLeft, CheckCircle2, MapPin, DollarSign, Award, Info } from 'lucide-react';
import { doctors, assets } from '../assets/assets_frontend/assets';

export default function AppointmentPage({ user }) {
  const { docId } = useParams();
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Fetch Doctor info based on docId
  useEffect(() => {
    const doc = doctors.find((d) => d._id === docId) || doctors[0];
    setDocInfo(doc);
  }, [docId]);

  // Generate Available Time Slots for next 7 days
  useEffect(() => {
    if (!docInfo) return;

    let today = new Date();
    let timeSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let daySlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        daySlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      timeSlots.push(daySlots);
    }

    setDocSlots(timeSlots);
  }, [docInfo]);

  if (!docInfo) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-slate-500 font-bold">
        Loading doctor details...
      </div>
    );
  }

  // Related Doctors with same speciality
  const relatedDoctors = doctors.filter((d) => d.speciality === docInfo.speciality && d._id !== docInfo._id);

  const handleBookAppointment = () => {
    if (!slotTime) {
      alert('Please select a time slot for your appointment.');
      return;
    }
    setBookingSuccess(true);
  };

  return (
    <div className="max-w-6xl mx-auto w-full py-8 px-4 sm:px-8 space-y-10 pb-24">

      {/* Back Button */}
      <button
        onClick={() => navigate('/therapists')}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-600 hover:text-[#5F6FFF] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Doctors</span>
      </button>

      {/* SUCCESS BOOKING CONFIRMATION TOAST */}
      {bookingSuccess && (
        <div className="bg-[#f0f2ff] border-2 border-[#5F6FFF] rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-900">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-[#5F6FFF] shrink-0" />
            <div>
              <h3 className="text-base font-black">Appointment Successfully Booked!</h3>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-0.5">
                Session with <strong>{docInfo.name}</strong> confirmed for {docSlots[slotIndex]?.[0]?.datetime.toDateString()} at {slotTime}.
              </p>
            </div>
          </div>
          <button
            onClick={() => setBookingSuccess(false)}
            className="px-6 py-2.5 rounded-xl bg-[#5F6FFF] hover:bg-[#4d5ceb] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md shrink-0 cursor-pointer"
          >
            Done
          </button>
        </div>
      )}

      {/* DOCTOR DETAILS MAIN CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs flex flex-col sm:flex-row gap-8 items-start">
        
        {/* Doctor Image Container (#5F6FFF Background) */}
        <div className="w-full sm:w-80 bg-[#5F6FFF] rounded-3xl overflow-hidden p-4 shrink-0 flex items-center justify-center border border-[#5F6FFF] shadow-md">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full h-72 sm:h-80 object-cover object-top rounded-2xl drop-shadow-xl"
          />
        </div>

        {/* Doctor Information */}
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900">{docInfo.name}</h1>
              <img src={assets.verified_icon} alt="Verified" className="w-6 h-6 shrink-0" title="Verified Specialist" />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold text-slate-600">
              <span>{docInfo.degree} - {docInfo.speciality}</span>
              <span className="px-3 py-1 rounded-full bg-[#f0f2ff] text-[#5F6FFF] border border-[#c6cdff] text-xs font-extrabold">
                {docInfo.experience} Experience
              </span>
            </div>
          </div>

          {/* About Bio */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-sm font-black text-slate-900">
              <span>About</span>
              <img src={assets.info_icon} alt="Info" className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
              {docInfo.about}
            </p>
          </div>

          {/* Fees & Address */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Appointment fee</p>
              <p className="text-2xl font-black text-slate-900">${docInfo.fees} <span className="text-xs text-slate-500 font-semibold">/ Session</span></p>
            </div>

            {docInfo.address && (
              <div className="text-right text-xs sm:text-sm font-semibold text-slate-600">
                <p className="font-bold text-slate-900 flex items-center gap-1.5 justify-end"><MapPin className="w-4 h-4 text-[#5F6FFF]" /> Clinic Address</p>
                <p>{docInfo.address.line1}</p>
                <p>{docInfo.address.line2}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOOKING SLOTS PICKER */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#5F6FFF]" />
          Booking slots
        </h2>

        {/* Days Selector Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime('');
                }}
                className={`flex flex-col items-center justify-center p-4 min-w-[5rem] rounded-2xl border text-center cursor-pointer transition-all ${
                  slotIndex === index
                    ? 'bg-[#5F6FFF] text-white border-[#5F6FFF] shadow-lg scale-105'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-[#f0f2ff]'
                }`}
              >
                <p className="text-xs font-black">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p className="text-lg font-black mt-0.5">{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        {/* Time Slots Grid */}
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#5F6FFF]" /> Available Time Slots:
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {docSlots.length > 0 &&
              docSlots[slotIndex]?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold border transition-all cursor-pointer ${
                    item.time === slotTime
                      ? 'bg-[#5F6FFF] text-white border-[#5F6FFF] shadow-md'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-[#5F6FFF] hover:bg-[#f0f2ff]'
                  }`}
                >
                  {item.time.toLowerCase()}
                </button>
              ))}
          </div>
        </div>

        {/* Book Button */}
        <div className="pt-4">
          <button
            onClick={handleBookAppointment}
            className="px-10 py-4 rounded-full bg-[#5F6FFF] hover:bg-[#4d5ceb] text-white font-black text-xs sm:text-sm transition-all shadow-xl hover:shadow-2xl cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
          >
            Book an appointment
          </button>
        </div>
      </div>

      {/* RELATED DOCTORS SECTION */}
      {relatedDoctors.length > 0 && (
        <div className="space-y-8 pt-4">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Related Doctors</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Simply browse through our extensive list of trusted doctors.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedDoctors.slice(0, 4).map((doc) => (
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
        </div>
      )}

    </div>
  );
}
