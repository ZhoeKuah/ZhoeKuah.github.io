import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from './AudioContext';

export const Navbar = () => {
  const { isMuted, toggleMute } = useAudio();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleNavigation = (path: string, sectionId?: string) => {
    navigate(path);
    setOpenDropdown(null);
    
    if (sectionId) {
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all"
          >
            ENGINEER.DEV
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Home
            </Link>

            {/* Projects Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('projects')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors">
                <span>Projects</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {openDropdown === 'projects' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-gray-900 border border-blue-500/30 rounded-lg overflow-hidden shadow-lg shadow-blue-500/20"
                  >
                    <button
                      onClick={() => handleNavigation('/projects', 'hardware')}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
                    >
                      Hardware
                    </button>
                    <button
                      onClick={() => handleNavigation('/projects', 'software')}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
                    >
                      Software
                    </button>
                    <button
                      onClick={() => handleNavigation('/projects', 'achievements')}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
                    >
                      Achievements
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Timeline Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('timeline')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors">
                <span>Timeline</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {openDropdown === 'timeline' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-32 bg-gray-900 border border-blue-500/30 rounded-lg overflow-hidden shadow-lg shadow-blue-500/20"
                  >
                    {['2025', '2024', '2023', '2022', '2021', '2020'].map((year) => (
                      <button
                        key={year}
                        onClick={() => handleNavigation('/timeline', year)}
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
                      >
                        {year}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/about" 
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Audio Toggle */}
          <button
            onClick={toggleMute}
            className="p-2 text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-500/10"
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
};
