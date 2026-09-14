import React, { useState } from 'react';
import { EnvelopeIntro } from './components/EnvelopeIntro.tsx';
import { InvitationHero } from './components/InvitationHero.tsx';
import { Countdown } from './components/Countdown.tsx';
import { EventTimeline } from './components/EventTimeline.tsx';
import { LocationSection } from './components/LocationSection.tsx';
import { RSVPModal } from './components/RSVPModal.tsx';
import { MusicControl } from './components/MusicControl.tsx';
import { invitationConfig } from './config/invitation.ts';
import { motion } from 'motion/react';
import { Sparkles, Gift, Shirt } from 'lucide-react';

export default function App() {
  const [musicTriggered, setMusicTriggered] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  const handleEnvelopeOpen = () => {
    setMusicTriggered(true);
  };

  const handleAnimationComplete = () => {
    setIntroFinished(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-[#EFE5D1] py-0 sm:py-6 flex justify-center items-start selection:bg-[#B99245]/20 selection:text-[#7A1830]">
      {/* Interactive 3D Envelope Intro Layer with Shared-Element Transition */}
      <EnvelopeIntro
        onOpen={handleEnvelopeOpen}
        onAnimationComplete={handleAnimationComplete}
      />

      {/* Main Invitation Container: Mobile-First, max 430px */}
      <main
        id="wedding-invitation-container"
        className="w-full max-w-[430px] min-h-screen bg-[#FAF4E6] relative shadow-2xl overflow-x-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(255, 253, 248, 0.7), rgba(250, 244, 230, 0.95)), url('${invitationConfig.assets.paperTexture}')`,
          backgroundBlendMode: 'overlay',
          backgroundSize: '300px 300px',
        }}
      >
        {/* 1. Hero Section (100svh) with Sequential Text Fade-Up */}
        <InvitationHero isIntroComplete={introFinished} />

        {/* Cırılmış kağız keçidi (Torn Paper Edge Divider) */}
        <div className="relative w-full -mt-4 z-20 overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            className="w-full h-8 block text-[#FAF4E6] fill-current drop-shadow-sm"
          >
            <path d="M0,0 L20,18 Q45,8 70,22 T120,14 T170,26 T220,12 T270,24 T320,15 T370,28 T420,10 T470,22 T520,14 T570,26 T620,12 T670,25 T720,13 T770,24 T820,15 T870,28 T920,12 T970,24 T1020,14 T1070,26 T1120,12 T1170,25 L1200,18 L1200,40 L0,40 Z" />
          </svg>
        </div>

        {/* 2. DƏVƏT MƏTNİ (Invitation Text Card) */}
        <section
          id="invitation-quote-section"
          className="relative px-5 pt-4 pb-10 text-center"
        >
          {/* Light Pink & Ivory Floral Corner Ornaments */}
          <div className="absolute top-0 left-2 w-24 h-24 pointer-events-none opacity-80 overflow-hidden">
            <img
              src={invitationConfig.assets.floralTop}
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-left-top -rotate-45 scale-125"
            />
          </div>
          <div className="absolute top-0 right-2 w-24 h-24 pointer-events-none opacity-80 overflow-hidden">
            <img
              src={invitationConfig.assets.floralTop}
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-right-top rotate-45 scale-125"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-[370px] mx-auto bg-[#FFFDF8]/90 rounded-2xl border border-[#B99245]/35 p-6 shadow-luxury"
          >
            {/* Corner Filigree Borders */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#B99245]/50" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#B99245]/50" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#B99245]/50" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#B99245]/50" />

            {/* Arabic Calligraphy Placeholder */}
            <div className="mb-4">
              <p className="font-cormorant text-2xl text-[#7A1830] tracking-widest font-semibold">
                {invitationConfig.bismillahText}
              </p>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#B99245] to-transparent mx-auto mt-2" />
            </div>

            {/* Poetic quote: “İki ürək, bir tale, Allahın yazdığı bir ömür” */}
            <div className="my-5 px-2">
              <span className="font-great-vibes text-3xl sm:text-4xl text-[#7A1830] block leading-tight">
                “{invitationConfig.poeticQuote}”
              </span>
            </div>

            {/* Main invitation body text */}
            <p className="font-cormorant text-base sm:text-lg text-[#75665F] leading-relaxed text-center font-normal px-2">
              {invitationConfig.invitationText}
            </p>

            {/* Monogram emblem accent */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-8 h-[1px] bg-[#B99245]/40" />
              <div className="w-8 h-8 rounded-full border border-[#B99245]/50 flex items-center justify-center bg-[#FAF4E6]">
                <span className="font-cormorant text-xs font-bold text-[#7A1830]">
                  {invitationConfig.monogram}
                </span>
              </div>
              <div className="w-8 h-[1px] bg-[#B99245]/40" />
            </div>
          </motion.div>
        </section>

        {/* 3. GERİ SAYIM (Live Countdown) */}
        <section id="countdown-section" className="relative z-10">
          <Countdown />
        </section>

        {/* Cırılmış kağız keçidi 2 */}
        <div className="relative w-full my-4 z-10 overflow-hidden leading-none pointer-events-none opacity-80">
          <svg
            viewBox="0 0 1200 24"
            preserveAspectRatio="none"
            className="w-full h-5 block text-[#FAF4E6] fill-current"
          >
            <path d="M0,0 L25,12 Q50,4 75,15 T125,9 T175,18 T225,8 T275,16 T325,10 T375,19 T425,7 T475,15 T525,9 T575,17 T625,8 T675,17 T725,9 T775,16 T825,10 T875,19 T925,8 T975,16 T1025,9 T1075,17 T1125,8 T1175,17 L1200,12 L1200,24 L0,24 Z" />
          </svg>
        </div>

        {/* 4. TƏDBİR PROQRAMI (Event Timeline) */}
        <EventTimeline />

        {/* 5. MƏKAN (Venue & Responsive Map) */}
        <LocationSection />

        {/* 6. ƏLAVƏ MƏLUMATLAR: Dress-Code, Hədiyyə seçimi & RSVP */}
        <section id="details-section" className="w-full py-8 px-4 space-y-6">
          {/* Dress-Code Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[390px] mx-auto bg-[#FFFDF8] rounded-2xl border border-[#B99245]/30 p-5 shadow-luxury relative overflow-hidden"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#FAF4E6] border border-[#B99245]/50 flex items-center justify-center text-[#7A1830]">
                <Shirt className="w-4 h-4" />
              </div>
              <div>
                <span className="font-manrope text-[10px] tracking-[0.2em] uppercase text-[#B99245] font-semibold block">
                  Tövsiyə olunan geyim
                </span>
                <h3 className="font-cormorant font-bold text-xl text-[#7A1830]">
                  {invitationConfig.dressCode.title}
                </h3>
              </div>
            </div>

            <p className="font-cormorant text-sm text-[#75665F] leading-relaxed mb-4">
              {invitationConfig.dressCode.description}
            </p>

            {/* Color Palette Swatches */}
            <div>
              <p className="font-manrope text-[10px] uppercase tracking-wider text-[#75665F] font-semibold mb-2">
                Tədbir rəng çalarları:
              </p>
              <div className="flex items-center justify-between gap-2">
                {invitationConfig.dressCode.palette.map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div
                      className="w-8 h-8 rounded-full border border-white/80 shadow-xs ring-1 ring-black/10 mb-1"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-manrope text-[9px] text-[#75665F] text-center leading-tight">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Hədiyyə seçimi (Gift preference) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[390px] mx-auto bg-[#FFFDF8] rounded-2xl border border-[#B99245]/30 p-5 shadow-luxury text-center relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-full bg-[#FAF4E6] border border-[#B99245]/50 flex items-center justify-center text-[#7A1830] mx-auto mb-3">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="font-cormorant font-bold text-xl text-[#7A1830] mb-2">
              {invitationConfig.giftPreference.title}
            </h3>
            <p className="font-cormorant text-sm text-[#75665F] leading-relaxed max-w-[320px] mx-auto">
              {invitationConfig.giftPreference.description}
            </p>
            <div className="w-12 h-[1px] bg-[#B99245]/40 mx-auto my-2.5" />
            <p className="font-cormorant italic text-xs text-[#B99245] font-semibold">
              {invitationConfig.giftPreference.subNote}
            </p>
          </motion.div>

          {/* RSVP Section: Wax Seal Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[390px] mx-auto bg-gradient-to-b from-[#FFFDF8] to-[#FAF4E6] rounded-2xl border border-[#B99245]/40 p-6 shadow-luxury text-center relative"
          >
            <span className="font-manrope text-[10px] tracking-[0.25em] uppercase text-[#B99245] font-semibold block">
              Gözləyirik
            </span>
            <h3 className="font-great-vibes text-4xl text-[#7A1830] mt-1 mb-2">
              İştirakınızı Təsdiq Edin
            </h3>
            <p className="font-cormorant text-sm text-[#75665F] mb-6">
              Xahiş edirik tədbirdə iştirak durumunuzu aşağıdakı mum möhürə toxunaraq bildirin.
            </p>

            {/* Bordo mum möhürü şəklində RSVP düyməsi */}
            <div className="flex flex-col items-center">
              <button
                id="rsvp-wax-seal-button"
                onClick={() => setIsRSVPOpen(true)}
                className="group relative cursor-pointer focus:outline-none"
                aria-label="RSVP formasını aç"
              >
                {/* Outer pulsing ring */}
                <div className="absolute -inset-2 rounded-full border border-[#B99245]/40 animate-ping opacity-35 pointer-events-none" />

                {/* Wax Seal Body */}
                <div className="w-20 h-20 rounded-full wax-seal-button flex items-center justify-center p-1.5 shadow-xl transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
                  <div className="w-full h-full rounded-full border border-[#B99245]/60 flex flex-col items-center justify-center bg-[#7A1830]/90">
                    <span className="font-cormorant font-bold text-xs text-[#FAF4E6] tracking-widest uppercase">
                      RSVP
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#B99245] mt-0.5" />
                  </div>
                </div>
              </button>

              <span className="font-manrope text-[11px] text-[#7A1830] font-semibold mt-3 tracking-wider uppercase">
                Möhürə toxunun
              </span>
            </div>
          </motion.div>
        </section>

        {/* 7. YEKUN FOTO VƏ BAĞLANIŞ MƏTNİ (Closing Section) */}
        <section id="closing-section" className="w-full pt-6 pb-20 px-5 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-[360px] mx-auto flex flex-col items-center"
          >
            {/* Couple Wedding Portrait with Gold Frame */}
            <div className="relative w-64 h-80 rounded-2xl p-2 bg-[#FFFDF8] border border-[#B99245]/40 shadow-2xl mb-6 overflow-hidden">
              <div className="absolute inset-3 border border-[#B99245]/30 rounded-xl pointer-events-none z-10" />
              <img
                src={invitationConfig.closing.photoPath}
                alt="Nigar & Ali"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Poetic Closing Quote */}
            <p className="font-cormorant italic text-lg text-[#75665F] leading-relaxed max-w-[300px] mb-4">
              “{invitationConfig.closing.quote}”
            </p>

            {/* Couple Calligraphic Signature */}
            <div className="my-2">
              <p className="font-cormorant text-xs tracking-widest text-[#B99245] uppercase font-semibold">
                Sizi aramızda görmək arzusu ilə,
              </p>
              <h2 className="font-great-vibes text-5xl sm:text-6xl text-[#7A1830] mt-2">
                {invitationConfig.brideName} &amp; {invitationConfig.groomName}
              </h2>
            </div>

            <div className="mt-4 flex items-center justify-center gap-3 opacity-60">
              <div className="w-10 h-[1px] bg-[#B99245]" />
              <span className="font-cormorant text-xs text-[#75665F]">
                {invitationConfig.weddingDateFormatted}
              </span>
              <div className="w-10 h-[1px] bg-[#B99245]" />
            </div>
          </motion.div>
        </section>

        {/* Fixed Music Player Control */}
        <MusicControl shouldStart={musicTriggered} />

        {/* RSVP Modal Dialog */}
        <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
      </main>
    </div>
  );
}
