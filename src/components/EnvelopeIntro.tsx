import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { invitationConfig } from '../config/invitation.ts';
import { ChevronDown } from 'lucide-react';

export type IntroStage =
  | 'closed'
  | 'opening'
  | 'card-rising'
  | 'expanding'
  | 'complete';

interface EnvelopeIntroProps {
  onOpen: () => void;
  onAnimationComplete: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ onOpen, onAnimationComplete }) => {
  const [stage, setStage] = useState<IntroStage>('closed');
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [sealEffect, setSealEffect] = useState<'idle' | 'glow' | 'vanish'>('idle');
  const timeoutRef = useRef<number | null>(null);

  // Preload hero garden image ahead of transition
  useEffect(() => {
    const img = new Image();
    img.src = invitationConfig.assets.heroGarden;
  }, []);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Lock body scroll during entire transition
  useEffect(() => {
    if (stage !== 'complete') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [stage]);

  // Clean up any timers on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSealClick = () => {
    if (stage !== 'closed') return;
    onOpen(); // Trigger music on first user gesture

    if (isReducedMotion) {
      // 300ms simple fade transition if prefers-reduced-motion is active
      setStage('expanding');
      timeoutRef.current = window.setTimeout(() => {
        setStage('complete');
        onAnimationComplete();
      }, 300);
      return;
    }

    // Step 1: Seal scale & glow for 250ms, then disappear and start opening flaps
    setSealEffect('glow');
    timeoutRef.current = window.setTimeout(() => {
      setSealEffect('vanish');
      // Stage: opening starts
      setStage('opening');
    }, 250);
  };

  if (stage === 'complete') {
    return null;
  }

  const isExpanding = stage === 'expanding';

  return (
    <div
      id="envelope-intro-layer"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-auto"
      style={{
        width: '100vw',
        height: '100svh',
      }}
    >
      {/* Background paper texture & warm tone that crossfades to transparent during expansion */}
      <motion.div
        className="absolute inset-0 bg-[#FAF4E6]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 40%, rgba(255, 253, 248, 0.95), rgba(250, 244, 230, 0.95)), url('${invitationConfig.assets.paperTexture}')`,
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
        }}
        initial={{ opacity: 1 }}
        animate={{
          opacity: isExpanding ? 0 : 1,
        }}
        transition={{
          duration: 0.85,
          ease: 'easeInOut',
        }}
      />

      {/* Very faint warm golden light pulse during expansion: opacity 0 -> 0.22 -> 0 */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-30 bg-[#B99245]"
        initial={{ opacity: 0 }}
        animate={
          isExpanding
            ? { opacity: [0, 0.22, 0] }
            : { opacity: 0 }
        }
        transition={{
          duration: 0.9,
          times: [0, 0.5, 1],
          ease: 'easeInOut',
        }}
      />

      {/* Floating subtle gold sparkles */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 z-10"
        animate={{ opacity: isExpanding ? 0 : 0.4 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#B99245] blur-[1px] animate-pulse" />
        <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 rounded-full bg-[#B99245] blur-[1px] animate-ping" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[#FAF4E6] blur-[1px] animate-pulse" />
      </motion.div>

      {/* Envelope Stage Container */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: '1400px' }}
      >
        {/* Envelope Outer Shell (Flaps + Envelope Back): opacity 1 -> 0, scale 1 -> 1.04 on expanding */}
        <motion.div
          className="envelope-stage absolute pointer-events-none"
          animate={
            isExpanding
              ? { opacity: 0, scale: 1.04 }
              : { opacity: 1, scale: 1 }
          }
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Envelope Body Frame */}
          <div className="envelope-body paper-emboss">
            {/* 1. Envelope Back */}
            <div className="envelope-back" />

            {/* Warm glow between flaps when opening */}
            <motion.div
              className="warm-glow"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: stage === 'opening' || stage === 'card-rising' ? 0.75 : 0,
                scale: stage === 'opening' || stage === 'card-rising' ? 1.3 : 0.6,
              }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />

            {/* 3. Left Flap */}
            <motion.div
              className="envelope-left-flap"
              animate={{
                rotateY: stage !== 'closed' ? -38 : 0,
                x: stage !== 'closed' ? -14 : 0,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />

            {/* 4. Right Flap */}
            <motion.div
              className="envelope-right-flap"
              animate={{
                rotateY: stage !== 'closed' ? 38 : 0,
                x: stage !== 'closed' ? 14 : 0,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />

            {/* Bottom Flap */}
            <div className="envelope-bottom-flap" />

            {/* 2. Top Flap with 3D opening animation */}
            <motion.div
              className="envelope-top-flap"
              initial={{ rotateX: 0 }}
              animate={{
                rotateX: stage !== 'closed' ? 180 : 0,
                zIndex: stage !== 'closed' ? 1 : 5,
              }}
              transition={{
                duration: 0.55,
                ease: [0.4, 0, 0.2, 1],
              }}
              onAnimationComplete={() => {
                // Step 1 complete: flaps are fully open.
                // Step 2: "İçəridə görünən dəvətnamə kartı 250ms gözləsin."
                if (stage === 'opening') {
                  timeoutRef.current = window.setTimeout(() => {
                    setStage('card-rising');
                  }, 250);
                }
              }}
            />
          </div>
        </motion.div>

        {/* 
          Shared-Element Invitation Card:
          Transitions from inside the envelope:
          1. card-rising: y moves -40px over 300ms
          2. expanding: 
             - scale: 0.88 -> 1
             - opacity: 0.85 -> 1
             - borderRadius: 18px -> 0px
             - boxShadow: high -> 0
             - Expands to full viewport (width: 100%, height: 100svh / 100dvh) over 900ms
             - Contains the EXACT same hero garden image and overlay as InvitationHero
        */}
        <motion.div
          id="shared-invitation-card"
          className="absolute flex items-center justify-center overflow-hidden z-20"
          initial={{
            width: 'min(358px, 86vw)',
            height: 'min(512px, 74vh)',
            maxWidth: '430px',
            y: 0,
            scale: 0.88,
            opacity: 0.85,
            borderRadius: '18px',
            boxShadow: '0 20px 40px rgba(117, 102, 95, 0.35)',
          }}
          animate={
            stage === 'card-rising'
              ? {
                  width: 'min(358px, 86vw)',
                  height: 'min(512px, 74vh)',
                  maxWidth: '430px',
                  y: -40,
                  scale: 0.88,
                  opacity: 0.85,
                  borderRadius: '18px',
                  boxShadow: '0 25px 45px rgba(117, 102, 95, 0.4)',
                }
              : isExpanding
              ? {
                  width: '100%',
                  height: '100svh',
                  maxWidth: '430px',
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  borderRadius: '0px',
                  boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
                }
              : {
                  width: 'min(358px, 86vw)',
                  height: 'min(512px, 74vh)',
                  maxWidth: '430px',
                  y: 0,
                  scale: 0.88,
                  opacity: 0.85,
                  borderRadius: '18px',
                  boxShadow: '0 20px 40px rgba(117, 102, 95, 0.35)',
                }
          }
          transition={
            stage === 'card-rising'
              ? { duration: 0.3, ease: 'easeOut' }
              : isExpanding
              ? { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0 }
          }
          onAnimationComplete={() => {
            if (stage === 'card-rising') {
              // Step 4 & 5: Transition directly to expanding
              setStage('expanding');
            } else if (stage === 'expanding') {
              // Step 12: Expansion completed, seamlessly transition to hero!
              setStage('complete');
              onAnimationComplete();
            }
          }}
        >
          {/* Card Inner Background: The EXACT Hero Garden Image so there is NO visual disconnect */}
          <div className="absolute inset-0 z-0">
            <img
              src={invitationConfig.assets.heroGarden}
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform scale-105"
            />
            {/* Soft dreamy overlay identical to InvitationHero */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF8]/70 via-[#FAF4E6]/25 to-[#FAF4E6]/85" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#FAF4E6]/30 to-[#FAF4E6]/80" />
          </div>

          {/* Initial Card Parchment Cover (Fades out smoothly during expansion) */}
          <motion.div
            className="absolute inset-2 rounded-xl border border-[#B99245]/40 bg-[#FFFDF8]/95 p-6 flex flex-col items-center justify-between text-center z-10"
            initial={{ opacity: 1 }}
            animate={{ opacity: isExpanding ? 0 : 1 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {/* Corner Filigrees */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#B99245]/50" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#B99245]/50" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#B99245]/50" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#B99245]/50" />

            <div className="pt-2">
              <p className="font-manrope text-[10px] tracking-[0.25em] uppercase text-[#B99245] font-semibold">
                Toy Dəvətnaməsi
              </p>
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#B99245] to-transparent mx-auto mt-1" />
            </div>

            <div className="my-auto py-2">
              <div className="w-14 h-14 mx-auto rounded-full border border-[#B99245]/40 flex items-center justify-center mb-2 bg-[#FAF4E6]/50">
                <span className="font-cormorant text-xl font-bold tracking-wider text-[#7A1830]">
                  {invitationConfig.monogram}
                </span>
              </div>
              <h3 className="font-great-vibes text-3xl text-[#7A1830] leading-none mb-1">
                {invitationConfig.brideName} &amp; {invitationConfig.groomName}
              </h3>
              <p className="font-cormorant text-xs tracking-widest text-[#75665F] mt-1">
                {invitationConfig.weddingDateFormatted}
              </p>
            </div>

            <div className="pb-1">
              <p className="font-cormorant italic text-[11px] text-[#75665F] leading-tight">
                {invitationConfig.poeticQuote}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Wax Seal in Center (visible only in closed state and 250ms glow) */}
        <AnimatePresence>
          {stage === 'closed' && (
            <motion.div
              className="wax-seal-wrapper absolute z-40"
              onClick={handleSealClick}
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                scale: sealEffect === 'glow' ? 1.15 : 1,
                opacity: sealEffect === 'vanish' ? 0 : 1,
                filter:
                  sealEffect === 'glow'
                    ? 'drop-shadow(0 0 24px #B99245) drop-shadow(0 0 35px #FFFDF8)'
                    : 'drop-shadow(0 8px 15px rgba(122,24,48,0.4))',
              }}
              exit={{
                scale: 0.65,
                opacity: 0,
                transition: { duration: 0.25, ease: 'backIn' },
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {/* Wax Seal Button */}
              <div
                className="wax-seal cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label="Zərfi açmaq üçün toxunun"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSealClick();
                  }
                }}
              >
                <div className="w-[66px] h-[66px] rounded-full border border-[#B99245]/60 flex items-center justify-center p-1">
                  <div className="w-full h-full rounded-full border border-dashed border-[#B99245]/40 flex flex-col items-center justify-center bg-[#7A1830]/80 shadow-inner">
                    <span className="font-cormorant font-bold text-lg text-[#FAF4E6] tracking-wider drop-shadow-sm select-none">
                      {invitationConfig.monogram}
                    </span>
                    <svg
                      width="18"
                      height="6"
                      viewBox="0 0 18 6"
                      fill="none"
                      className="opacity-80"
                    >
                      <path
                        d="M0 3C4 0 8 6 9 3C10 0 14 6 18 3"
                        stroke="#B99245"
                        strokeWidth="0.8"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Subtitle & Arrow: "Açmaq üçün toxunun" */}
              <motion.div
                className="mt-4 flex flex-col items-center text-center select-none"
                animate={{ y: [0, 4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: 'easeInOut',
                }}
              >
                <ChevronDown className="w-4 h-4 text-[#B99245] animate-bounce" />
                <span className="font-manrope text-xs tracking-wider text-[#7A1830] font-medium bg-[#FFFDF8]/90 px-3 py-1 rounded-full shadow-sm border border-[#B99245]/30">
                  Açmaq üçün toxunun
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
