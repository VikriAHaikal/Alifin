import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Map, Trophy, BookOpen, Star, LogOut, Play, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { IQRA_VOLUMES, STAGES_PER_VOLUME } from '../data/hijaiyah';
import { playSound } from '../lib/sounds';

interface Props {
  name: string;
  gender: 'ikhwan' | 'akhwat';
  maxLevel: number;
  points: number;
  levelScores?: Record<number, number>;
  onNavigate: (view: 'MAP' | 'LEARNING' | 'PROFILE') => void;
  onReset: () => void;
  isGuest?: boolean;
  onLogin?: () => void;
}

export function Dashboard({ name, gender, maxLevel, points, levelScores = {}, onNavigate, onReset, isGuest, onLogin }: Props) {
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  
  const totalStars = Object.values(levelScores).reduce((acc, score) => acc + score, 0);
  
  const getRank = (stars: number) => {
    if (stars < 35) return 'Pemula';
    if (stars < 70) return 'Rajin';
    if (stars < 140) return 'Pencari Ilmu';
    if (stars < 200) return 'Pejuang Hijaiyah';
    return 'Bintang Iqra';
  };

  const currentVolume = Math.ceil(Math.min(maxLevel, IQRA_VOLUMES * STAGES_PER_VOLUME) / STAGES_PER_VOLUME);
  const currentStageInVolume = (maxLevel - 1) % STAGES_PER_VOLUME + 1;

  return (
    <div className="min-h-[100dvh] pb-8 pt-6 px-4 sm:px-6 md:px-8 flex flex-col items-center relative z-10 w-full max-w-7xl mx-auto">
      
      {/* Top Header - Mobile friendly row */}
      <div className="w-full flex justify-between items-center mb-8 bg-white/60 p-3 pr-4 rounded-3xl border-2 border-slate-200/50 backdrop-blur-md">
         <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-full border-2 border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
               <img src={gender === 'ikhwan' ? '/ikhwan.png' : '/akhwat.png'} alt="Avatar" className="w-[120%] h-[120%] object-cover mt-2" />
             </div>
             <div>
                <h1 className="text-lg sm:text-xl font-black text-slate-800 leading-tight truncate max-w-[120px] sm:max-w-[200px]">{name}</h1>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{gender === 'ikhwan' ? 'Ikhwan' : 'Akhwat'}</p>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <p className="text-xs font-bold text-emerald-600 tracking-wide">{getRank(totalStars)}</p>
                </div>
             </div>
         </div>

         <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-amber-100 px-3 py-1.5 rounded-2xl border-2 border-amber-200">
               <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
               <span className="font-black text-amber-600 text-lg">{totalStars}</span>
            </div>
            <button 
              onClick={() => { playSound('click'); setShowConfirmLogout(true); }}
              className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 hover:text-red-500 active:scale-95 transition-all border-2 border-slate-200"
              title="Keluar"
            >
              <LogOut className="w-5 h-5 ml-1" />
            </button>
         </div>
      </div>

      <div className="flex flex-col gap-4 w-full mb-6">
        {/* Main CTA - "Mulai Belajar" */}
        <motion.button
          whileHover={{ y: -4 }}
          whileTap={{ y: 0 }}
          onClick={() => onNavigate('MAP')}
          className="w-full bg-emerald-500 border-emerald-700 border-b-[8px] active:border-b-0 active:translate-y-[8px] p-6 sm:p-8 rounded-[2rem] flex flex-col sm:flex-row items-center gap-6 transition-all group relative overflow-hidden text-left"
        >
          {/* Decorative shine */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

          <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-[1.5rem] bg-white/20 flex items-center justify-center text-white backdrop-blur shadow-inner">
             <Map className="w-10 h-10 ml-1 fill-white" />
          </div>
          
          <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0 relative z-10 w-full">
            <div className="inline-block bg-white/20 text-white px-3 py-1 rounded-xl text-xs font-black uppercase tracking-widest mb-3 backdrop-blur shadow-sm">
                Iqra {currentVolume} - Tahap {currentStageInVolume}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 leading-tight">
              Peta Pembelajaran
            </h2>
            <p className="text-emerald-100 font-medium text-sm sm:text-base">
              Lanjutkan progres belajarmu hari ini!
            </p>
          </div>
        </motion.button>
      </div>

      <div className="flex flex-col gap-4 w-full mb-8">
        {isGuest && (
          <div className="w-full bg-blue-50 border-2 border-blue-200 border-b-[6px] rounded-[2rem] p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
               <h3 className="text-lg font-black text-slate-800 mb-1">Simpan Progresmu</h3>
               <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-sm">
                 Jangan sampai kehilangan medali dan bintangmu! Masuk dengan Google untuk menyimpan otomatis ke cloud.
               </p>
            </div>
            <button 
              onClick={onLogin}
              className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap"
            >
              Login dengan Google
            </button>
          </div>
        )}
      </div>

      {/* Achievement / Stats */}
      <div className="w-full bg-white border-2 border-slate-200 border-b-[6px] rounded-[2rem] p-6 shadow-sm flex flex-col gap-5">
         <div className="flex items-center gap-5">
           <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0 border-2 border-amber-200">
             <Trophy className="w-7 h-7 text-amber-500" />
           </div>
           <div className="flex-1 min-w-0">
             <h3 className="text-lg font-black text-slate-800 mb-1">Koleksi Medali</h3>
             <p className="text-slate-500 font-medium text-sm leading-relaxed">
               Selesaikan tahap tiap Iqra untuk mendapatkan medali.
             </p>
           </div>
         </div>
         
         <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 snap-x">
           {Array.from({ length: IQRA_VOLUMES }).map((_, i) => {
             const vol = i + 1;
             const isUnlocked = currentVolume > vol || (currentVolume === vol && currentStageInVolume === STAGES_PER_VOLUME && levelScores[maxLevel] >= 4);
             return (
               <div key={vol} className={`snap-center shrink-0 w-24 h-28 rounded-2xl flex flex-col items-center justify-center border-2 gap-2 relative transition-all ${isUnlocked ? 'bg-gradient-to-b from-amber-50 to-amber-100 border-amber-300 shadow-sm' : 'bg-slate-50 border-slate-200 border-dashed opacity-50'}`}>
                 {isUnlocked && <div className="absolute inset-0 bg-white/20 rounded-2xl z-0" />}
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 ${isUnlocked ? 'bg-amber-400 text-amber-950 shadow-inner' : 'bg-slate-200 text-slate-400'}`}>
                    <BookOpen className="w-6 h-6" />
                 </div>
                 <span className={`text-xs font-black relative z-10 text-center px-1 ${isUnlocked ? 'text-amber-700' : 'text-slate-400'}`}>
                   Iqra {vol}
                 </span>
               </div>
             );
           })}
         </div>
      </div>
      
      <AnimatePresence>
        {showConfirmLogout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => { playSound('back'); setShowConfirmLogout(false); }}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full relative z-10 shadow-xl border-4 border-slate-200"
            >
               <h3 className="text-xl font-black text-slate-800 mb-2">Keluar Aplikasi</h3>
               {isGuest ? (
                 <p className="text-slate-500 mb-6 font-medium leading-relaxed">Kamu sedang dalam Mode Tamu. Yakin ingin keluar? <span className="font-bold text-red-500 block mt-1">Semua progres belajarmu akan hilang!</span></p>
               ) : (
                 <p className="text-slate-500 mb-6 font-medium leading-relaxed">Yakin ingin keluar dari akunmu?</p>
               )}
               
               <div className="flex gap-3">
                 <button 
                   onClick={() => { playSound('back'); setShowConfirmLogout(false); }}
                   className="flex-1 bg-slate-100 text-slate-600 p-3 sm:p-4 rounded-xl font-bold hover:bg-slate-200 active:scale-95 transition-all border-2 border-slate-200 border-b-[4px] active:border-b-2 active:translate-y-[2px]"
                 >
                   Batal
                 </button>
                 <button 
                   onClick={() => {
                     playSound('transition');
                     setShowConfirmLogout(false);
                     onReset();
                   }}
                   className="flex-1 bg-red-500 text-white p-3 sm:p-4 rounded-xl font-bold hover:bg-red-400 active:scale-95 transition-all border-2 border-red-700 border-b-[4px] active:border-b-2 active:translate-y-[2px]"
                 >
                   Ya, Keluar
                 </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
