import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { invitationConfig } from '../config/invitation.ts';

interface MusicControlProps {
  shouldStart?: boolean;
}

export const MusicControl: React.FC<MusicControlProps> = ({ shouldStart }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(invitationConfig.assets.music);
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // When triggered externally (e.g. from user tapping wax seal in EnvelopeIntro)
  useEffect(() => {
    if (shouldStart && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy without user gesture; silently ignore
          setIsPlaying(false);
        });
    }
  }, [shouldStart]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  return (
    <div
      id="music-control"
      className="fixed bottom-5 right-4 sm:right-[max(1rem,calc(50%-200px))] z-[20] select-none"
    >
      <button
        onClick={togglePlay}
        className={`relative w-12 h-12 rounded-full bg-[#7A1830] text-[#FFFDF8] border border-[#B99245]/70 shadow-luxury flex items-center justify-center transition-all duration-300 active:scale-95 ${
          isPlaying ? 'ring-2 ring-[#B99245]/50 ring-offset-2 ring-offset-[#FAF4E6]' : 'opacity-85'
        }`}
        aria-label={isPlaying ? 'Musiqini dayandır' : 'Musiqini səsləndir'}
        title={isPlaying ? 'Musiqini dayandır' : 'Musiqini səsləndir'}
      >
        {/* Subtle rotating disc effect when playing */}
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Music className="w-5 h-5 text-[#FAF4E6] animate-[spin_4s_linear_infinite]" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B99245] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B99245]" />
            </span>
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-[#FAF4E6]/80" />
        )}
      </button>
    </div>
  );
};
