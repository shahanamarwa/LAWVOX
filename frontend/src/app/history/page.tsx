'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAudio } from '@/context/AudioContext';
import { useToast } from '@/context/ToastContext';
import { mockCases } from '@/data/cases';
import { mockListeningHistory } from '@/data/dashboard';
import {
  History,
  Play,
  Clock,
  RotateCcw,
  CheckCircle2,
  Trash2,
  Headphones,
  Calendar,
  Sparkles,
} from 'lucide-react';

export default function HistoryPage() {
  const { playCase } = useAudio();
  const { showToast } = useToast();
  const [historyList, setHistoryList] = useState(mockListeningHistory);

  const handlePlayAgain = (item: typeof mockListeningHistory[0]) => {
    const matched = mockCases.find((c) => c.id === item.caseId) || mockCases[0];
    playCase(matched);
    showToast(`Resuming: ${item.caseTitle}`, 'info');
  };

  const handleClearHistory = () => {
    setHistoryList([]);
    showToast('Listening history cleared', 'info');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shadow-sm">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                Listening History & Logs
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Track your precedent listening sessions, revision progress, and playback timestamps
              </p>
            </div>
          </div>

          {historyList.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors self-start sm:self-center"
            >
              <Trash2 className="w-4 h-4" />
              Clear History
            </button>
          )}
        </div>

        {/* History List */}
        {historyList.length > 0 ? (
          <div className="space-y-3.5">
            {historyList.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 hover:border-purple-300 shadow-soft-sm hover:shadow-soft transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Case details */}
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                    <Headphones className="w-6 h-6" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <Badge variant="purple" size="sm">
                        {item.contentType}
                      </Badge>
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {item.listenedDate}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 font-serif truncate">
                      {item.caseTitle}
                    </h4>

                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {item.court} • {item.citation}
                    </p>

                    {/* Progress Bar & Durations */}
                    <div className="flex items-center gap-3 mt-3 max-w-md">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-purple-700 whitespace-nowrap">
                        {item.progress}% completed ({item.durationListened} / {item.totalDuration})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handlePlayAgain(item)}
                    leftIcon={<Play className="w-3.5 h-3.5 ml-0.5" />}
                    className="rounded-xl shadow-sm font-bold"
                  >
                    Play Again
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-soft max-w-md mx-auto space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
              <History className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-serif">
              No listening history yet
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              As you listen to constitutional precedents and oral judgments, your session logs and timestamps will appear here.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
