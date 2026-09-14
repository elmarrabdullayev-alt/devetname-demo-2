import React from 'react';
import { invitationConfig } from '../config/invitation.ts';
import { motion } from 'motion/react';

export const EventTimeline: React.FC = () => {
  return (
    <section id="event-timeline" className="w-full py-10 px-4">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="font-manrope text-[11px] tracking-[0.25em] uppercase text-[#B99245] font-semibold">
          Günün Ahəngi
        </span>
        <h2 className="font-great-vibes text-4xl sm:text-5xl text-[#7A1830] mt-1">
          Tədbir Proqramı
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#B99245] to-transparent mx-auto mt-2" />
      </div>

      {/* Vertical Timeline container */}
      <div className="relative max-w-[370px] mx-auto">
        {/* Center vertical thin gold line */}
        <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-transparent via-[#B99245]/60 to-transparent" />

        <div className="space-y-7 relative">
          {invitationConfig.timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            const isHighlight = index === 1; // 18:00 Nikah mərasimi with decorative rose

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-center justify-between"
              >
                {/* Left side content (or empty space if odd) */}
                <div className={`w-[42%] ${isEven ? 'text-right pr-3' : 'order-2 text-left pl-3'}`}>
                  <span className="font-cormorant font-bold text-lg text-[#7A1830] block leading-tight">
                    {item.time}
                  </span>
                  <h3 className="font-cormorant font-semibold text-base text-[#2A2523] leading-tight mt-0.5">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="font-manrope text-[11px] text-[#75665F] leading-snug mt-1 opacity-90">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Center marker: Diamond or decorative rose at highlight point */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                  {isHighlight ? (
                    <div className="relative flex items-center justify-center">
                      {/* Decorative delicate rose badge */}
                      <div className="w-7 h-7 rounded-full bg-[#FFFDF8] border border-[#B99245] shadow-sm flex items-center justify-center p-0.5">
                        {/* Rose SVG symbol */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#7A1830]">
                          <path
                            d="M12 4C10 2 6 3 6 7C6 11 12 15 12 15C12 15 18 11 18 7C18 3 14 2 12 4Z"
                            fill="#7A1830"
                            opacity="0.85"
                          />
                          <path
                            d="M12 15C12 15 11 18 11 20C11 21.5 12 22 12 22"
                            stroke="#B99245"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M11 18C13 17 15 18 16 19"
                            stroke="#B99245"
                            strokeWidth="1"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    /* Romb (diamond) marker */
                    <div className="w-3.5 h-3.5 rotate-45 bg-[#FFFDF8] border-2 border-[#B99245] shadow-xs" />
                  )}
                </div>

                {/* Opposite side balance space */}
                <div className={`w-[42%] ${isEven ? 'order-2 pl-3' : 'text-right pr-3'}`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
