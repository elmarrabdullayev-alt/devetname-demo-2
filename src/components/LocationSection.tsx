import React from 'react';
import { invitationConfig } from '../config/invitation.ts';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export const LocationSection: React.FC = () => {
  const { venue } = invitationConfig;

  return (
    <section id="location-section" className="w-full py-10 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="font-manrope text-[11px] tracking-[0.25em] uppercase text-[#B99245] font-semibold">
          Təntənənin Ünvanı
        </span>
        <h2 className="font-great-vibes text-4xl sm:text-5xl text-[#7A1830] mt-1">
          Məkan
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#B99245] to-transparent mx-auto mt-2" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[390px] mx-auto bg-[#FFFDF8] rounded-2xl border border-[#B99245]/30 p-5 shadow-luxury relative overflow-hidden"
      >
        {/* Subtle decorative inner frame */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#B99245]/40" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#B99245]/40" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#B99245]/40" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#B99245]/40" />

        {/* Palace / Venue Architectural Illustration with soft transparent blend */}
        <div className="w-full h-44 rounded-xl overflow-hidden mb-4 bg-gradient-to-b from-[#FAF4E6]/50 to-[#FFFDF8] flex items-center justify-center relative border border-[#B99245]/20">
          <img
            src={venue.illustrationPath}
            alt={venue.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-contain mix-blend-multiply p-2 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF8] via-transparent to-transparent opacity-60" />
        </div>

        {/* Venue Title and Address */}
        <div className="text-center mb-5">
          <h3 className="font-cormorant font-bold text-2xl text-[#7A1830] tracking-wide">
            {venue.name}
          </h3>
          <p className="font-cormorant italic text-sm text-[#B99245] font-semibold mt-0.5">
            {venue.subName}
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[#75665F] mt-2">
            <MapPin className="w-4 h-4 text-[#7A1830] shrink-0" />
            <p className="font-manrope text-xs leading-relaxed">
              {venue.address}, {venue.city}
            </p>
          </div>
        </div>

        {/* Responsive Google Maps Iframe */}
        <div className="w-full h-48 rounded-xl overflow-hidden border border-[#B99245]/25 shadow-inner mb-4 relative bg-[#FAF4E6]">
          <iframe
            title="Məkanın xəritəsi"
            src={venue.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[25%] contrast-[1.05]"
          />
        </div>

        {/* "Xəritədə aç" Action Button */}
        <a
          href={venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="open-map-btn"
          className="w-full py-3 px-4 rounded-xl bg-[#7A1830] text-[#FFFDF8] font-manrope font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#5E1224] active:scale-[0.98] transition-all shadow-md"
        >
          <Navigation className="w-3.5 h-3.5 text-[#B99245]" />
          <span>Xəritədə aç</span>
          <ExternalLink className="w-3 h-3 opacity-70 ml-1" />
        </a>
      </motion.div>
    </section>
  );
};
