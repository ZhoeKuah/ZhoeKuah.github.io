import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';

interface AudioContextType {
  isMuted: boolean;
  isPlaying: boolean;
  toggleMute: () => void;
  changeTrack: (trackName: string) => void;
}

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

// Spotify playlist URL - Lo-fi/Chill vibes
const SPOTIFY_PLAYLIST_URL = 'https://open.spotify.com/playlist/2OGnRhif1an83oSPy3OYHC?si=2e3a8fcbccca45d1';

// Using a reliable lo-fi stream as placeholder (since direct Spotify streaming requires auth)
const tracks: Record<string, string> = {
  home: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
  projects: 'https://assets.mixkit.co/music/preview/mixkit-cold-nights-2790.mp3',
  about: 'https://assets.mixkit.co/music/preview/mixkit-chill-vibes-526.mp3',
  timeline: 'https://assets.mixkit.co/music/preview/mixkit-ambient-mystical-village-10.mp3',
  // Default playlist track (lo-fi style)
  playlist: 'https://assets.mixkit.co/music/preview/mixkit-chill-vibes-526.mp3',
};

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [currentTrack, setCurrentTrack] = useState('playlist');
  const soundRef = useRef<Howl | null>(null);

  const changeTrack = (trackName: string) => {
    if (soundRef.current) {
      soundRef.current.fade(1, 0, 500);
      setTimeout(() => {
        soundRef.current?.stop();
        soundRef.current?.unload();
        loadTrack(trackName);
      }, 500);
    } else {
      loadTrack(trackName);
    }
    setCurrentTrack(trackName);
  };

  const loadTrack = (trackName: string) => {
    const trackUrl = tracks[trackName] || tracks.playlist;
    soundRef.current = new Howl({
      src: [trackUrl],
      loop: true,
      volume: isMuted ? 0 : 0.3,
    });
    if (!isMuted) {
      soundRef.current.play();
    }
  };

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
      loadTrack(currentTrack);
    }
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isMuted, isPlaying: !isMuted, toggleMute, changeTrack }}>
      {children}
    </AudioContext.Provider>
  );
};

// Export Spotify playlist URL for use in SpotifyWidget
export const getSpotifyPlaylistUrl = () => SPOTIFY_PLAYLIST_URL;
