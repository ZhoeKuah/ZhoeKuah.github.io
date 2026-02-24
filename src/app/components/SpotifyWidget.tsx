import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Play, Pause, X, ChevronRight, Disc3 } from 'lucide-react';
import { useAudio } from './AudioContext';

interface Song {
  title: string;
  artist: string;
  album: string;
  duration: string;
  albumArt?: string;
}

// Cozy music playlist - cozy/lofi style albums
const cozyPlaylist: Song[] = [
  { title: 'Midnight Coffee', artist: 'Lo-Fi Dreams', album: 'Cozy Nights', duration: '3:42', albumArt: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=200&h=200&fit=crop' },
  { title: 'Rainy Window', artist: 'Chill Vibes', album: 'Rainy Days', duration: '4:15', albumArt: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=200&fit=crop' },
  { title: 'Autumn Leaves', artist: 'Peaceful Piano', album: 'Fall Collection', duration: '3:58', albumArt: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { title: 'Warm Fireplace', artist: 'Ambient Sounds', album: 'Winter Comfort', duration: '5:20', albumArt: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=200&h=200&fit=crop' },
  { title: 'Ocean Waves', artist: 'Nature Sounds', album: 'Beach Dreams', duration: '4:02', albumArt: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=200&h=200&fit=crop' },
  { title: 'Starry Night', artist: 'Celestial', album: 'Cosmic Chill', duration: '3:35', albumArt: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=200&h=200&fit=crop' },
];

export const SpotifyWidget = () => {
  const { isMuted, toggleMute } = useAudio();
  const [isOpen, setIsOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [mode, setMode] = useState<'listening' | 'recommendations'>('recommendations');

  // Sync with audio context - playing when not muted
  const isPlaying = !isMuted;

  const handlePlay = (song: Song) => {
    setCurrentSong(song);
    // Auto-unmute when playing
    if (isMuted) {
      toggleMute();
    }
  };

  const handlePause = () => {
    toggleMute();
  };

  const handleStop = () => {
    if (!isMuted) {
      toggleMute();
    }
    setCurrentSong(null);
  };

  const handleToggleWidget = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !currentSong) {
      setCurrentSong(cozyPlaylist[0]);
    }
  };

  return (
    <>
      {/* Spotify Button - changes color based on mute state */}
      <motion.button
        onClick={handleToggleWidget}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-colors ${
          isMuted 
            ? 'bg-gray-600 hover:bg-gray-500 shadow-gray-600/50' 
            : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/50'
        }`}
        aria-label={isMuted ? 'Enable music' : 'Open music player'}
      >
        {isMuted ? (
          <Music className="w-6 h-6 text-gray-300" />
        ) : (
          <>
            <Disc3 className="w-6 h-6 text-white animate-spin-slow" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
            />
          </>
        )}
      </motion.button>

      {/* Spotify Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-8 z-50 w-96 bg-gray-900 border-2 border-emerald-500/50 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Disc3 className="w-5 h-5 text-white animate-spin-slow" />
                <h3 className="text-white font-bold">Cozy Music</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close music player"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Mode Toggle */}
            <div className="p-4 border-b border-gray-700 flex gap-2">
              <button
                onClick={() => setMode('listening')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  mode === 'listening'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Now Playing
              </button>
              <button
                onClick={() => setMode('recommendations')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  mode === 'recommendations'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Playlist
              </button>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto p-4">
              {mode === 'listening' ? (
                // Currently Playing
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Album Art */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      {currentSong?.albumArt ? (
                        <img 
                          src={currentSong.albumArt} 
                          alt={currentSong.album}
                          className={`w-40 h-40 rounded-lg object-cover shadow-lg ${isPlaying ? 'animate-pulse' : ''}`}
                        />
                      ) : (
                        <div className={`w-40 h-40 rounded-lg bg-gray-800 flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
                          <Disc3 className="w-16 h-16 text-emerald-400" />
                        </div>
                      )}
                      {isPlaying && (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <div className="flex gap-0.5">
                            <motion.div 
                              animate={{ height: [4, 12, 4] }} 
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className="w-1 bg-white rounded-full" 
                            />
                            <motion.div 
                              animate={{ height: [8, 16, 8] }} 
                              transition={{ duration: 0.4, repeat: Infinity }}
                              className="w-1 bg-white rounded-full" 
                            />
                            <motion.div 
                              animate={{ height: [6, 10, 6] }} 
                              transition={{ duration: 0.6, repeat: Infinity }}
                              className="w-1 bg-white rounded-full" 
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-500/30 rounded-lg p-4">
                    <p className="text-emerald-400 text-xs font-semibold mb-2 uppercase tracking-wide">
                      {isPlaying ? 'Now Playing' : 'Paused'}
                    </p>
                    <h4 className="text-white font-bold text-lg mb-1">
                      {currentSong?.title || 'Select a song'}
                    </h4>
                    <p className="text-gray-400 text-sm mb-1">
                      {currentSong?.artist || 'From playlist'}
                    </p>
                    <p className="text-gray-500 text-xs mb-3">
                      {currentSong?.album || ''}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handlePause}
                        className="p-2 bg-emerald-500 hover:bg-emerald-600 rounded-full transition-colors"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-emerald-500"
                            initial={{ width: '0%' }}
                            animate={{ width: isPlaying ? '100%' : '30%' }}
                            transition={{ duration: isPlaying ? 180 : 0, ease: 'linear' }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {currentSong?.duration || '0:00'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Playlist
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wide">
                    Cozy Vibes Playlist
                  </p>
                  {cozyPlaylist.map((song: Song, index: number) => (
                    <motion.div
                      key={song.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-emerald-500/30 rounded-lg p-3 transition-all cursor-pointer group"
                      onClick={() => handlePlay(song)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 relative">
                          {currentSong?.title === song.title && isPlaying ? (
                            <div className="p-2 bg-emerald-500 rounded-full">
                              <div className="flex gap-0.5">
                                <motion.div 
                                  animate={{ height: [4, 10, 4] }} 
                                  transition={{ duration: 0.4, repeat: Infinity }}
                                  className="w-1 bg-white rounded-full" 
                                />
                                <motion.div 
                                  animate={{ height: [8, 14, 8] }} 
                                  transition={{ duration: 0.5, repeat: Infinity }}
                                  className="w-1 bg-white rounded-full" 
                                />
                                <motion.div 
                                  animate={{ height: [6, 12, 6] }} 
                                  transition={{ duration: 0.3, repeat: Infinity }}
                                  className="w-1 bg-white rounded-full" 
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="p-2 bg-emerald-500/20 group-hover:bg-emerald-500 rounded-full transition-colors">
                              <Play className="w-3 h-3 text-emerald-400 group-hover:text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm font-medium truncate">{song.title}</h4>
                          <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                        </div>
                        <span className="text-xs text-gray-500">{song.duration}</span>
                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-emerald-400 transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Now Playing Bar (always visible when song selected) */}
            {currentSong && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 border-t border-emerald-400"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePause}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-medium truncate">{currentSong.title}</h4>
                    <p className="text-emerald-100 text-xs truncate">{currentSong.artist}</p>
                  </div>
                  <button
                    onClick={handleStop}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                    aria-label="Stop music"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
