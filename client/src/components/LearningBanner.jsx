import React from 'react';
import { UserPlus, KeyRound, Lock, ArrowRight } from 'lucide-react';

export default function LearningBanner() {
  const steps = [
    {
      num: '1',
      title: '1. User Registration',
      desc: 'Client sends raw credentials over HTTPS. Backend hashes password using bcrypt before saving to PostgreSQL database.',
      icon: <UserPlus className="w-5 h-5 text-indigo-400" />,
      highlight: 'bcrypt'
    },
    {
      num: '2',
      title: '2. User Login',
      desc: 'Backend verifies password hash. If valid, it signs and issues a JSON Web Token (JWT) with user claims to the client.',
      icon: <KeyRound className="w-5 h-5 text-cyan-400" />,
      highlight: 'JSON Web Token (JWT)'
    },
    {
      num: '3',
      title: '3. Token Storage & Requests',
      desc: 'Client saves JWT in localStorage. For protected API routes, client attaches Authorization: Bearer <token> header.',
      icon: <Lock className="w-5 h-5 text-emerald-400" />,
      highlight: 'Authorization: Bearer'
    }
  ];

  return (
    <section className="p-5 rounded-2xl glass-card border border-indigo-500/20 shadow-xl bg-gradient-to-r from-slate-900/90 via-indigo-950/20 to-slate-900/90">
      <div className="flex items-center gap-2 mb-4">
        <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          LEARNING MODE
        </span>
        <h3 className="text-sm font-semibold text-slate-200">
          How Authentication Works (Client &lt;&mdash;&gt; Server)
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="group relative p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/80">
                    {step.icon}
                  </div>
                  <h4 className="text-sm font-bold text-slate-100">{step.title}</h4>
                </div>
                <span className="text-xs font-mono font-bold text-slate-600 group-hover:text-cyan-400 transition-colors">
                  #{step.num}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
            {idx < 2 && (
              <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-slate-900 text-slate-600 border border-slate-800">
                <ArrowRight className="w-3 h-3" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
