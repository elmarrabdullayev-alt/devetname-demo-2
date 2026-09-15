import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { invitationConfig } from '../config/invitation.ts';
import { ChevronDown } from 'lucide-react';

interface InvitationHeroProps {
  isIntroComplete?: boolean;
  onVideoReady?: () => void;
}

export const InvitationHero: React.FC<InvitationHeroProps> = ({ 
  isIntroComplete = true,
  onVideoReady,
}) => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // 9. hero-motion.mp4 yalnız intro tamamlandıqdan sonra səssiz şəkildə başlasın
  useEffect(() => {
    if (isIntroComplete && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [isIntroComplete]);

  const handleVideoReady = () => {
    if (onVideoReady) {
      onVideoReady();
    }
  };

  const scrollToContent = () => {
    const nextSection = document.getElementById('invitation-quote-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="invitation-hero"
      className="relative w-full h-[100svh] min-h-[580px] max-h-[960px] overflow-hidden flex flex-col justify-between items-center text-center select-none bg-[#FAF4E6]"
    >
      {/* 
        1 & 2. AMBIENT BACKGROUND LAYER (z-index: 0):
        Hero arxa fon videosunun arxasında eyni poster şəklindən ambient background qatı:
        - hero-poster.webp
        - background-size: cover
        - filter: blur(35px)
        - transform: scale(1.12)
        - opacity: 0.20
        - üzərində krem rəngli rgba(250,248,243,0.55) qat
      */}
      <div 
        className="ambient-background absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="ambient-poster-image" />
        <div className="ambient-tint-overlay" />
      </div>

      {/* 
        3, 4, 9, 11. HERO MEDIA LAYER (z-index: 1): hero-motion.mp4 / hero-poster.webp
        Əsas hero video/şəkil qatı mərkəzdə kəskin qalsın (bütün görüntüyə blur tətbiq edilmir).
        Yalnız sol və sağ kənarlarına 18-28px (5%) yumşaq gradient mask tətbiq olunur.
        Safari üçün -webkit-mask-image dəstəyi ilə təchiz olunub.
      */}
      <div className="hero-background-layer">
        {isReducedMotion ? (
          <img
            src="/invitation/hero-poster.webp"
            alt="Nigar & Ali Toy Dəvətnaməsi"
            aria-hidden="true"
            fetchPriority="high"
            className="w-full h-full object-cover object-center pointer-events-none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        ) : (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="auto"
              poster="/invitation/hero-poster.webp"
              aria-hidden="true"
              onCanPlay={handleVideoReady}
              onPlaying={handleVideoReady}
              onLoadedData={handleVideoReady}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                pointerEvents: 'none',
              }}
            >
              <source src="/invitation/hero-motion.mp4" type="video/mp4" />
              <source src="/invitation/hero-motion.webm" type="video/webm" />
              {/* Fallback image if video cannot be played */}
              <img
                src="/invitation/hero-poster.webp"
                alt="Nigar & Ali Toy Dəvətnaməsi"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </video>
          </div>
        )}

        {/* 
          HERO QATI 2 (z-index: 2): Çox zəif krem rəngli oxunaqlılıq overlay-i
          Preserves video motion and aesthetics while ensuring optimal text contrast
        */}
        <div 
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 253, 248, 0.42) 0%, rgba(250, 244, 230, 0.12) 45%, rgba(250, 244, 230, 0.68) 100%)',
          }}
        />
      </div>

      {/* 
        HERO QATI 3 (z-index: 3): Monoqram, tarix və adlar
        Mətn animasiyaları:
        - opacity: 0 → 1;
        - y: 18px → 0;
        - duration: 900 ms (0.9s);
        - easing: cubic-bezier(0.22, 1, 0.36, 1).
      */}
      {/* 1. Toy günü və tarix: 300 ms sonra (delay: 0.3s) */}
      <div className="relative z-[3] pt-10 px-4 w-full flex flex-col items-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-3"
        >
          <div className="h-[1px] w-8 bg-[#B99245]/60" />
          <span className="font-manrope text-xs md:text-sm font-semibold tracking-[0.28em] uppercase text-[#7A1830]">
            {invitationConfig.heroSubtitle}
          </span>
          <div className="h-[1px] w-8 bg-[#B99245]/60" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2.5 px-4 py-1 rounded-full bg-[#FFFDF8]/85 backdrop-blur-xs border border-[#B99245]/35 shadow-sm"
        >
          <p className="font-cormorant font-semibold text-base md:text-lg tracking-[0.2em] text-[#7A1830]">
            {invitationConfig.weddingDateFormatted}
          </p>
        </motion.div>
      </div>

      {/* Center Main Stage */}
      <div className="relative z-[3] px-4 my-auto flex flex-col items-center max-w-[380px] pointer-events-none">
        {/* 2. Gəlin və bəyin adları: 650 ms sonra (delay: 0.65s) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Monogram emblem */}
          <div className="w-14 h-14 rounded-full border border-[#B99245]/45 bg-[#FFFDF8]/75 backdrop-blur-xs flex items-center justify-center shadow-sm mb-3">
            <span className="font-cormorant text-xl font-bold tracking-widest text-[#7A1830]">
              {invitationConfig.monogram}
            </span>
          </div>

          {/* Main calligraphy title: Nigar & Ali */}
          <h1 className="font-great-vibes text-6xl sm:text-7xl text-[#7A1830] leading-[1.1] drop-shadow-sm filter">
            {invitationConfig.brideName}
            <span className="block font-cormorant italic text-3xl text-[#B99245] my-[-6px] font-normal">
              &amp;
            </span>
            {invitationConfig.groomName}
          </h1>
        </motion.div>

        {/* 3. Dəvət mətni: 950 ms sonra (delay: 0.95s) */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="font-cormorant text-sm italic tracking-widest text-[#75665F] mt-3 font-medium"
        >
          Sizi toy mərasimimizə dəvət edirik
        </motion.p>
      </div>

      {/* 
        HERO QATI 4 (z-index: 4):
        4. “Aşağı sürüşdürün” göstəricisi: 1250 ms sonra (delay: 1.25s)
      */}
      <motion.div 
        initial={{ opacity: 0, y: 18 }}
        animate={isIntroComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.9, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[4] pb-8 flex flex-col items-center cursor-pointer pointer-events-auto" 
        onClick={scrollToContent}
      >
        <span className="font-manrope text-[11px] tracking-[0.2em] uppercase text-[#75665F] mb-2 font-medium">
          Aşağı sürüşdürün
        </span>

        <div
          className="flex flex-col items-center gap-1"
          role="button"
          tabIndex={0}
          aria-label="Aşağı sürüşdürün"
        >
          <div className="w-5 h-8 rounded-full border border-[#B99245]/70 flex items-start justify-center p-1 bg-[#FFFDF8]/70 shadow-xs">
            <motion.div 
              className="w-1 h-2 rounded-full bg-[#7A1830]"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            />
          </div>
          <ChevronDown className="w-4 h-4 text-[#B99245] -mt-0.5" />
        </div>
      </motion.div>
    </section>
  );
};
