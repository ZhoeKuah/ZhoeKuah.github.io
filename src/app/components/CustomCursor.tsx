import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  // Changed: We'll rely on visibility state, not just a hardware check
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // FIX: Check screen width instead of touch capability. 
    // This ensures laptops with touchscreens still get the cursor.
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially and on resize
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      // Don't update state on mobile to save performance
      if (window.innerWidth < 768) return;
      
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Return null ONLY if it is a small mobile screen
  if (isMobile || !isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed w-10 h-10 border-2 border-blue-400/50 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
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
