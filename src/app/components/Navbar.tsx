import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Volume2, VolumeX, ChevronDown, Sparkles, Stars, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from './AudioContext';
import { useCosmic, BackgroundType } from '../context/CosmicContext';

const backgroundOptions: { value: BackgroundType; label: string; icon: React.ReactNode }[] = [
  { value: 'none', label: 'None', icon: null },
  { value: 'cosmic', label: 'Cosmic', icon: <Stars className="w-4 h-4" /> },
{ value: 'bubble', label: 'Bubble', icon: <Circle className="w-4 h-4" /> },
];

export const Navbar = () => {
  const { isMuted, toggleMute } = useAudio();
  const { cosmicEnabled, setCosmicEnabled, backgroundType, setBackgroundType } = useCosmic();
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [bgDropdownOpen, setBgDropdownOpen] = useState(false);

  const handleNavigation = (path: string, sectionId?: string) => {
    const currentPath = location.pathname;
    setOpenDropdown(null);
    
    if (currentPath === path && sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(path);
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 800);
      }
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent hover:from-emerald-300 hover:to-teal-300 transition-all"
          >
            Kuah Zhun Hoe
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`transition-colors ${location.pathname === '/' ? 'text-emerald-400' : 'text-gray-300 hover:text-emerald-400'}`}
              >
                Home
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown('projects')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button 
                  onClick={() => handleNavigation('/projects')}
                  className={`flex items-center space-x-1 transition-colors ${location.pathname === '/projects' ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
                >
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
                      className="absolute top-full left-0 mt-2 w-48 bg-gray-900 border border-emerald-500/30 rounded-lg overflow-hidden shadow-lg shadow-emerald-500/20"
                    >
                      <button
                        onClick={() => handleNavigation('/projects', 'hardware')}
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                      >
                        Hardware
                      </button>
                      <button
                        onClick={() => handleNavigation('/projects', 'software')}
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                      >
                        Software
                      </button>
                      <button
                        onClick={() => handleNavigation('/projects', 'achievements')}
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                      >
                        Achievements
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown('timeline')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button 
                  onClick={() => handleNavigation('/timeline')}
                  className={`flex items-center space-x-1 transition-colors ${location.pathname === '/timeline' ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'}`}
                >
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
                      className="absolute top-full left-0 mt-2 w-32 bg-gray-900 border border-emerald-500/30 rounded-lg overflow-hidden shadow-lg shadow-emerald-500/20"
                    >
                      {['2025', '2024', '2023', '2022', '2021', '2020'].map((year) => (
                        <button
                          key={year}
                          onClick={() => handleNavigation('/timeline', year)}
                          className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
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
                className={`transition-colors ${location.pathname === '/about' ? 'text-pink-400' : 'text-gray-300 hover:text-pink-400'}`}
              >
                About
              </Link>
            </div>

            {/* Background Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setBgDropdownOpen(true)}
              onMouseLeave={() => setBgDropdownOpen(false)}
            >
              <button
                className={`p-2 transition-colors rounded-lg hover:bg-emerald-500/10 ${
                  cosmicEnabled ? 'text-emerald-400' : 'text-gray-300 hover:text-emerald-400'
                }`}
                aria-label="Background settings"
              >
                <Sparkles className="w-6 h-6" />
              </button>
              <AnimatePresence>
                {bgDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-40 bg-gray-900 border border-emerald-500/30 rounded-lg overflow-hidden shadow-lg shadow-emerald-500/20"
                  >
                    {backgroundOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setBackgroundType(option.value)}
                        className={`flex items-center gap-2 w-full text-left px-4 py-2 transition-colors ${
                          backgroundType === option.value
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400'
                        }`}
                      >
                        {option.icon}
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              className="p-2 text-gray-300 hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-500/10"
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
