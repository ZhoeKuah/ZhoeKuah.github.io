import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';
import { useCosmic, BackgroundType } from '../context/CosmicContext';

interface AudioContextType {
  isMuted: boolean;
  isPlaying: boolean;
  toggleMute: () => void;
  currentBackground: BackgroundType;
  currentTrackName: string;
  volume: number;
  setVolume: (volume: number) => void;
}

const tracks: Record<BackgroundType, string> = {
  none: '/audio/denis-pavlov-music-magical-technology-sci-fi-science-futuristic-game-music-300607.mp3',
  cosmic: '/audio/the_mountain-space-133254.mp3',
  bubble: '/audio/music_for_videos-relaxing-145038.mp3',
};

const trackNames: Record<BackgroundType, string> = {
  none: 'Tech Ambient',
  cosmic: 'Mountain Space',
  bubble: 'Relaxing Bubbles',
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const { backgroundType: currentBackground } = useCosmic();
  const soundRef = useRef<Howl | null>(null);
  const isInitialMount = useRef(true);
  
  // Use ref to track mute state for spam-proof toggle
  const isMutedRef = useRef(false);
  const isTogglingRef = useRef(false);

  const loadAndPlayTrack = useCallback((backgroundType: BackgroundType, shouldPlay: boolean) => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }

    const trackUrl = tracks[backgroundType];
    console.log(`Loading track: ${trackUrl}, shouldPlay: ${shouldPlay}`);
    
    soundRef.current = new Howl({
      src: [trackUrl],
      loop: true,
      volume: volume,
      html5: true,
      onload: () => {
        console.log('Track loaded successfully');
        setIsLoaded(true);
        if (shouldPlay) {
          soundRef.current?.play();
          console.log('Playing track');
        }
      },
      onloaderror: (_id, error) => {
        console.warn(`Failed to load track for ${backgroundType}:`, error);
      },
      onplayerror: (_id, error) => {
        console.warn(`Failed to play track:`, error);
        if (soundRef.current) {
          soundRef.current.load();
          soundRef.current.play();
        }
      },
    });

    if (soundRef.current.state() === 'loaded') {
      setIsLoaded(true);
      if (shouldPlay) {
        soundRef.current.play();
      }
    }
  }, [volume]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      loadAndPlayTrack(currentBackground, !isMuted);
      return;
    }
    
    loadAndPlayTrack(currentBackground, !isMuted);
  }, [currentBackground, loadAndPlayTrack, isMuted]);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    if (soundRef.current) {
      soundRef.current.volume(newVolume);
    }
  }, []);

  const toggleMute = useCallback(() => {
    // Spam proof: prevent rapid clicking
    if (isTogglingRef.current) return;
    isTogglingRef.current = true;
    
    // Use ref for current mute state
    const newMutedState = !isMutedRef.current;
    isMutedRef.current = newMutedState;
    setIsMuted(newMutedState);
    console.log(`Toggled mute: ${newMutedState}`);

    if (soundRef.current) {
      if (newMutedState) {
        soundRef.current.fade(soundRef.current.volume(), 0, 300);
        setTimeout(() => {
          if (soundRef.current) {
            soundRef.current.pause();
          }
        }, 300);
      } else {
        soundRef.current.volume(volume);
        if (!soundRef.current.playing()) {
          soundRef.current.play();
          console.log('Resumed playing');
        }
      }
    } else {
      loadAndPlayTrack(currentBackground, !newMutedState);
    }

    // Reset spam guard after animation
    setTimeout(() => {
      isTogglingRef.current = false;
    }, 350);
  }, [currentBackground, loadAndPlayTrack, volume]);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
    };
  }, []);

  return (
    <AudioContext.Provider 
      value={{ 
        isMuted, 
        isPlaying: !isMuted && isLoaded, 
        toggleMute, 
        currentBackground,
        currentTrackName: trackNames[currentBackground],
        volume,
        setVolume
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
