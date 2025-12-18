import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

interface SmartCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  tags: string[];
  link?: string;
  githubUrl?: string;
  variant?: 'hardware' | 'software' | 'achievement';
}

export const SmartCard: React.FC<SmartCardProps> = ({
  title,
  subtitle,
  imageUrl,
  tags,
  link,
  githubUrl,
  variant = 'software',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variantStyles = {
    hardware: {
      border: 'border-gray-500/50 hover:border-gray-400',
      overlay: 'bg-gray-800/70 hover:bg-gray-900/90',
      tagBg: 'bg-gray-700/50 border-gray-500/50',
      glow: 'shadow-gray-500/20',
    },
    software: {
      border: 'border-blue-500/30 hover:border-blue-400',
      overlay: 'bg-black/70 hover:bg-black/95',
      tagBg: 'bg-blue-500/20 border-blue-500/50',
      glow: 'shadow-blue-500/30',
    },
    achievement: {
      border: 'border-cyan-500/30 hover:border-cyan-400',
      overlay: 'bg-cyan-950/70 hover:bg-cyan-950/95',
      tagBg: 'bg-cyan-500/20 border-cyan-500/50',
      glow: 'shadow-cyan-500/30',
    },
  };

  const style = variantStyles[variant];

  const handleClick = () => {
    if (link) {
      if (link.startsWith('http')) {
        window.open(link, '_blank');
      } else {
        window.location.href = link;
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`group relative h-80 rounded-lg border ${style.border} overflow-hidden cursor-pointer transition-all duration-300 hover:${style.glow} hover:shadow-xl`}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${style.overlay} transition-all duration-300`} />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6">
        {/* Title and Subtitle - Always Visible */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-300 text-sm">
            {subtitle}
          </p>
        </div>

        {/* Skill Tags - Slide in on Hover */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-wrap gap-2"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 ${style.tagBg} border rounded-full text-xs font-medium text-white`}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Action Icons - Show on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute top-4 right-4 flex gap-2"
        >
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
          )}
          {link && (
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
