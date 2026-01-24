import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SmartCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  gallery?: string[];
  tags: string[];
  link?: string;
  githubUrl?: string;
  variant?: 'hardware' | 'software' | 'achievement';
  onClick?: () => void;
}

export const SmartCard: React.FC<SmartCardProps> = ({
  title,
  subtitle,
  imageUrl,
  gallery = [],
  tags,
  link,
  githubUrl,
  variant = 'software',
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine main image with gallery
  const allImages = [imageUrl, ...(gallery || [])];

  // LOGIC: Auto-cycle, but PAUSE when hovered
  useEffect(() => {
    let interval: any;
    
    // Only cycle if NOT hovered and there are multiple images
    if (!isHovered && allImages.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      }, 2500); // Slowed down to 2.5s for better UX
    } 
    
    return () => clearInterval(interval);
  }, [isHovered, allImages.length]);

  const variantStyles = {
    hardware: {
      border: 'border-gray-500/50 hover:border-gray-400',
      overlay: 'bg-gray-900/40 hover:bg-gray-900/60', // Lighter overlay for visibility
      tagBg: 'bg-gray-700/50 border-gray-500/50',
      glow: 'shadow-gray-500/20',
    },
    software: {
      border: 'border-blue-500/30 hover:border-blue-400',
      overlay: 'bg-black/40 hover:bg-black/60',
      tagBg: 'bg-blue-500/20 border-blue-500/50',
      glow: 'shadow-blue-500/30',
    },
    achievement: {
      border: 'border-cyan-500/30 hover:border-cyan-400',
      overlay: 'bg-cyan-950/40 hover:bg-cyan-950/60',
      tagBg: 'bg-cyan-500/20 border-cyan-500/50',
      glow: 'shadow-cyan-500/30',
    },
  };

  const style = variantStyles[variant];

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0); // Optional: Reset to cover image on leave? Remove this line if you prefer it to resume where it left off.
      }}
      onClick={handleClick}
      className={`group relative h-80 rounded-lg border ${style.border} overflow-hidden cursor-pointer transition-all duration-300 hover:${style.glow} hover:shadow-xl bg-gray-900`}
    >
      {/* 1. FIXED IMAGE RENDERING: Using regular <img> tag instead of background-image */}
      <AnimatePresence mode='wait'>
        <motion.img
          key={currentImageIndex}
          src={allImages[currentImageIndex]}
          alt={title}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails
            (e.target as HTMLImageElement).style.display = 'none'; 
            (e.target as HTMLImageElement).parentElement!.style.backgroundColor = '#1f2937'; // gray-800
          }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className={`absolute inset-0 ${style.overlay} transition-all duration-300`} />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6">
        <div className="z-10">
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg shadow-black">
            {title}
          </h3>
          <p className="text-gray-200 text-sm font-medium drop-shadow-md shadow-black">
            {subtitle}
          </p>
        </div>

        {/* Skill Tags */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-wrap gap-2 z-10"
        >
          {tags.map((tag) => (
            <span key={tag} className={`px-3 py-1 ${style.tagBg} border rounded-full text-xs font-medium text-white backdrop-blur-md`}>
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Action Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-4 right-4 flex gap-2 z-20"
        >
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-black/50 backdrop-blur-md rounded-lg hover:bg-black/70 transition-colors border border-white/10"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
          )}
          
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-black/50 backdrop-blur-md rounded-lg hover:bg-black/70 transition-colors border border-white/10 cursor-pointer"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};