import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, ShieldCheck } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('alifin_cookie_consent');
    if (!hasAccepted) {
      // Small delay so it doesn't pop up instantly jarringly
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('alifin_cookie_consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-[400px] bg-white border-2 border-slate-200 rounded-[1.5rem] p-5 shadow-2xl shadow-slate-300/50 z-[100]"
        >
          <div className="flex gap-4 items-start">
            <div className="bg-emerald-100 p-3 rounded-[1rem] text-emerald-600 shrink-0 border border-emerald-200">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-slate-800 mb-1 text-lg">Penyimpanan Progres</h4>
              <p className="text-sm text-slate-500 mb-4 font-medium leading-relaxed">
                Kami menyimpan progres belajarmu (seperti level dan bintang) langsung di perangkat ini 
                agar datamu aman dan tidak hilang saat kamu kembali.
              </p>
              <button
                onClick={handleAccept}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-sm w-full flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                Oke, Saya Mengerti
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
