import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

import { playSound } from '../lib/sounds';
import { useAuth } from '../lib/AuthContext';

interface Props {
  onComplete: (name: string, gender: 'ikhwan' | 'akhwat') => void;
}

type Step = 'NAME' | 'GENDER';

export function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState<Step>('NAME');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'ikhwan' | 'akhwat' | null>(null);
  const { user } = useAuth();

  React.useEffect(() => {
    if (user?.displayName && !name) {
      setName(user.displayName);
    }
  }, [user]);

  const handleNext = (e?: React.FormEvent) => {
    playSound('transition');
    if (e) e.preventDefault();
    if (step === 'NAME') {
      if (name.trim()) setStep('GENDER');
    } else if (step === 'GENDER') {
      if (gender && name.trim()) {
        onComplete(name.trim(), gender);
      }
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4 sm:p-6 text-slate-800 relative z-10 w-full overflow-hidden">
      <div className="w-full max-w-md relative">
        <AnimatePresence mode="wait">
          {step === 'NAME' && (
            <motion.div
              key="name"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-[2.5rem] p-8 sm:p-10 text-center border-4 border-slate-200 border-b-[8px] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-sky-200/50 rounded-full blur-3xl -ml-16 -mt-16 pointer-events-none"></div>
              <form onSubmit={handleNext} className="flex flex-col relative z-10 w-full">
                <h2 className="text-2xl sm:text-3xl font-black mb-2 text-slate-800 text-center">Siapa namamu?</h2>
                <p className="text-center text-slate-500 font-medium mb-8">Biar kami bisa menyapamu dengan baik.</p>
                
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ketik namamu di sini..."
                  autoFocus
                  className="w-full px-6 py-5 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 outline-none text-xl font-bold transition-all bg-slate-50 text-center placeholder:text-slate-400 placeholder:font-medium mb-10 text-slate-800"
                  required
                />

                <button
                  type="submit"
                  disabled={!name.trim()}
                  className={`w-full font-black text-lg py-4 rounded-2xl flex items-center justify-center gap-3 transition-all ${
                     name.trim() 
                     ? "bg-emerald-500 border-emerald-700 border-b-[6px] active:border-b-0 active:translate-y-[6px] text-white cursor-pointer"
                     : "bg-slate-200 border-slate-300 border-b-[6px] text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Lanjut
                  <ArrowRight className="w-6 h-6" />
                </button>
              </form>
            </motion.div>
          )}

          {step === 'GENDER' && (
            <motion.div
              key="gender"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-[2.5rem] p-8 sm:p-10 text-center border-4 border-slate-200 border-b-[8px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200/50 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-black mb-2 text-slate-800 text-center">Halo, {name}!</h2>
                <p className="text-center text-slate-500 font-medium mb-8">Pilih avatar santri untuk mulai.</p>
                
                <div className="grid grid-cols-2 gap-4 mb-10 w-full">
                  <button
                    type="button"
                    onClick={() => setGender('ikhwan')}
                    className={`flex flex-col items-center justify-center py-6 sm:py-8 rounded-[1.5rem] border-2 transition-all duration-200 w-full ${
                      gender === 'ikhwan' 
                        ? 'border-blue-500 border-b-[6px] bg-blue-50 text-blue-600 scale-105 active:border-b-0 active:translate-y-[6px]' 
                        : 'border-slate-200 border-b-[6px] bg-white text-slate-400 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 bg-slate-100 rounded-full flex items-center justify-center border-2 border-slate-200 overflow-hidden">
                       <img src="/ikhwan.png" alt="Ikhwan" className="w-[120%] h-[120%] object-cover mt-2" />
                    </div>
                    <span className="font-black text-sm sm:text-lg tracking-wide uppercase">Ikhwan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('akhwat')}
                    className={`flex flex-col items-center justify-center py-6 sm:py-8 rounded-[1.5rem] border-2 transition-all duration-200 w-full ${
                      gender === 'akhwat' 
                        ? 'border-pink-500 border-b-[6px] bg-pink-50 text-pink-600 scale-105 active:border-b-0 active:translate-y-[6px]' 
                        : 'border-slate-200 border-b-[6px] bg-white text-slate-400 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 bg-slate-100 rounded-full flex items-center justify-center border-2 border-slate-200 overflow-hidden">
                       <img src="/akhwat.png" alt="Akhwat" className="w-[120%] h-[120%] object-cover mt-2" />
                    </div>
                    <span className="font-black text-sm sm:text-lg tracking-wide uppercase">Akhwat</span>
                  </button>
                </div>

                <button
                  onClick={() => handleNext()}
                  disabled={!gender}
                  className={`w-full font-black text-lg py-4 rounded-2xl flex items-center justify-center gap-3 transition-all ${
                    gender 
                    ? "bg-emerald-500 border-emerald-700 border-b-[6px] active:border-b-0 active:translate-y-[6px] text-white cursor-pointer"
                    : "bg-slate-200 border-slate-300 border-b-[6px] text-slate-400 cursor-not-allowed"
                 }`}
                >
                  Mulai Belajar Sekarang!
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
