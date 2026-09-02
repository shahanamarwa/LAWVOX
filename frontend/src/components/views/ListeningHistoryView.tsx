'use client';

import React, { useState } from 'react';
import { LISTENING_HISTORY, EXTENDED_CASES } from '../../data/legalCorpusData';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { PrecedentCase } from '../../types/dashboard';
import {
  Headphones,
  Clock,
  Play,
  Pause,
  CheckCircle2,
  Trash2,
  TrendingUp,
  Activity,
  RotateCcw,
} from 'lucide-react';

interface ListeningHistoryViewProps {
  onSelectCase: (caseItem: PrecedentCase) => void;
}

export const ListeningHistoryView: React.FC<ListeningHistoryViewProps> = ({
  onSelectCase,
}) => {
  const { currentCase, isPlaying, playCase, togglePlay } = useAudioPlayer();
  const [historyList, setHistoryList] = useState(LISTENING_HISTORY);

  const handleResume = (caseId: string) => {
    const found = EXTENDED_CASES.find((c) => c.id === caseId);
    if (found) {
      if (currentCase?.id === found.id) {
        togglePlay();
      } else {
        playCase(found);
      }
    }
  };

  const handleClearHistory = () => {
    setHistoryList([]);
  };

  const completedCount = historyList.filter((h) => h.completed).length;

  return (
    <div className="flex-1 bg-slate-50/70 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] pb-28 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Headphones className="w-5 h-5 text-emerald-600" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                Listening History & Audio Timeline
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Track your constitutional research listening sessions, review finished oral digests, and pick up right where you paused.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClearHistory}
              className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-slate-600 hover:text-rose-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 flex items-center gap-3 shadow-2xs">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-700">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Total Time Listened</span>
              <h3 className="text-xl font-bold text-slate-900">18h 45m</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 flex items-center gap-3 shadow-2xs">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Completed Digests</span>
              <h3 className="text-xl font-bold text-slate-900">{completedCount} of {historyList.length}</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 flex items-center gap-3 shadow-2xs">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-700">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Daily Average</span>
              <h3 className="text-xl font-bold text-slate-900">42 minutes</h3>
            </div>
          </div>
        </div>

        {/* History Timeline */}
        {historyList.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <Activity className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Your listening history is empty</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Start listening to case briefs from the Dashboard or Search to populate your audio history timeline.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Recent Audio Sessions
            </h3>

            <div className="divide-y divide-slate-100">
              {historyList.map((entry) => {
                const isCurrentPlaying = currentCase?.id === entry.caseId && isPlaying;
                const matchedCase = EXTENDED_CASES.find((c) => c.id === entry.caseId);

                return (
                  <div
                    key={entry.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 p-2.5 rounded-xl transition-colors"
                  >
                    {/* Left details */}
                    <div className="space-y-1.5 flex-1 max-w-2xl">
                      <div className="flex items-center gap-2 text-xs flex-wrap">
                        <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {entry.court}
                        </span>
                        <span className="text-slate-500 font-mono text-[11px]">
                          {entry.citation}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.2 rounded">
                          {entry.doctrine}
                        </span>
                      </div>

                      <h4
                        onClick={() => matchedCase && onSelectCase(matchedCase)}
                        className="text-base font-bold text-slate-900 font-serif hover:text-blue-950 cursor-pointer"
                      >
                        {entry.caseName}
                      </h4>

                      <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                        <span className="text-slate-400 font-mono">{entry.listenedAt}</span>
                        <span>•</span>
                        <span>Duration: {entry.duration}</span>
                        <span>•</span>
                        {entry.completed ? (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Finished
                          </span>
                        ) : (
                          <span className="text-amber-700 font-semibold">
                            {entry.progressPercent}% Completed
                          </span>
                        )}
                      </div>

                      {/* Progress line */}
                      <div className="w-full max-w-md h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full ${
                            entry.completed
                              ? 'bg-emerald-500'
                              : 'bg-gradient-to-r from-blue-900 to-amber-500'
                          }`}
                          style={{ width: `${entry.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Right Play Controls */}
                    <div className="flex items-center gap-2 self-start md:self-center">
                      <button
                        type="button"
                        onClick={() => matchedCase && onSelectCase(matchedCase)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        Read Brief
                      </button>

                      <button
                        type="button"
                        onClick={() => handleResume(entry.caseId)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isCurrentPlaying
                            ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        {isCurrentPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-slate-950" />
                            <span>Pause</span>
                          </>
                        ) : entry.completed ? (
                          <>
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Replay</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>Resume</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
