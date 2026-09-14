import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface SwanLayerProps {
  isIntroComplete: boolean;
}

export const SwanLayer: React.FC<SwanLayerProps> = ({ isIntroComplete }) => {
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      setIsPageVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionListener);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      mediaQuery.removeEventListener('change', motionListener);
    };
  }, []);

  if (!isIntroComplete) {
    return null;
  }

  return (
    <motion.div
      id="swan-layer"
      className="absolute inset-x-0 bottom-[14%] sm:bottom-[16%] flex items-center justify-center pointer-events-none z-[3]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
    >
      {/* Swans Container - positioned right above the water ripple reflections */}
      <div className="relative flex items-center justify-center gap-1 sm:gap-2 px-4 max-w-[340px] w-full">
        {/* Water Surface Ripple Base */}
        <div
          className={`absolute bottom-[-4px] inset-x-12 h-5 rounded-full bg-gradient-to-r from-transparent via-[#FFFDF8]/20 to-transparent blur-[2px] pointer-events-none ${
            !isReducedMotion && isPageVisible ? 'water-ripple-anim' : ''
          }`}
        />

        {/* 1. Left Swan (Faces Right) */}
        <div className="relative flex flex-col items-center">
          {/* Left Swan Main Body */}
          <div
            className={`relative z-10 ${
              !isReducedMotion && isPageVisible ? 'swan-left-anim' : ''
            }`}
            style={{
              width: 'clamp(68px, 18vw, 92px)',
            }}
          >
            <img
              src="/invitation/swan-left.webp"
              alt="Ağ qu quşu"
              aria-hidden="true"
              className="w-full h-auto object-contain drop-shadow-[0_4px_8px_rgba(117,102,95,0.22)] select-none"
              loading="lazy"
            />

            {/* Left Swan Water Reflection: opacity 0.18, blur 2px, transform: scaleY(-0.65) */}
            <div
              className="absolute top-[82%] left-0 w-full pointer-events-none select-none overflow-hidden"
              style={{
                opacity: 0.18,
                filter: 'blur(2px)',
                transform: 'scaleY(-0.65) translate3d(0, 4px, 0)',
                maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 85%)',
                WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 85%)',
              }}
            >
              <img
                src="/invitation/swan-left.webp"
                alt=""
                aria-hidden="true"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* 2. Right Swan (Faces Left, beaks form romantic heart shape) */}
        <div className="relative flex flex-col items-center">
          {/* Right Swan Main Body */}
          <div
            className={`relative z-10 ${
              !isReducedMotion && isPageVisible ? 'swan-right-anim' : ''
            }`}
            style={{
              width: 'clamp(68px, 18vw, 92px)',
            }}
          >
            <img
              src="/invitation/swan-right.webp"
              alt="Ağ qu quşu"
              aria-hidden="true"
              className="w-full h-auto object-contain drop-shadow-[0_4px_8px_rgba(117,102,95,0.22)] select-none"
              loading="lazy"
            />

            {/* Right Swan Water Reflection: opacity 0.18, blur 2px, transform: scaleY(-0.65) */}
            <div
              className="absolute top-[82%] left-0 w-full pointer-events-none select-none overflow-hidden"
              style={{
                opacity: 0.18,
                filter: 'blur(2px)',
                transform: 'scaleY(-0.65) translate3d(0, 4px, 0)',
                maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 85%)',
                WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 85%)',
              }}
            >
              <img
                src="/invitation/swan-right.webp"
                alt=""
                aria-hidden="true"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
