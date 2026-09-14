import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface PetalFallProps {
  isIntroComplete: boolean;
}

interface PetalConfig {
  id: number;
  image: string;
  leftPercent: number; // Keep center 35%-65% mostly clear
  sizePx: number; // 10px-22px
  baseOpacity: number; // 0.35-0.70
  duration: number; // 8s-14s
  delay: number; // Starts from 0.7s, staggered
  swayDist: number; // -18px to +18px
  rotateDeg: number; // 180deg to 540deg
  fadeEarly: boolean; // Some fade before reaching middle/bottom
}

// Fixed static array of 11 petals to prevent re-randomization and ensure determinism
const PETALS: PetalConfig[] = [
  {
    id: 1,
    image: '/invitation/petal-1.webp',
    leftPercent: 6,
    sizePx: 18,
    baseOpacity: 0.55,
    duration: 10.5,
    delay: 0.7,
    swayDist: 16,
    rotateDeg: 360,
    fadeEarly: false,
  },
  {
    id: 2,
    image: '/invitation/petal-2.webp',
    leftPercent: 88,
    sizePx: 15,
    baseOpacity: 0.62,
    duration: 11.2,
    delay: 1.4,
    swayDist: -18,
    rotateDeg: 420,
    fadeEarly: false,
  },
  {
    id: 3,
    image: '/invitation/petal-3.webp',
    leftPercent: 18,
    sizePx: 13,
    baseOpacity: 0.45,
    duration: 12.8,
    delay: 2.1,
    swayDist: 14,
    rotateDeg: 280,
    fadeEarly: true,
  },
  {
    id: 4,
    image: '/invitation/petal-1.webp',
    leftPercent: 78,
    sizePx: 20,
    baseOpacity: 0.58,
    duration: 9.6,
    delay: 2.9,
    swayDist: -16,
    rotateDeg: 510,
    fadeEarly: false,
  },
  {
    id: 5,
    image: '/invitation/petal-2.webp',
    leftPercent: 26,
    sizePx: 12,
    baseOpacity: 0.42,
    duration: 13.5,
    delay: 3.8,
    swayDist: 12,
    rotateDeg: 220,
    fadeEarly: false,
  },
  {
    id: 6,
    image: '/invitation/petal-3.webp',
    leftPercent: 93,
    sizePx: 16,
    baseOpacity: 0.65,
    duration: 10.0,
    delay: 4.6,
    swayDist: -20,
    rotateDeg: 380,
    fadeEarly: false,
  },
  {
    id: 7,
    image: '/invitation/petal-1.webp',
    leftPercent: 12,
    sizePx: 14,
    baseOpacity: 0.48,
    duration: 11.8,
    delay: 5.5,
    swayDist: 15,
    rotateDeg: 310,
    fadeEarly: true,
  },
  {
    id: 8,
    image: '/invitation/petal-2.webp',
    leftPercent: 70,
    sizePx: 17,
    baseOpacity: 0.50,
    duration: 12.2,
    delay: 6.3,
    swayDist: -14,
    rotateDeg: 460,
    fadeEarly: false,
  },
  {
    id: 9,
    image: '/invitation/petal-3.webp',
    leftPercent: 32,
    sizePx: 11,
    baseOpacity: 0.38,
    duration: 14.0,
    delay: 7.2,
    swayDist: 10,
    rotateDeg: 200,
    fadeEarly: true,
  },
  {
    id: 10,
    image: '/invitation/petal-1.webp',
    leftPercent: 83,
    sizePx: 19,
    baseOpacity: 0.56,
    duration: 10.8,
    delay: 8.0,
    swayDist: -17,
    rotateDeg: 340,
    fadeEarly: false,
  },
  {
    id: 11,
    image: '/invitation/petal-2.webp',
    leftPercent: 22,
    sizePx: 15,
    baseOpacity: 0.52,
    duration: 11.5,
    delay: 9.0,
    swayDist: 18,
    rotateDeg: 480,
    fadeEarly: false,
  },
];

export const PetalFall: React.FC<PetalFallProps> = ({ isIntroComplete }) => {
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

  // Do not render if intro is not yet complete, or if reduced motion is preferred
  if (!isIntroComplete || isReducedMotion || !isPageVisible) {
    return null;
  }

  return (
    <div
      id="petal-fall-layer"
      className="absolute inset-0 overflow-hidden pointer-events-none z-[5]"
      aria-hidden="true"
    >
      {PETALS.map((petal) => {
        // Subtle sway path and falling vertical path
        const yKeyframes = petal.fadeEarly
          ? ['-40px', '45svh', '55svh']
          : ['-40px', '50svh', '105svh'];

        const opacityKeyframes = petal.fadeEarly
          ? [0, petal.baseOpacity, 0]
          : [0, petal.baseOpacity, petal.baseOpacity * 0.9, 0];

        const xKeyframes = [
          '0px',
          `${petal.swayDist}px`,
          `${-petal.swayDist * 0.8}px`,
          `${petal.swayDist * 0.5}px`,
          '0px',
        ];

        return (
          <motion.div
            key={petal.id}
            className="absolute top-0 will-change-transform"
            style={{
              left: `${petal.leftPercent}%`,
              width: `${petal.sizePx}px`,
              height: `${petal.sizePx}px`,
            }}
            initial={{
              y: '-40px',
              x: '0px',
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              y: yKeyframes,
              x: xKeyframes,
              opacity: opacityKeyframes,
              rotate: [0, petal.rotateDeg * 0.5, petal.rotateDeg],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img
              src={petal.image}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(185,146,69,0.2)]"
              loading="lazy"
            />
          </motion.div>
        );
      })}
    </div>
  );
};
