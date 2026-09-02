'use client';

import React, { useState, useEffect } from 'react';
import { LawvoxAPI } from '../../services/api';
import {
  Clock,
  BookOpen,
  Bookmark,
  TrendingUp,
  FileText,
  ShieldCheck,
  Building,
  Edit3,
  Sparkles,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'Advocate Aarav Sharma',
    profession: 'Constitutional Law Advocate & Researcher',
    barAffiliation: 'High Court & Supreme Court Bar Association',
    barNo: 'D/1482/2019',
    email: 'aarav.sharma@lawchambers.in',
  });

  const [stats, setStats] = useState({
    totalListening: '18h 45m',
    casesListened: 28,
    bookmarks: 36,
    dailyAverage: '42m',
    notesCreated: 14,
  });

  useEffect(() => {
    async function loadData() {
      const p = await LawvoxAPI.getProfile();
      if (p) {
        setProfile({
          name: p.name || 'Advocate Aarav Sharma',
          profession: p.profession || 'Constitutional Law Advocate & Researcher',
          barAffiliation: p.institution || 'Supreme Court Bar Association',
          barNo: 'D/1482/2019',
          email: p.email || 'aarav.sharma@lawchambers.in',
        });
      }
      const s = await LawvoxAPI.getDashboard();
      if (s?.data?.stats) {
        setStats(s.data.stats);
      }
    }
    loadData();
  }, []);


  const domains = [
    'Constitutional Precedents',
    'Basic Structure Doctrine',
    'Right to Privacy & Digital Laws',
    'Fundamental Rights Jurisprudence',
    'Judicial Review & Writs',
    'Administrative Law & Natural Justice',
  ];

  return (
    <div className="flex-1 bg-slate-50/70 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] pb-28 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Hero Header matching photo */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-900/90 border border-purple-400/40 text-amber-400 font-bold text-xl flex items-center justify-center shadow-lg">
                AS
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl font-bold font-serif">{profile.name}</h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Advocate
                  </span>
                </div>
                <p className="text-sm text-purple-200 mt-1">{profile.profession}</p>
                <div className="flex items-center gap-3 text-xs text-purple-300/80 mt-2 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-amber-400" />
                    {profile.barAffiliation}
                  </span>
                  <span>•</span>
                  <span>Bar No: {profile.barNo}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-sm"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Precedent Listening Statistics (5 Cards matching photo) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <h2 className="text-sm font-bold text-slate-900 font-serif">
              Precedent Listening Statistics
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-lg font-bold text-slate-900">{stats.totalListening}</div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5">Total Listening</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="text-lg font-bold text-slate-900">{stats.casesListened}</div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5">Cases Listened</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
                <Bookmark className="w-4 h-4" />
              </div>
              <div className="text-lg font-bold text-slate-900">{stats.bookmarks}</div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5">Bookmarked Cases</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-lg font-bold text-slate-900">{stats.dailyAverage}</div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5">Daily Average</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center mb-2">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-lg font-bold text-slate-900">{stats.notesCreated}</div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5">Notes Created</div>
            </div>
          </div>
        </div>

        {/* Bottom 2-Column Split: Domains + Chamber Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Research Domains */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-900 font-serif">
                Constitutional Research Domains
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Personalized topics curated for courtroom citations and academic papers
            </p>

            <div className="flex flex-wrap gap-2">
              {domains.map((d, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200/80"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Chamber & Credentials Information */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-900 font-serif">
                Chamber & Credentials Information
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Chamber Email</span>
                <span className="font-semibold text-slate-900 font-mono">{profile.email}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Bar Registration</span>
                <span className="font-semibold text-slate-900 font-mono">{profile.barNo}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-500 font-medium">Affiliated Bar</span>
                <span className="font-semibold text-slate-900 text-right">{profile.barAffiliation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
