import { motion } from 'motion/react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from './AudioContext';

export const SpotifyWidget = () => {
  const { isMuted, toggleMute, currentBackground, currentTrackName } = useAudio();

  return (
    <motion.button
      onClick={toggleMute}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${
        !isMuted
          ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/30'
          : 'bg-gray-800/90 border border-gray-700 hover:bg-gray-700'
      }`}
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      <motion.div
        animate={!isMuted ? { rotate: [0, -10, 10, -10, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-gray-400" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </motion.div>
      
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        whileHover={{ opacity: 1, y: 0, scale: 1 }}
        className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 whitespace-nowrap"
      >
        <p className="text-xs text-white font-medium">
          {isMuted ? 'Click to unmute' : currentTrackName}
        </p>
        <p className="text-xs text-gray-400 capitalize">
          {isMuted ? 'Music off' : currentBackground}
        </p>
      </motion.div>
    </motion.button>
  );
};
