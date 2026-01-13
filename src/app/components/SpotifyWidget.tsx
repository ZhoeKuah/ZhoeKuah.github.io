import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Play, Pause, X, ChevronRight } from 'lucide-react';

interface Song {
  title: string;
  artist: string;
  album: string;
  duration: string;
}

export const SpotifyWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [mode, setMode] = useState<'listening' | 'recommendations'>('recommendations');

  // Mock currently listening (simulating Spotify API)
  const currentlyListening: Song = {
    title: 'Synthwave Dreams',
    artist: 'Digital Horizon',
    album: 'Neon Nights',
    duration: '3:42',
  };

  // Mock weekly recommendations
  const recommendations: Song[] = [
    { title: 'Electric Pulse', artist: 'Circuit Breaker', album: 'Digital Dawn', duration: '4:15' },
    { title: 'Code Flow', artist: 'Algorithm', album: 'Runtime', duration: '3:58' },
    { title: 'Binary Sunset', artist: 'Data Stream', album: 'Compiled', duration: '5:20' },
    { title: 'Neural Network', artist: 'Deep Learning', album: 'AI Dreams', duration: '4:02' },
    { title: 'Terminal Velocity', artist: 'System32', album: 'Boot Sequence', duration: '3:35' },
  ];

  const handlePlay = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentSong(null);
  };

  return (
    <>
      {/* Spotify Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 p-4 bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-2xl shadow-emerald-500/50 transition-colors"
        aria-label="Open Spotify Widget"
      >
        <Music className="w-6 h-6 text-white" />
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
          />
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
                <Music className="w-5 h-5 text-white" />
                <h3 className="text-white font-bold">Music Player</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
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
                Hidden Gems
              </button>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto p-4">
              {mode === 'listening' ? (
                // Currently Listening
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-500/30 rounded-lg p-4">
                    <p className="text-emerald-400 text-xs font-semibold mb-2 uppercase tracking-wide">
                      Currently on Spotify
                    </p>
                    <h4 className="text-white font-bold text-lg mb-1">{currentlyListening.title}</h4>
                    <p className="text-gray-400 text-sm mb-1">{currentlyListening.artist}</p>
                    <p className="text-gray-500 text-xs mb-3">{currentlyListening.album}</p>
                    
                    <div className="flex items-center gap-3">
                      {currentSong?.title === currentlyListening.title && isPlaying ? (
                        <button
                          onClick={handlePause}
                          className="p-2 bg-emerald-500 hover:bg-emerald-600 rounded-full transition-colors"
                        >
                          <Pause className="w-4 h-4 text-white" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePlay(currentlyListening)}
                          className="p-2 bg-emerald-500 hover:bg-emerald-600 rounded-full transition-colors"
                        >
                          <Play className="w-4 h-4 text-white" />
                        </button>
                      )}
                      <div className="flex-1">
                        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-emerald-500"
                            initial={{ width: '0%' }}
                            animate={{ width: isPlaying && currentSong?.title === currentlyListening.title ? '100%' : '0%' }}
                            transition={{ duration: 222, ease: 'linear' }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{currentlyListening.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Recommendations
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-emerald-400 text-xs font-semibold mb-3 uppercase tracking-wide">
                    Weekly Recommendations
                  </p>
                  {recommendations.map((song, index) => (
                    <motion.div
                      key={song.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-emerald-500/30 rounded-lg p-3 transition-all cursor-pointer group"
                      onClick={() => handlePlay(song)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {currentSong?.title === song.title && isPlaying ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePause();
                              }}
                              className="p-2 bg-emerald-500 rounded-full"
                            >
                              <Pause className="w-3 h-3 text-white" />
                            </button>
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

            {/* Now Playing Bar (if playing) */}
            {currentSong && isPlaying && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 border-t border-emerald-400"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePause}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  >
                    <Pause className="w-4 h-4 text-white" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-medium truncate">{currentSong.title}</h4>
                    <p className="text-emerald-100 text-xs truncate">{currentSong.artist}</p>
                  </div>
                  <button
                    onClick={handleStop}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
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
