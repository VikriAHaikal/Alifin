import { useState } from 'react';
import { motion } from 'motion/react';
import { Map, Trophy, BookOpen, Star, LogOut, Play, MessageCircle, Volume2, VolumeX, Settings, Award } from 'lucide-react';
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
  isBypassMode?: boolean;
}

export function Dashboard({ name, gender, maxLevel, points, levelScores = {}, onNavigate, onReset, isGuest, onLogin, isBypassMode }: Props) {
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
      
      {/* Welcome Header */}
      <div className="w-full bg-white border-2 border-slate-200 border-b-[4px] rounded-[2rem] p-4 sm:p-5 shadow-sm flex items-center justify-between mb-6">
         <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[1.25rem] border-2 border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 shadow-sm relative">
              <img src={gender === 'ikhwan' ? '/ikhwan.png' : '/akhwat.png'} alt="Avatar" className="w-[120%] h-[120%] object-cover mt-2 lg:mt-3" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 tracking-wide uppercase mb-0.5">Assalamu'alaikum,</p>
              <h1 className="text-xl sm:text-2xl font-black text-slate-800 truncate max-w-[180px] sm:max-w-[300px] leading-tight">{name}</h1>
            </div>
         </div>
         <button 
           onClick={() => { playSound('click'); onNavigate('PROFILE'); }}
           className="w-12 h-12 sm:w-14 sm:h-14 rounded-[1.25rem] bg-slate-50 border-2 border-slate-200 text-slate-400 flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 active:scale-95 transition-all shadow-sm shrink-0 border-b-[4px] active:border-b-2 active:translate-y-[2px]"
           title="Pengaturan Profil"
         >
           <Settings className="w-6 h-6 sm:w-7 sm:h-7" />
         </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full mb-5">
        <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-[1.5rem] p-4 text-white border-b-[6px] border-amber-600 shadow-md flex items-center gap-3 sm:gap-4 relative overflow-hidden group">
          {/* Shine effect */}
          <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shine_1.5s_ease-in-out]"></div>
          <div className="absolute -right-4 -bottom-4 opacity-20 pointer-events-none transform group-hover:scale-110 transition-transform duration-500">
            <Star className="w-24 h-24 stroke-[3]" />
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center shadow-inner shrink-0 relative z-10 backdrop-blur-sm">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white drop-shadow-sm" />
          </div>
          <div className="relative z-10 min-w-0">
            <p className="text-amber-100 font-bold text-[10px] sm:text-xs uppercase tracking-widest leading-none mb-1 shadow-sm">Bintang</p>
            <p className="text-xl sm:text-2xl font-black leading-none drop-shadow-sm truncate">{totalStars}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-sky-400 to-sky-500 rounded-[1.5rem] p-4 text-white border-b-[6px] border-sky-600 shadow-md flex items-center gap-3 sm:gap-4 relative overflow-hidden group">
           {/* Shine effect */}
           <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shine_1.5s_ease-in-out]"></div>
           <div className="absolute -right-4 -top-2 opacity-20 pointer-events-none transform group-hover:scale-110 transition-transform duration-500">
             <Award className="w-24 h-24 stroke-[3]" />
           </div>
           <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center shadow-inner shrink-0 relative z-10 backdrop-blur-sm">
             <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" />
           </div>
           <div className="relative z-10 min-w-0">
             <p className="text-sky-100 font-bold text-[10px] sm:text-xs uppercase tracking-widest leading-none mb-1">Rank</p>
             <p className="text-sm sm:text-base md:text-lg font-black leading-tight drop-shadow-sm line-clamp-2 sm:line-clamp-1">{getRank(totalStars)}</p>
           </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full mb-8">
        {/* Main CTA - "Mulai Belajar" */}
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          onClick={() => { playSound('transition'); onNavigate('MAP'); }}
          className="w-full bg-emerald-500 border-emerald-700 border-b-[8px] active:border-b-0 active:translate-y-[8px] p-5 sm:p-6 lg:p-8 rounded-[2rem] flex items-center justify-between gap-4 sm:gap-5 transition-all group relative overflow-hidden text-left shadow-lg isolate"
        >
          {/* Decorative shine & shape */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none"></div>
          <div className="absolute -left-8 -bottom-12 opacity-10 pointer-events-none rotate-12">
            <BookOpen className="w-40 h-40" />
          </div>

          <div className="flex-1 relative z-10 min-w-0 pl-1 sm:pl-2">
            <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                <span className="bg-white text-emerald-600 px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-sm flex items-center gap-1.5">
                    <Map className="w-3.5 h-3.5" /> Iqra {currentVolume}
                </span>
                <span className="text-emerald-50 font-bold text-xs sm:text-sm bg-black/10 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                  Tahap {currentStageInVolume}
                </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 leading-tight group-hover:scale-[1.02] origin-left transition-transform drop-shadow-md">
              Lanjut Belajar
            </h2>
            <p className="text-emerald-100 font-medium text-xs sm:text-sm drop-shadow-sm max-w-[200px] sm:max-w-none">
              Ayo selesaikan tahap ini untuk menambah koleksi bintangmu!
            </p>
          </div>

          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 shrink-0 rounded-[1.5rem] bg-white flex items-center justify-center shadow-inner transform group-hover:scale-110 group-hover:rotate-6 transition-transform relative z-10 group-active:scale-95 group-active:rotate-0">
             <div className="absolute inset-0 bg-emerald-400 rounded-[1.5rem] animate-ping opacity-20"></div>
             <Play className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ml-1 text-emerald-500 fill-emerald-500 relative z-10" />
          </div>
        </motion.button>
      </div>

      {/* Login Banner */}
      {isGuest && (
        <div className="w-full mb-8">
          <div className="w-full bg-white border-2 border-slate-200 border-b-[4px] rounded-[1.5rem] p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left flex-1">
               <h3 className="text-base sm:text-lg font-black text-slate-800 mb-0.5">Simpan Progresmu</h3>
               <p className="text-slate-500 font-medium text-[11px] sm:text-xs leading-relaxed">
                 Masuk dengan Google supaya pencapaian dan bintangmu tersimpan selamanya.
               </p>
            </div>
            <button 
              onClick={() => { playSound('click'); onLogin?.(); }}
              className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm sm:text-base border-b-[4px] active:border-b-2 active:translate-y-[2px] py-3 px-6 whitespace-nowrap"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              Masuk
            </button>
          </div>
        </div>
      )}

      {/* Achievement / Stats */}
      <div className="w-full bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-slate-700 border-b-[6px] rounded-[2rem] p-5 sm:p-6 shadow-xl flex flex-col gap-5 relative overflow-hidden">
         {/* Decorative subtle grid or glow inside the display case */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>
         
         <div className="flex items-center gap-4 relative z-10">
           <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shrink-0 border border-slate-600 shadow-inner relative overflow-hidden">
             <div className="absolute inset-0 bg-amber-400 opacity-20 blur-md"></div>
             <Trophy className="w-6 h-6 text-amber-400 relative z-10 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
           </div>
           <div className="flex-1 min-w-0">
             <h3 className="text-lg sm:text-xl font-black text-white mb-0.5 tracking-wide drop-shadow-md">Etalase Medali</h3>
             <p className="text-slate-400 font-medium text-[11px] sm:text-xs leading-relaxed">
               Selesaikan seluruh tahap dalam satu Iqra untuk memajang medali barumu.
             </p>
           </div>
         </div>
         
         <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 pt-2 w-full">
           {Array.from({ length: IQRA_VOLUMES }).map((_, i) => {
             const vol = i + 1;
             const isUnlocked = isBypassMode || currentVolume > vol || (currentVolume === vol && currentStageInVolume === STAGES_PER_VOLUME && levelScores[maxLevel] >= 4);
             
             const MEDAL_COLORS = [
               { bgContainer: 'bg-gradient-to-br from-amber-50 to-amber-100', borderColor: 'border-amber-300', iconBg: 'bg-amber-400', iconText: 'text-amber-900', iconFill: 'fill-amber-300 stroke-amber-900 stroke-2', textColor: 'text-amber-700' },
               { bgContainer: 'bg-gradient-to-br from-emerald-50 to-emerald-100', borderColor: 'border-emerald-300', iconBg: 'bg-emerald-400', iconText: 'text-emerald-900', iconFill: 'fill-emerald-300 stroke-emerald-900 stroke-2', textColor: 'text-emerald-700' },
               { bgContainer: 'bg-gradient-to-br from-sky-50 to-sky-100', borderColor: 'border-sky-300', iconBg: 'bg-sky-400', iconText: 'text-sky-900', iconFill: 'fill-sky-300 stroke-sky-900 stroke-2', textColor: 'text-sky-700' },
               { bgContainer: 'bg-gradient-to-br from-rose-50 to-rose-100', borderColor: 'border-rose-300', iconBg: 'bg-rose-400', iconText: 'text-rose-900', iconFill: 'fill-rose-300 stroke-rose-900 stroke-2', textColor: 'text-rose-700' },
               { bgContainer: 'bg-gradient-to-br from-purple-50 to-purple-100', borderColor: 'border-purple-300', iconBg: 'bg-purple-400', iconText: 'text-purple-900', iconFill: 'fill-purple-300 stroke-purple-900 stroke-2', textColor: 'text-purple-700' },
               { bgContainer: 'bg-gradient-to-br from-indigo-50 to-indigo-100', borderColor: 'border-indigo-300', iconBg: 'bg-indigo-400', iconText: 'text-indigo-900', iconFill: 'fill-indigo-300 stroke-indigo-900 stroke-2', textColor: 'text-indigo-700' }
             ];
             const colors = MEDAL_COLORS[(vol - 1) % MEDAL_COLORS.length];

             return (
               <div key={vol} className={`w-full aspect-[4/5] sm:aspect-auto sm:h-32 rounded-[1.25rem] flex flex-col items-center justify-center border-2 gap-2 relative transition-all ${isUnlocked ? `${colors.bgContainer} ${colors.borderColor} shadow-sm` : 'bg-slate-700/50 border-slate-600 border-dashed'}`}>
                 {isUnlocked && <div className="absolute -top-3 -right-3 text-2xl animate-pulse delay-75">✨</div>}
                 {isUnlocked && <div className="absolute inset-0 bg-white/30 rounded-[1.25rem] z-0" />}
                 <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center relative z-10 ${isUnlocked ? `${colors.iconBg} ${colors.iconText} shadow-inner` : 'bg-slate-800 text-slate-500 shadow-inner'}`}>
                    <BookOpen className={`w-6 h-6 sm:w-7 sm:h-7 ${isUnlocked ? colors.iconFill : ''}`} />
                 </div>
                 <span className={`text-[10px] sm:text-xs font-black relative z-10 text-center px-1 uppercase tracking-wider ${isUnlocked ? colors.textColor : 'text-slate-500'}`}>
                   Iqra {vol}
                 </span>
               </div>
             );
           })}
         </div>
      </div>

    </div>
  );
}

