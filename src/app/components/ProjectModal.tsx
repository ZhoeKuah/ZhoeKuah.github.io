import { motion, AnimatePresence } from 'motion/react';
import { X, Github, ExternalLink, Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface ProjectDetails {
  title: string;
  subtitle: string;
  imageUrl: string;
  // ADDED: Gallery support
  gallery?: string[];
  tags: string[];
  description?: string;
  company?: string;
  location?: string;
  date?: string;
  githubUrl?: string;
  link?: string;
  challenges?: string[];
  outcomes?: string[];
}

interface ProjectModalProps {
  project: ProjectDetails | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reset slide when project changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [project]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  // Combine main image with gallery
  const slides = [project.imageUrl, ...(project.gallery || [])];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-2 border-blue-500/50 rounded-2xl shadow-2xl shadow-blue-500/20 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-900 [&::-webkit-scrollbar-thumb]:bg-blue-500 [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-4 right-4 float-right z-20 p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-full transition-all"
          >
            <X className="w-6 h-6 text-red-400" />
          </button>

          {/* Image Carousel */}
          <div className="relative h-64 md:h-96 overflow-hidden rounded-t-2xl bg-black group">
            <AnimatePresence mode='wait'>
              <motion.img
                key={currentSlide}
                src={slides[currentSlide]}
                alt={`${project.title} slide ${currentSlide + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-contain"
              />
            </AnimatePresence>
            
            {/* Navigation Buttons (Only if > 1 image) */}
            {slides.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-blue-500/50 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-blue-500/50 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentSlide ? 'bg-blue-500 w-4' : 'bg-gray-500 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            
            {/* Gradient Overlay for Text Visibility if needed, kept subtle */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <div className="p-8">
            <h2 className="text-4xl font-bold text-white mb-2">{project.title}</h2>
            <p className="text-xl text-blue-400 mb-6">{project.subtitle}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-400">
              {project.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{project.date}</span>
                </div>
              )}
              {project.company && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{project.company}</span>
                </div>
              )}
              {project.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-sm text-blue-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            {project.description && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3">About This Project</h3>
                <p className="text-gray-300 leading-relaxed">{project.description}</p>
              </div>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3">Challenges & Solutions</h3>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <span className="text-yellow-400 mt-1">⚡</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Outcomes */}
            {project.outcomes && project.outcomes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3">Key Outcomes</h3>
                <ul className="space-y-2">
                  {project.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-4 pt-6 border-t border-gray-700">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-all"
                >
                  <Github className="w-5 h-5" />
                  <span>View on GitHub</span>
                </motion.a>
              )}
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Live Demo</span>
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};