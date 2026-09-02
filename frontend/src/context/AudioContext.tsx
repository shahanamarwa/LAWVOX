'use client';

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { LegalCase, Chapter } from '@/types';
import { mockCases } from '@/data/cases';

interface AudioContextType {
  currentCase: LegalCase | null;
  currentChapter: Chapter | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
  showPlayer: boolean;
  bookmarkedCaseIds: string[];
  selectedCaseForModal: LegalCase | null;
  currentSpokenText: string;
  useVoiceSynthesis: boolean;
  toggleVoiceSynthesis: () => void;
  playCase: (caseItem: LegalCase, startTimestamp?: number, chapter?: Chapter) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  seek: (timeInSeconds: number) => void;
  seekRelative: (deltaSeconds: number) => void;
  setSpeed: (speed: number) => void;
  setVol: (volume: number) => void;
  toggleMute: () => void;
  playChapter: (chapter: Chapter) => void;
  closePlayer: () => void;
  toggleBookmark: (caseId: string) => boolean;
  isBookmarked: (caseId: string) => boolean;
  openCaseModal: (caseItem: LegalCase) => void;
  closeCaseModal: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to Kesavananda Bharati
  const defaultCase = mockCases[0];
  const [currentCase, setCurrentCase] = useState<LegalCase | null>(defaultCase);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(defaultCase.chapters[0] || null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(defaultCase.durationSeconds || 810);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(0.9);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPlayer, setShowPlayer] = useState<boolean>(true);
  const [useVoiceSynthesis, setUseVoiceSynthesis] = useState<boolean>(false);
  
  // Bookmarks state
  const [bookmarkedCaseIds, setBookmarkedCaseIds] = useState<string[]>(() => {
    return mockCases.filter(c => c.isBookmarked).map(c => c.id);
  });

  // Modal details state
  const [selectedCaseForModal, setSelectedCaseForModal] = useState<LegalCase | null>(null);

  // Hidden HTML5 Audio Element Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Current spoken text
  const currentSpokenText = currentChapter?.spokenScript || currentCase?.spokenScript || currentCase?.summary || '';

  // Function to trigger speech synthesis when enabled
  const speakText = (text: string, rate: number = 1.0) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.volume = isMuted ? 0 : volume;
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis event:', e);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio();
      audio.preload = 'metadata';
      audioRef.current = audio;

