'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/context/ToastContext';
import { useAudio } from '@/context/AudioContext';
import {
  Settings as SettingsIcon,
  Headphones,
  Bell,
  Globe,
  Sun,
  Shield,
  Save,
  Volume2,
  Lock,
  FileText,
  Info,
  CheckCircle2,
} from 'lucide-react';

export default function SettingsPage() {
  const { showToast } = useToast();
  const { playbackSpeed, setSpeed } = useAudio();

  // Settings State
  const [defaultSpeed, setDefaultSpeed] = useState(playbackSpeed.toString());
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [highQualityAudio, setHighQualityAudio] = useState(true);
  const [notifyNewCases, setNotifyNewCases] = useState(true);
  const [notifyReminders, setNotifyReminders] = useState(true);
  const [notifyRecommendations, setNotifyRecommendations] = useState(false);
  const [language, setLanguage] = useState('en');

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    setSpeed(parseFloat(defaultSpeed));
    showToast('Settings & Audio preferences saved', 'success');
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shadow-sm">
              <SettingsIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                Application Settings
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Configure playback parameters, notifications, and research preferences
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleSaveAll}
            leftIcon={<Save className="w-4 h-4" />}
            className="rounded-2xl px-5 font-bold shadow-md self-start sm:self-center"
          >
            Save Preferences
          </Button>
        </div>

        <form onSubmit={handleSaveAll} className="space-y-6">
          {/* 1. Audio Playback Preferences */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <Headphones className="w-5 h-5 text-purple-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  Audio Playback Preferences
                </h3>
                <p className="text-xs text-slate-500">Configure speech engine and chapter autoplay</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-900">Default Playback Speed</p>
                  <p className="text-xs text-slate-500">Set initial reading speed for judgment audio</p>
                </div>
                <select
                  value={defaultSpeed}
                  onChange={(e) => setDefaultSpeed(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:border-purple-500 focus:outline-none w-32"
                >
                  <option value="0.75">0.75x</option>
                  <option value="1">1.0x (Normal)</option>
                  <option value="1.25">1.25x (Fast)</option>
                  <option value="1.5">1.5x (Speed)</option>
                  <option value="1.75">1.75x</option>
                  <option value="2">2.0x (Double)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-900">Continuous Chapter Autoplay</p>
                  <p className="text-xs text-slate-500">Automatically start next chapter when current finishes</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoplayNext}
                  onChange={(e) => setAutoplayNext(e.target.checked)}
                  className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-900">High-Definition Legal Speech Engine</p>
                  <p className="text-xs text-slate-500">Stream lossless legal judicial audio</p>
                </div>
                <input
                  type="checkbox"
                  checked={highQualityAudio}
                  onChange={(e) => setHighQualityAudio(e.target.checked)}
                  className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 2. Notification Preferences */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <Bell className="w-5 h-5 text-purple-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  Notification Preferences
                </h3>
                <p className="text-xs text-slate-500">Manage case alerts and study reminders</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-900">New Constitutional Judgments Alert</p>
                  <p className="text-xs text-slate-500">Receive alerts when new Supreme Court bench audios are published</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyNewCases}
                  onChange={(e) => setNotifyNewCases(e.target.checked)}
                  className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-900">Daily Listening Goal Reminders</p>
                  <p className="text-xs text-slate-500">Get gentle daily research habit nudges</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyReminders}
                  onChange={(e) => setNotifyReminders(e.target.checked)}
                  className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-900">Weekly Precedent Digest</p>
                  <p className="text-xs text-slate-500">Curated recommendations tailored to your research areas</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyRecommendations}
                  onChange={(e) => setNotifyRecommendations(e.target.checked)}
                  className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 3. Language & Appearance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-bold text-slate-900 font-serif">Language</h3>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 focus:border-purple-500 focus:outline-none"
              >
                <option value="en">English (Official Court Language)</option>
                <option value="hi">Hindi (Bilingual Audio Preview)</option>
              </select>
            </div>

            {/* Appearance (Light Mode Only) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900 font-serif">Appearance Theme</h3>
              </div>
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                <span className="font-semibold">Light Mode Active</span>
                <Badge variant="gold" size="sm">Strict Requirement</Badge>
              </div>
              <p className="text-[11px] text-slate-400">
                LAWVOX uses a calibrated high-contrast light mode for optimal legal reading and document scanning.
              </p>
            </div>
          </div>

          {/* 4. About LAWVOX */}
          <div className="p-6 bg-slate-100/80 rounded-3xl border border-slate-200 space-y-3 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm font-serif">LAWVOX Platform</span>
              <span className="font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                v2.4 Pro Edition
              </span>
            </div>
            <p>
              LAWVOX is a constitutional precedent research and legal audio platform. Listen, understand, and remember landmark judicial rulings.
            </p>
            <div className="flex items-center gap-4 text-purple-700 font-semibold pt-1">
              <button type="button" onClick={() => showToast('Terms of Service: Standard Mock Document', 'info')} className="hover:underline">
                Terms of Service
              </button>
              <span>•</span>
              <button type="button" onClick={() => showToast('Privacy Policy: Standard Mock Document', 'info')} className="hover:underline">
                Privacy Policy
              </button>
              <span>•</span>
              <button type="button" onClick={() => showToast('Security: 256-Bit Encrypted Audio Stream', 'info')} className="hover:underline">
                Security
              </button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
