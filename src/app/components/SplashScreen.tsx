import { motion } from 'motion/react';

interface SplashScreenProps {
  onEnter: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Added pb-4 to fix clipped descenders (g, y) */}
          <h1 className="mb-4 pb-4 text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            The Engineer's Terminal
          </h1>
          <p className="mb-8 text-gray-400 text-xl">
            Welcome to the future of engineering portfolios
          </p>
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-lg font-semibold border-2 border-blue-400 shadow-lg shadow-blue-500/50 hover:shadow-blue-400/75 transition-shadow"
          >
            Click to Enter
          </motion.button>
          <p className="mt-4 text-sm text-gray-500">
            This experience includes ambient audio
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Note: This website has incomplete sections and information which will be updated soon, possibly after Chinese New Year (CNY).
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};