import { motion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

const IDLE_TIMEOUT = 2000; // 2 seconds of inactivity before triggering idle state

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isIdle, setIsIdle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Clear existing idle timeout
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      
      // Set not idle when moving
      setIsIdle(false);
      
      // Trigger idle state after timeout
      idleTimeoutRef.current = setTimeout(() => {
        setIsIdle(true);
      }, IDLE_TIMEOUT);
    };

    const handleMouseLeave = () => {
      // Hide cursor when leaving window
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      setIsIdle(false);
    };

    // Set initial idle timeout
    idleTimeoutRef.current = setTimeout(() => {
      setIsIdle(true);
    }, IDLE_TIMEOUT);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  // Return null ONLY if it is a small mobile screen
  if (isMobile) return null;

  return (
    <>
      {/* Outer ring - bubbles when idle, static when moving */}
      <motion.div
        className="fixed w-10 h-10 border-2 border-blue-400/50 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
        }}
        animate={isIdle ? {
          scale: [1, 1.2, 1],
        } : {
          scale: 1,
        }}
        transition={isIdle ? {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        } : {
          duration: 0.1,
        }}
      />
      
      {/* Inner dot - always visible, static */}
      <motion.div
        className="fixed w-2 h-2 bg-blue-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
      />
    </>
  );
};
