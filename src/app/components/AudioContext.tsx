import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useCosmic, BackgroundType } from '../context/CosmicContext';

interface AudioContextType {
  isMuted: boolean;
  isPlaying: boolean;
  toggleMute: () => void;
  currentBackground: BackgroundType;
  currentTrackName: string;
}

// Track paths - placeholders in public/audio folder
const tracks: Record<BackgroundType, string> = {
  none: '/audio/denis-pavlov-music-magical-technology-sci-fi-science-futuristic-game-music-300607.mp3',
  cosmic: '/audio/the_mountain-space-133254.mp3',
  bubble: '/audio/music_for_videos-relaxing-145038.mp3',
};

// Track display names
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
  const [isMuted, setIsMuted] = useState(true);
  const { backgroundType: currentBackground } = useCosmic();
  const soundRef = useRef<Howl | null>(null);

  const loadTrack = (backgroundType: BackgroundType) => {
    // Stop existing sound
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }

    const trackUrl = tracks[backgroundType];
    soundRef.current = new Howl({
      src: [trackUrl],
      loop: true,
      volume: isMuted ? 0 : 0.3,
      html5: true, // Enable HTML5 Audio for streaming
      onloaderror: (_id, error) => {
        console.warn(`Failed to load track for ${backgroundType}:`, error);
      },
    });

    if (!isMuted) {
      soundRef.current.play();
    }
  };

  // Load track when background changes and not muted
  useEffect(() => {
    loadTrack(currentBackground);
  }, [currentBackground]);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    if (soundRef.current) {
      if (newMutedState) {
        soundRef.current.fade(soundRef.current.volume(), 0, 300);
      } else {
        soundRef.current.volume(0.3);
        if (!soundRef.current.playing()) {
          soundRef.current.play();
        }
      }
    } else if (!newMutedState) {
      loadTrack(currentBackground);
    }
  };

  // Update volume when muted state changes
  useEffect(() => {
    if (soundRef.current) {
      if (isMuted) {
        soundRef.current.fade(soundRef.current.volume(), 0, 300);
      } else {
        soundRef.current.volume(0.3);
      }
    }
  }, [isMuted]);

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
        isPlaying: !isMuted, 
        toggleMute, 
        currentBackground,
        currentTrackName: trackNames[currentBackground]
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
