import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/envelope-animated-intro.css';

// Media paths required by specification
const introPoster = '/invitation/envelope-closed.webp';
const introVideo = '/invitation/envelope-opening.mp4';
const heroPoster = '/invitation/hero-poster.webp';
const heroVideo = '/invitation/hero-motion.mp4';

// Transition timing constants required by specification
const TEXT_FADE_OUT_MS = 300;
const FINAL_HOLD_MS = 500;
const CROSSFADE_MS = 900;
const HERO_ZOOM_MS = 1400;

export type IntroStage =
  | 'idle'
  | 'starting'
  | 'playing'
  | 'final-hold'
  | 'transitioning'
  | 'completed';

interface EnvelopeAnimatedIntroProps {
  onOpen: () => void;
  onAnimationComplete: () => void;
  isVideoReady?: boolean;
}

export const EnvelopeAnimatedIntro: React.FC<EnvelopeAnimatedIntroProps> = ({
  onOpen,
  onAnimationComplete,
  isVideoReady = false,
}) => {
  const [stage, setStage] = useState<IntroStage>('idle');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timersRef = useRef<number[]>([]);

  // Clear all pending timeouts safely
  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  }, []);

  // Schedule timer helper
  const scheduleTimer = useCallback((fn: () => void, delayMs: number) => {
    const id = window.setTimeout(fn, delayMs);
    timersRef.current.push(id);
    return id;
  }, []);

  // Preload hero assets in background
  useEffect(() => {
    const posterImg = new Image();
    posterImg.src = heroPoster;
    posterImg.onerror = () => {
      console.error('Failed to preload hero-poster.webp:', heroPoster);
    };

    const nextVideo = document.createElement('video');
    nextVideo.src = heroVideo;
    nextVideo.preload = 'auto';
  }, []);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Lock body scroll during intro; unlock only when fully completed
  useEffect(() => {
    if (stage !== 'completed') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [stage]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  // Fallback if envelope-opening.mp4 cannot be loaded or played
  const handleFallback = useCallback(() => {
    console.error('Envelope opening video failed to load or play:', introVideo);
    clearAllTimers();
    setStage('completed');
    onAnimationComplete();
  }, [clearAllTimers, onAnimationComplete]);

  // Triggered when user taps anywhere on screen
  const handleStartIntro = async () => {
    // 1. Təkrar toxunmaları blokla
    if (stage !== 'idle') return;

    // Musiqini həmin istifadəçi toxunuşu kontekstində başlat
    try {
      onOpen();
    } catch (err) {
      console.warn('Audio play attempt on user gesture:', err);
    }

    // Prefers reduced motion check
    if (isReducedMotion) {
      setStage('transitioning');
      scheduleTimer(() => {
        setStage('completed');
        onAnimationComplete();
      }, 400);
      return;
    }

    // 2. “Açmaq üçün ekrana toxunun” yazısını 300 ms-də fade-out et
    setStage('starting');

    scheduleTimer(async () => {
      const video = videoRef.current;
      if (!video) {
        handleFallback();
        return;
      }

      // 3. Videonu həmişə sıfırıncı saniyədən başlat
      try {
        video.currentTime = 0;
        setStage('playing');
        await video.play();
      } catch (err) {
        console.error('Failed to play envelope-opening.mp4:', introVideo, err);
        handleFallback();
      }
    }, TEXT_FADE_OUT_MS);
  };

  // 6 & 7. Video bitməsini YALNIZ onEnded ilə müəyyən et (setTimeout ilə təxmin etmə)
  const handleVideoEnded = () => {
    // Videonun son kadrını 500 ms ekranda saxla
    setStage('final-hold');

    scheduleTimer(() => {
      // Sonra 900 ms-lik yumşaq crossfade başlat:
      // envelope-opening.mp4 opacity 1 -> 0, hero-poster.webp opacity 0 -> 1
      setStage('transitioning');

      scheduleTimer(() => {
        // Crossfade tamamlandıqdan sonra intro komponentini DOM-dan çıxar
        setStage('completed');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        onAnimationComplete();
      }, CROSSFADE_MS);
    }, FINAL_HOLD_MS);
  };

  // Intro tam başa çatdıqda DOM-dan tam çıxar
  if (stage === 'completed') {
    return null;
  }

  const isCrossfading = stage === 'transitioning';
  const showVideoLayer = stage === 'playing' || stage === 'final-hold' || stage === 'transitioning';

  return (
    <div
      id="envelope-animated-intro"
      className="animated-intro-viewport"
      role="region"
      aria-label="Toy Dəvətnaməsi Zərf Açılışı"
    >
      {/* Desktop Viewport Ambient Background */}
      <div className="animated-intro-ambient" aria-hidden="true">
        <div
          className="animated-intro-ambient-image"
          style={{ backgroundImage: `url(${introPoster})` }}
        />
        <div className="animated-intro-ambient-overlay" />
      </div>

      {/* Main Container (480px max-width, 100dvh) */}
      <div className="animated-intro-container">
        {/*
          LAYER A: Arxa planda hazır duran Hero Poster
          Crossfade zamanı (stage === 'transitioning') opacity 0 -> 1 (900 ms)
          Hero şəklinə scale 1.03 -> 1 çox zəif zoom-out (1400 ms)
        */}
        <img
          src={heroPoster}
          alt="Nigar & Ali Hero"
          aria-hidden="true"
          className="intro-media-layer"
          style={{
            zIndex: 1,
            opacity: isCrossfading ? 1 : 0,
            transform: isCrossfading ? 'scale(1)' : 'scale(1.03)',
            transition: `opacity ${CROSSFADE_MS}ms cubic-bezier(0.65, 0, 0.35, 1), transform ${HERO_ZOOM_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
          onError={handleFallback}
        />

        {/*
          LAYER B: Bağlı Zərf Posteri (envelope-closed.webp)
          Video başlamazdan əvvəl dərhal görünür.
          Video başladıqda (showVideoLayer) gizlənir.
        */}
        <img
          src={introPoster}
          alt="Bağlı Zərf"
          fetchPriority="high"
          className="intro-media-layer"
          style={{
            zIndex: 2,
            opacity: showVideoLayer ? 0 : 1,
            transition: showVideoLayer ? 'opacity 150ms ease-out' : 'none',
          }}
          onError={handleFallback}
        />

        {/*
          LAYER C: MP4 Əsaslı Açılış Videosu (envelope-opening.mp4)
          - loop YOXDUR
          - controls YOXDUR
          - muted
          - playsInline
          - disablePictureInPicture
          - poster="/invitation/envelope-closed.webp"
          - onEnded ilə bitmə dəqiq təyin olunur
          - Crossfade anında opacity 1 -> 0 keçir (900 ms)
        */}
        <video
          ref={videoRef}
          src={introVideo}
          playsInline
          muted
          loop={false}
          controls={false}
          disablePictureInPicture
          preload="auto"
          poster={introPoster}
          aria-hidden="true"
          onLoadedData={() => setIsVideoLoaded(true)}
          onEnded={handleVideoEnded}
          onError={handleFallback}
          className="intro-media-layer"
          style={{
            zIndex: 3,
            opacity: !showVideoLayer ? 0 : isCrossfading ? 0 : 1,
            transition: isCrossfading
              ? `opacity ${CROSSFADE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`
              : 'none',
          }}
        />

        {/*
          LAYER D: Bütün ekranı örtən şəffaf toxunma sahəsi
          - Qırmızı dairə, mum möhürü, monoqram, rəngli pill düyməsi YOXDUR
          - Bütün ekran toxunulan sahədir
          - Yalnız aşağı hissədə çox incə, kiçik mətn: “Açmaq üçün ekrana toxunun”
        */}
        <button
          type="button"
          onClick={handleStartIntro}
          disabled={stage !== 'idle'}
          className="animated-intro-tap-area"
          aria-label="Dəvətnaməni aç"
        >
          <span
            className={`animated-intro-prompt-text ${stage !== 'idle' ? 'fade-out' : ''}`}
          >
            Açmaq üçün ekrana toxunun
          </span>
        </button>
      </div>
    </div>
  );
};
