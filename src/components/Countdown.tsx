import React, { useState, useEffect } from 'react';
import { invitationConfig } from '../config/invitation.ts';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export const Countdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date(invitationConfig.weddingDateISO).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days: Math.max(0, days),
      hours: Math.max(0, hours),
      minutes: Math.max(0, minutes),
      seconds: Math.max(0, seconds),
      isPassed: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const timeBlocks = [
    { label: 'Gün', value: timeLeft.days },
    { label: 'Saat', value: formatNumber(timeLeft.hours) },
    { label: 'Dəqiqə', value: formatNumber(timeLeft.minutes) },
    { label: 'Saniyə', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <div id="countdown-timer" className="w-full my-6 px-4">
      {/* Title */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-6 h-[1px] bg-[#B99245]/50" />
        <span className="font-manrope text-[11px] uppercase tracking-[0.2em] font-semibold text-[#7A1830]">
          Böyük Günə Qalan Vaxt
        </span>
        <div className="w-6 h-[1px] bg-[#B99245]/50" />
      </div>

      {/* Countdown Grid */}
      <div className="grid grid-cols-4 gap-2 max-w-[360px] mx-auto">
        {timeBlocks.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#FFFDF8] border border-[#B99245]/30 shadow-sm relative overflow-hidden"
          >
            {/* Subtle inner corner accent */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#B99245]/40" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#B99245]/40" />

            <span className="font-cormorant text-2xl sm:text-3xl font-bold text-[#7A1830] tracking-tight leading-none">
              {item.value}
            </span>
            <span className="font-manrope text-[10px] text-[#75665F] uppercase tracking-wider mt-1.5 font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {timeLeft.isPassed && (
        <p className="text-center font-cormorant italic text-[#7A1830] text-sm mt-3">
          Toy mərasimimiz başladı! Sevincimizə şərik olduğunuz üçün təşəkkür edirik.
        </p>
      )}
    </div>
  );
};
