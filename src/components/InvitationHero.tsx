import React from 'react';
import { motion } from 'motion/react';
import { invitationConfig } from '../config/invitation.ts';
import { ChevronDown } from 'lucide-react';
import { SwanLayer } from './SwanLayer.tsx';
import { PetalFall } from './PetalFall.tsx';

interface InvitationHeroProps {
  isIntroComplete?: boolean;
}

export const InvitationHero: React.FC<InvitationHeroProps> = ({ isIntroComplete = true }) => {
  const scrollToContent = () => {
    const nextSection = document.getElementById('invitation-quote-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="invitation-hero"
      className="relative w-full h-[100svh] min-h-[580px] max-h-[960px] overflow-hidden flex flex-col justify-between items-center text-center select-none"
    >
      {/* 
        LAYER 1 (z-index: 1): Hero Background Image 
        Palace arch, lush garden & calm lake (swans are rendered separately in SwanLayer)
      */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <img
          src={invitationConfig.assets.heroGarden}
          alt="Sehrli saray bağı və göl"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          className="w-full h-full object-cover object-center transform scale-105"
        />
      </div>

      {/* 
        LAYER 2 (z-index: 2): Atmosphere and Light Layer 
        Soft dreamy gradients & warm golden shimmer particles
      */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* Dreamy light wash: preserves garden ambiance while maintaining legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF8]/70 via-[#FAF4E6]/25 to-[#FAF4E6]/85" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#FAF4E6]/30 to-[#FAF4E6]/80" />

        {/* Floating subtle gold sparkles */}
        <div className="absolute top-[18%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#B99245]/60 blur-[0.5px] animate-pulse" />
        <div className="absolute top-[35%] right-[20%] w-2 h-2 rounded-full bg-[#FFFDF8]/70 blur-[1px] animate-pulse" />
        <div className="absolute top-[65%] left-[25%] w-1.5 h-1.5 rounded-full bg-[#B99245]/40 blur-[0.5px]" />
      </div>

      {/* 
        LAYER 3 (z-index: 3): Swans and Water Reflection 
        Two white swans floating gently on the lake with water reflections, beaks forming a heart shape
      */}
      <SwanLayer isIntroComplete={isIntroComplete} />

      {/* 
        LAYER 4 (z-index: 4): Names, Date, and Invitation Texts
      */}
      {/* Top Header Information: “Toy günü” followed by date */}
      <div className="relative z-[4] pt-10 px-4 w-full flex flex-col items-center pointer-events-none">
        {/* 1. “Toy günü” — Starts 200ms after intro completes */}
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="inline-flex items-center gap-3"
        >
          <div className="h-[1px] w-8 bg-[#B99245]/60" />
          <span className="font-manrope text-xs md:text-sm font-semibold tracking-[0.28em] uppercase text-[#7A1830]">
            {invitationConfig.heroSubtitle}
          </span>
          <div className="h-[1px] w-8 bg-[#B99245]/60" />
        </motion.div>

        {/* 2. Date “20.09.2027” — Follows directly */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.6, delay: 0.38, ease: 'easeOut' }}
          className="mt-2.5 px-4 py-1 rounded-full bg-[#FFFDF8]/80 backdrop-blur-xs border border-[#B99245]/35 shadow-sm"
        >
          <p className="font-cormorant font-semibold text-base md:text-lg tracking-[0.2em] text-[#7A1830]">
            {invitationConfig.weddingDateFormatted}
          </p>
        </motion.div>
      </div>

      {/* Center Main Stage: “Nigar & Ali” */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={isIntroComplete ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.8, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-[4] px-4 my-auto flex flex-col items-center max-w-[380px] pointer-events-none"
      >
        {/* Monogram emblem */}
        <div className="w-14 h-14 rounded-full border border-[#B99245]/45 bg-[#FFFDF8]/70 backdrop-blur-xs flex items-center justify-center shadow-sm mb-3">
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

        <p className="font-cormorant text-sm italic tracking-widest text-[#75665F] mt-3 font-medium">
          Sizi toy mərasimimizə dəvət edirik
        </p>
      </motion.div>

      {/* 
        LAYER 5 (z-index: 5): Falling Rose Petals 
        10-12 delicate rose petals gently drifting downwards
      */}
      <PetalFall isIntroComplete={isIntroComplete} />

      {/* 
        LAYER 6 (z-index: 6): Bottom Scroll Indicator
        “Aşağı sürüşdürün” text & animated mouse icon
      */}
      <div 
        className="relative z-[6] pb-8 flex flex-col items-center cursor-pointer pointer-events-auto" 
        onClick={scrollToContent}
      >
        {/* “Aşağı sürüşdürün” text */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.75, ease: 'easeOut' }}
          className="font-manrope text-[11px] tracking-[0.2em] uppercase text-[#75665F] mb-2 font-medium"
        >
          Aşağı sürüşdürün
        </motion.span>

        {/* Animated Mouse & Chevron symbol */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isIntroComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.92, ease: 'easeOut' }}
          className="flex flex-col items-center gap-1 animate-float-gentle"
          role="button"
          tabIndex={0}
          aria-label="Aşağı sürüşdürün"
        >
          <div className="w-5 h-8 rounded-full border border-[#B99245]/70 flex items-start justify-center p-1 bg-[#FFFDF8]/60">
            <motion.div 
              className="w-1 h-2 rounded-full bg-[#7A1830]"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            />
          </div>
          <ChevronDown className="w-4 h-4 text-[#B99245] -mt-0.5" />
        </motion.div>
      </div>
    </section>
  );
};
