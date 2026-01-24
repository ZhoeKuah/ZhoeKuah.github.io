import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode[];
  onSlideClick?: (index: number) => void;
}

export const ProjectCarousel = ({ children, onSlideClick }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  // ADDED: State to track if user is hovering
  const [isPaused, setIsPaused] = useState(false);
  
  const dragStartX = useRef(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % children.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + children.length) % children.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    dragStartX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    // Also pause when dragging starts
    setIsPaused(true);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    // Unpause when drag ends (optional, or let mouseLeave handle it)
    setIsPaused(false);
    
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX.current - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // UPDATED: Auto-scroll now respects 'isPaused'
  useEffect(() => {
    // If hovering (paused), do NOT set the timer
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [children.length, isPaused]); // Re-run effect when pause state changes

  const getVisibleSlides = () => {
    const slides = [];
    const totalSlides = children.length;
    
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + totalSlides) % totalSlides;
      slides.push({
        index,
        offset: i,
        element: children[index]
      });
    }
    
    return slides;
  };

  return (
    <div 
      className="relative w-full overflow-hidden py-12"
      // ADDED: Hover listeners to the main container
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div
        className="relative flex items-center justify-center gap-4 min-h-[400px]"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd} // This handles drag interruption
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        {getVisibleSlides().map((slide) => {
          const isCenter = slide.offset === 0;
          const scale = isCenter ? 1.1 : 0.85;
          const opacity = isCenter ? 1 : 0.6;
          const zIndex = isCenter ? 30 : 10;

          return (
            <motion.div
              key={slide.index}
              initial={false}
              animate={{
                scale,
                opacity,
                x: slide.offset * 320,
                zIndex,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={() => {
                if (isCenter && onSlideClick) {
                  onSlideClick(slide.index);
                } else {
                  goToSlide(slide.index);
                }
              }}
              className="absolute cursor-pointer"
              style={{
                width: '300px',
              }}
            >
              {slide.element}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500/50 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-blue-400" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500/50 rounded-full transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-blue-400" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-blue-500'
                : 'w-2 bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};