      const handleTimeUpdate = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          
          // Auto-advance chapter based on timestamps
          if (currentCase && currentCase.chapters && currentCase.chapters.length > 0) {
            const currentT = audioRef.current.currentTime;
            for (let i = currentCase.chapters.length - 1; i >= 0; i--) {
              if (currentT >= currentCase.chapters[i].timestamp) {
                if (currentChapter?.id !== currentCase.chapters[i].id) {
                  setCurrentChapter(currentCase.chapters[i]);
                }
                break;
              }
            }
          }
        }
      };

      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration || 810);
          setIsLoading(false);
          setError(null);
        }
      };

      const handleWaiting = () => {
        setIsLoading(true);
      };

      const handlePlaying = () => {
        setIsLoading(false);
        setIsPlaying(true);
        setError(null);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      const handleError = () => {
        setIsLoading(false);
        setIsPlaying(false);
        setError(null);
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('waiting', handleWaiting);
      audio.addEventListener('playing', handlePlaying);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      // Load initial audio src
      if (defaultCase.audioSrc) {
        audio.src = defaultCase.audioSrc;
      }

      return () => {
        audio.pause();
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('waiting', handleWaiting);
        audio.removeEventListener('playing', handlePlaying);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };
    }
  }, []);

  const playCase = (caseItem: LegalCase, startTimestamp?: number, chapter?: Chapter) => {
    setError(null);
    setCurrentCase(caseItem);
    setShowPlayer(true);
    
    const targetChapter = chapter || (caseItem.chapters && caseItem.chapters[0]) || null;
    setCurrentChapter(targetChapter);

    if (useVoiceSynthesis) {
      const textToSpeak = targetChapter?.spokenScript || caseItem.spokenScript || caseItem.summary;
      speakText(textToSpeak, playbackSpeed);
      setIsPlaying(true);
      return;
    }

    if (audioRef.current) {
      const isNewSrc = audioRef.current.src !== window.location.origin + caseItem.audioSrc && !audioRef.current.src.endsWith(caseItem.audioSrc);
      
      if (isNewSrc) {
        setIsLoading(true);
        audioRef.current.src = caseItem.audioSrc;
        audioRef.current.load();
      }

      const seekTime = startTimestamp !== undefined ? startTimestamp : (targetChapter ? targetChapter.timestamp : 0);
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current.volume = isMuted ? 0 : volume;

      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch((err) => {
        console.warn('Autoplay notice:', err);
        setIsPlaying(false);
        setIsLoading(false);
      });
    }
  };

  const togglePlay = () => {
    if (!currentCase) return;

    if (useVoiceSynthesis) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (isPlaying) {
          window.speechSynthesis.pause();
          setIsPlaying(false);
        } else {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            setIsPlaying(true);
          } else {
            const textToSpeak = currentChapter?.spokenScript || currentCase.spokenScript || currentCase.summary;
            speakText(textToSpeak, playbackSpeed);
            setIsPlaying(true);
          }
        }
      }
      return;
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      setError(null);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch((err) => {
        console.warn('Play notice:', err);
        setIsLoading(false);
        setIsPlaying(false);
      });
    }
  };

  const pause = () => {
    if (useVoiceSynthesis && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const resume = () => {
    if (useVoiceSynthesis && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      return;
    }
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.warn);
    }
  };

  const seek = (timeInSeconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, timeInSeconds));
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const seekRelative = (deltaSeconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + deltaSeconds));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const setSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
    if (useVoiceSynthesis && isPlaying) {
      const textToSpeak = currentChapter?.spokenScript || currentCase?.spokenScript || currentCase?.summary || '';
      speakText(textToSpeak, speed);
    }
  };

  const setVol = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolume(clamped);
    if (clamped > 0) setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const playChapter = (chapter: Chapter) => {
    if (!currentCase) return;
    setCurrentChapter(chapter);
    
    if (useVoiceSynthesis) {
      speakText(chapter.spokenScript || chapter.title, playbackSpeed);
      setIsPlaying(true);
      return;
    }

    seek(chapter.timestamp);
    if (!isPlaying) {
      resume();
    }
  };

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setShowPlayer(false);
  };

  const toggleBookmark = (caseId: string) => {
    let nowBookmarked = false;
    setBookmarkedCaseIds(prev => {
      if (prev.includes(caseId)) {
        nowBookmarked = false;
        return prev.filter(id => id !== caseId);
      } else {
        nowBookmarked = true;
        return [...prev, caseId];
      }
    });
    return nowBookmarked;
  };

  const isBookmarked = (caseId: string) => {
    return bookmarkedCaseIds.includes(caseId);
  };

  const openCaseModal = (caseItem: LegalCase) => {
    setSelectedCaseForModal(caseItem);
  };

  const closeCaseModal = () => {
    setSelectedCaseForModal(null);
  };

  const toggleVoiceSynthesis = () => {
    setUseVoiceSynthesis(prev => {
      const nextVal = !prev;
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      return nextVal;
    });
  };

  return (
    <AudioContext.Provider
      value={{
        currentCase,
        currentChapter,
        isPlaying,
        currentTime,
        duration,
        playbackSpeed,
        volume,
        isMuted,
        isLoading,
        error,
        showPlayer,
        bookmarkedCaseIds,
        selectedCaseForModal,
        currentSpokenText,
        useVoiceSynthesis,
        toggleVoiceSynthesis,
        playCase,
        togglePlay,
        pause,
        resume,
        seek,
        seekRelative,
        setSpeed,
        setVol,
        toggleMute,
        playChapter,
        closePlayer,
        toggleBookmark,
        isBookmarked,
        openCaseModal,
        closeCaseModal,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
