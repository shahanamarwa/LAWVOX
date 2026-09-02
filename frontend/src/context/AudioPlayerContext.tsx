'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { PrecedentCase } from '../types/dashboard';
import { CONTINUE_LISTENING_CASE } from '../data/dashboardData';

interface AudioPlayerContextType {
  currentCase: PrecedentCase | null;
  isPlaying: boolean;
  currentTime: number; // in seconds
  duration: number; // in seconds
  playbackRate: number;
  volume: number;
  isMuted: boolean;
  isDockVisible: boolean;
  isExpanded: boolean;
  playCase: (caseItem: PrecedentCase) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  seek: (seconds: number) => void;
  skip: (seconds: number) => void;
  setRate: (rate: number) => void;
  setVol: (vol: number) => void;
  toggleMute: () => void;
  setDockVisible: (visible: boolean) => void;
  setIsExpanded: (expanded: boolean) => void;
  formatTime: (seconds: number) => string;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentCase, setCurrentCase] = useState<PrecedentCase | null>(
    CONTINUE_LISTENING_CASE
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(525); // 08:45 in seconds
  const [duration, setDuration] = useState(810); // 13:30 in seconds
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isDockVisible, setIsDockVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Helper to parse duration string like "13:30" into seconds
  const parseTimeString = (timeStr?: string): number => {
    if (!timeStr) return 600;
    const parts = timeStr.split(':').map(Number);
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return 600;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // Subtle acoustic audio tone synthesis for legal audio feel
  const playSubtleTone = () => {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.04 * (isMuted ? 0 : volume), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // AudioContext not allowed without user interaction or not supported
    }
  };

  // Stop current speech
  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Speak narration
  const startSpeech = useCallback(
    (textToSpeak: string, startOffsetPercent: number = 0) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;

      window.speechSynthesis.cancel();

      // If user is halfway through, slice narration text proportionally
      const words = textToSpeak.split(' ');
      const startWordIndex = Math.floor(words.length * startOffsetPercent);
      const remainingText = words.slice(startWordIndex).join(' ');

      const utterance = new SpeechSynthesisUtterance(remainingText || textToSpeak);
      utterance.rate = playbackRate;
      utterance.volume = isMuted ? 0 : volume;
      utterance.pitch = 1.0;

      // Select a clear voice if available
      const voices = window.speechSynthesis.getVoices();
      const englishVoice =
        voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') ||
              v.name.includes('Google') ||
              v.name.includes('Premium') ||
              v.name.includes('Enhanced') ||
              v.name.includes('David') ||
              v.name.includes('Zira'))
        ) || voices.find((v) => v.lang.startsWith('en'));

      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onend = () => {
        setIsPlaying(false);
        if (timerRef.current) clearInterval(timerRef.current);
      };

      utterance.onerror = () => {
        // Fallback gracefully
        setIsPlaying(false);
        if (timerRef.current) clearInterval(timerRef.current);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [playbackRate, volume, isMuted]
  );

  // Play a specific case
  const playCase = useCallback(
    (caseItem: PrecedentCase) => {
      playSubtleTone();
      setCurrentCase(caseItem);
      setIsDockVisible(true);

      const totalSecs = parseTimeString(caseItem.duration);
      setDuration(totalSecs);

      let initialTime = 0;
      if (caseItem.currentTime) {
        initialTime = parseTimeString(caseItem.currentTime);
      }
      setCurrentTime(initialTime);
      setIsPlaying(true);

      const narration =
        caseItem.audioNarrationText ||
        `${caseItem.name}. ${caseItem.court}. Year ${caseItem.year}. ${
          caseItem.summary || ''
        }. Ratio Decidendi: ${caseItem.ratioDecidendi || ''}`;

      const offsetPct = totalSecs > 0 ? initialTime / totalSecs : 0;
      startSpeech(narration, offsetPct);
    },
    [startSpeech]
  );

  const pause = useCallback(() => {
    setIsPlaying(false);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    if (!currentCase) return;
    playSubtleTone();
    setIsPlaying(true);

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        const narration =
          currentCase.audioNarrationText ||
          `${currentCase.name}. ${currentCase.summary || ''}`;
        const offsetPct = duration > 0 ? currentTime / duration : 0;
        startSpeech(narration, offsetPct);
      }
    }
  }, [currentCase, currentTime, duration, startSpeech]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      if (currentCase) {
        resume();
      } else {
        playCase(CONTINUE_LISTENING_CASE);
      }
    }
  }, [isPlaying, pause, resume, currentCase, playCase]);

  const seek = useCallback(
    (seconds: number) => {
      const clamped = Math.max(0, Math.min(seconds, duration));
      setCurrentTime(clamped);
      if (currentCase && isPlaying) {
        const narration =
          currentCase.audioNarrationText ||
          `${currentCase.name}. ${currentCase.summary || ''}`;
        const offsetPct = duration > 0 ? clamped / duration : 0;
        startSpeech(narration, offsetPct);
      }
    },
    [duration, currentCase, isPlaying, startSpeech]
  );

  const skip = useCallback(
    (seconds: number) => {
      seek(currentTime + seconds);
    },
    [currentTime, seek]
  );

  const setRate = useCallback(
    (rate: number) => {
      setPlaybackRate(rate);
      if (isPlaying && currentCase) {
        const narration =
          currentCase.audioNarrationText ||
          `${currentCase.name}. ${currentCase.summary || ''}`;
        const offsetPct = duration > 0 ? currentTime / duration : 0;
        startSpeech(narration, offsetPct);
      }
    },
    [isPlaying, currentCase, duration, currentTime, startSpeech]
  );

  const setVol = useCallback((vol: number) => {
    setVolume(vol);
    setIsMuted(vol === 0);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Timer ticker while playing
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return duration;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, duration, playbackRate]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [stopSpeech]);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentCase,
        isPlaying,
        currentTime,
        duration,
        playbackRate,
        volume,
        isMuted,
        isDockVisible,
        isExpanded,
        playCase,
        togglePlay,
        pause,
        resume,
        seek,
        skip,
        setRate,
        setVol,
        toggleMute,
        setDockVisible: setIsDockVisible,
        setIsExpanded,
        formatTime,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
