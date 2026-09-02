'use client';

import React, { useState, useEffect } from 'react';
import { LawvoxAPI } from '../../services/api';
import { Settings, Check, Save } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [settings, setSettings] = useState({
    notification_enabled: true,
    autoplay_enabled: true,
    playback_speed: 1.0,
    language: 'English',
    appearance: 'light',
  });
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const data = await LawvoxAPI.getSettings();
      if (data) {
        setSettings(data);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async () => {
    await LawvoxAPI.updateSettings(settings);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div className="flex-1 bg-slate-50/70 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] pb-28 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                <Settings className="w-5 h-5 text-purple-600" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                Platform Preferences & Settings
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Configure audio narration speeds, notification triggers, and courtroom citation formats.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            {savedMessage ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            {savedMessage ? 'Saved Successfully!' : 'Save Settings'}
          </button>
        </div>

        {/* Settings Cards */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          {/* Playback Speed */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Default Audio Playback Speed</h3>
              <p className="text-xs text-slate-500 mt-0.5">Speed for constitutional judgment narrations</p>
            </div>
            <div className="flex items-center gap-2">
              {[0.75, 1.0, 1.25, 1.5, 2.0].map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => setSettings({ ...settings, playback_speed: speed })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    settings.playback_speed === speed
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Autoplay Next Chapter */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Continuous Judgment Audio</h3>
              <p className="text-xs text-slate-500 mt-0.5">Automatically stream next ratio decidendi chapter</p>
            </div>
            <input
              type="checkbox"
              checked={settings.autoplay_enabled}
              onChange={(e) => setSettings({ ...settings, autoplay_enabled: e.target.checked })}
              className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
            />
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Precedent Digest Notifications</h3>
              <p className="text-xs text-slate-500 mt-0.5">Daily Supreme Court constitutional bench updates</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notification_enabled}
              onChange={(e) => setSettings({ ...settings, notification_enabled: e.target.checked })}
              className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
            />
          </div>

          {/* Language Selection */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Narration Language</h3>
              <p className="text-xs text-slate-500 mt-0.5">Primary language for audio summaries</p>
            </div>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-white"
            >
              <option value="English">English (Official SC)</option>
              <option value="Hindi">Hindi (अनुवाद)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
