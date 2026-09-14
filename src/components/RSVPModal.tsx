import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Heart, User, Phone, Users, MessageSquare } from 'lucide-react';
import { invitationConfig } from '../config/invitation.ts';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [attendance, setAttendance] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    // Save to localStorage for persistence
    try {
      const existingResponses = JSON.parse(localStorage.getItem('wedding_rsvp_responses') || '[]');
      existingResponses.push({
        fullName,
        attendance,
        guestCount: attendance === 'yes' ? guestCount : 0,
        phone,
        notes,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('wedding_rsvp_responses', JSON.stringify(existingResponses));
    } catch {
      // safe fallback
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setAttendance('yes');
    setGuestCount(1);
    setPhone('');
    setNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2A2523]/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-[390px] bg-[#FFFDF8] rounded-2xl border border-[#B99245]/40 shadow-2xl p-6 z-10 my-8 overflow-hidden text-[#2A2523]"
          >
            {/* Top decorative corner accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#B99245]/50" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#B99245]/50" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#B99245]/50" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#B99245]/50" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full text-[#75665F] hover:text-[#7A1830] hover:bg-[#FAF4E6] transition-colors"
              aria-label="Bağla"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#FAF4E6] border border-[#B99245] flex items-center justify-center text-[#7A1830] mb-4 shadow-sm">
                  <Heart className="w-8 h-8 fill-[#7A1830]" />
                </div>
                <h3 className="font-great-vibes text-4xl text-[#7A1830] mb-2">
                  Təşəkkür edirik!
                </h3>
                <p className="font-cormorant text-lg text-[#75665F] leading-relaxed max-w-[280px]">
                  {attendance === 'yes'
                    ? 'Cavabınız böyük sevgiylə qeydə alındı. Sizi aramızda görməyi səbirsizliklə gözləyirik!'
                    : 'Diqqətiniz üçün təşəkkür edirik. Dualarınız və xoş arzularınız bizim üçün dəyərlidir.'}
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#7A1830] text-[#FFFDF8] font-manrope text-xs uppercase tracking-wider font-semibold shadow-md hover:bg-[#5E1224] transition-colors"
                >
                  Tamamla
                </button>
              </div>
            ) : (
              <div>
                {/* Modal Title */}
                <div className="text-center mb-5">
                  <span className="font-manrope text-[10px] tracking-[0.25em] uppercase text-[#B99245] font-semibold">
                    İştirak Təsdiqi
                  </span>
                  <h3 className="font-great-vibes text-3xl sm:text-4xl text-[#7A1830] mt-0.5">
                    RSVP
                  </h3>
                  <p className="font-cormorant text-xs text-[#75665F] italic mt-1">
                    Xahiş edirik ən geci {invitationConfig.rsvp.deadline} tarixinədək cavablandırın
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block font-manrope text-[11px] uppercase tracking-wider text-[#75665F] font-semibold mb-1">
                      Ad və Soyadınız *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#B99245] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Məsələn: Rəşad Əliyev"
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[#B99245]/35 bg-[#FAF4E6]/40 focus:outline-none focus:border-[#7A1830] focus:ring-1 focus:ring-[#7A1830] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Attendance Choice */}
                  <div>
                    <label className="block font-manrope text-[11px] uppercase tracking-wider text-[#75665F] font-semibold mb-1.5">
                      İştirak statusu *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAttendance('yes')}
                        className={`py-2 px-3 rounded-xl border text-xs font-manrope font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          attendance === 'yes'
                            ? 'bg-[#7A1830] border-[#7A1830] text-[#FFFDF8] shadow-sm'
                            : 'bg-[#FAF4E6]/30 border-[#B99245]/30 text-[#75665F] hover:bg-[#FAF4E6]'
                        }`}
                      >
                        {attendance === 'yes' && <Check className="w-3.5 h-3.5 text-[#B99245]" />}
                        <span>İştirak edəcəyəm</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAttendance('no')}
                        className={`py-2 px-3 rounded-xl border text-xs font-manrope font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          attendance === 'no'
                            ? 'bg-[#7A1830] border-[#7A1830] text-[#FFFDF8] shadow-sm'
                            : 'bg-[#FAF4E6]/30 border-[#B99245]/30 text-[#75665F] hover:bg-[#FAF4E6]'
                        }`}
                      >
                        {attendance === 'no' && <Check className="w-3.5 h-3.5 text-[#B99245]" />}
                        <span>Gələ bilməyəcəyəm</span>
                      </button>
                    </div>
                  </div>

                  {/* Guest count (if attending) */}
                  {attendance === 'yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="block font-manrope text-[11px] uppercase tracking-wider text-[#75665F] font-semibold mb-1">
                        Qonaq sayı
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 text-[#B99245] absolute left-3 top-1/2 -translate-y-1/2" />
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[#B99245]/35 bg-[#FAF4E6]/40 focus:outline-none focus:border-[#7A1830] focus:ring-1 focus:ring-[#7A1830]"
                        >
                          <option value={1}>1 nəfər (Yalnız mən)</option>
                          <option value={2}>2 nəfər (+1 qonaq)</option>
                          <option value={3}>3 nəfər (Ailəliklə)</option>
                          <option value={4}>4 nəfər</option>
                          <option value={5}>5 nəfər və daha çox</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Phone number */}
                  <div>
                    <label className="block font-manrope text-[11px] uppercase tracking-wider text-[#75665F] font-semibold mb-1">
                      Əlaqə telefonu
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#B99245] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+994 (__) ___-__-__"
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[#B99245]/35 bg-[#FAF4E6]/40 focus:outline-none focus:border-[#7A1830] focus:ring-1 focus:ring-[#7A1830]"
                      />
                    </div>
                  </div>

                  {/* Additional notes */}
                  <div>
                    <label className="block font-manrope text-[11px] uppercase tracking-wider text-[#75665F] font-semibold mb-1">
                      Xoş arzularınız və ya qeydlər
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-[#B99245] absolute left-3 top-3" />
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Təbriklər və xüsusi istəkləriniz..."
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#B99245]/35 bg-[#FAF4E6]/40 focus:outline-none focus:border-[#7A1830] focus:ring-1 focus:ring-[#7A1830]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#7A1830] text-[#FFFDF8] font-manrope font-semibold text-xs tracking-widest uppercase hover:bg-[#5E1224] transition-all shadow-md active:scale-[0.98] mt-2"
                  >
                    Cavabı göndər
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
