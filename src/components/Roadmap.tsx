import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Star, ArrowLeft, BookOpen, Trophy } from 'lucide-react';
import { IQRA_VOLUMES, STAGES_PER_VOLUME } from '../data/hijaiyah';
import { playSound } from '../lib/sounds';

interface Props {
  maxLevel: number;
  levelScores?: Record<number, number>;
  onSelectLevel: (level: number) => void;
  onBack: () => void;
  selectedVolume: number | null;
  onSelectVolume: (vol: number | null) => void;
}

export function Roadmap({ maxLevel, levelScores = {}, onSelectLevel, onBack, selectedVolume, onSelectVolume }: Props) {
  // Calculate unlocked volume
  const maxUnlockedVolume = Math.ceil(Math.min(maxLevel, IQRA_VOLUMES * STAGES_PER_VOLUME) / STAGES_PER_VOLUME);
  
  // Create volumes array from bottom to top
  const volumes = Array.from({ length: IQRA_VOLUMES }, (_, i) => IQRA_VOLUMES - i);

const VOLUME_DESCRIPTIONS = [
    '',
    'Huruf Tunggal (Fathah)',
    'Harokat Kasrah (i)',
    'Harokat Dhammah (u)',
    'Tanwin Fathah (-an)',
    'Tanwin Kasrah (-in)',
    'Tanwin Dhammah (-un)'
  ];

  const handleSelectVolume = (vol: number) => {
    playSound('click');
    onSelectVolume(vol);
  };

  const handleBackToVolumes = () => {
    playSound('back');
    onSelectVolume(null);
  };

  const handleSelectStage = (level: number) => {
    playSound('click');
    onSelectLevel(level);
  };

  const handleBackToDashboard = () => {
    playSound('back');
    onBack();
  };

  if (selectedVolume !== null) {
    const startLevel = (selectedVolume - 1) * STAGES_PER_VOLUME + 1;
    const stages = Array.from({ length: STAGES_PER_VOLUME }, (_, i) => startLevel + (STAGES_PER_VOLUME - 1 - i));

    return (
      <div className="min-h-[100dvh] w-full pt-24 pb-32 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/40 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

        <button 
            onClick={handleBackToVolumes}
            className="fixed left-4 top-4 sm:left-6 sm:top-6 w-12 h-12 bg-white rounded-[1rem] transition-transform active:scale-95 flex items-center justify-center z-30 border-2 border-slate-200 border-b-[6px] active:border-b-0 active:translate-y-[6px] text-slate-500 hover:text-emerald-600"
            aria-label="Kembali ke Peta Utama"
          >
            <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="text-center mb-16 z-10 w-full px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm mb-4 border border-emerald-200">
            <BookOpen className="w-4 h-4" />
            <span>Iqra {selectedVolume}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-800">
            Tahapan Belajar
          </h2>
        </div>

        <div className="w-[320px] mx-auto flex flex-col items-center gap-[40px] relative z-10">
          {/* Context for absolute SVG */}
          <div className="absolute top-[50px] bottom-[50px] left-0 right-0 z-0 pointer-events-none">
            <svg 
              className="w-full h-full" 
              overflow="visible" 
              viewBox={`0 0 320 ${(stages.length - 1) * 140}`}
              preserveAspectRatio="none"
            >
              {stages.map((level, index) => {
                if (index === stages.length - 1) return null;
                const isAlternate = level % 2 !== 0;
                
                const startX = isAlternate ? 240 : 80;
                const endX = isAlternate ? 80 : 240;
                
                const startY = index * 140;
                const endY = (index + 1) * 140;
                const midY = (startY + endY) / 2;

                return (
                  <path
                    key={level}
                    d={`M ${startX} ${startY + 20} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY - 20}`}
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="0 24"
                    className="opacity-80"
                  />
                );
              })}
            </svg>
          </div>

          {stages.map((level, index) => {
            const isUnlocked = level <= maxLevel;
            const isCurrent = level === maxLevel;
            const isAlternate = level % 2 !== 0;
            const isExam = level % STAGES_PER_VOLUME === 0;
            const score = levelScores[level];

            return (
              <div key={level} className="relative w-full flex justify-center z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (STAGES_PER_VOLUME - index) * 0.1, type: "spring", bounce: 0.6 }}
                  className={`relative ${isAlternate ? 'translate-x-[80px]' : '-translate-x-[80px]'}`}
                >
                  {score !== undefined && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex gap-0.5 bg-white px-2 py-1 rounded-full border-2 border-slate-100 shadow-sm">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < score ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => isUnlocked && handleSelectStage(level)}
                    disabled={!isUnlocked}
                    className={`relative group rounded-full ${isExam ? 'w-[120px] h-[120px]' : 'w-[100px] h-[100px]'} flex items-center justify-center transition-transform ${
                      isUnlocked 
                        ? (isExam ? `bg-amber-400 border-[6px] border-white cursor-pointer` : `bg-emerald-500 border-[6px] border-white cursor-pointer`)
                        : `bg-[#e5e7eb] border-[6px] border-white cursor-not-allowed`
                    } ${isCurrent ? 'ring-8 ring-emerald-200 ring-offset-4 ring-offset-[#eff8fc]' : ''}
                    active:translate-y-[8px] hover:scale-105 duration-200
                    `}
                    style={{ boxShadow: isUnlocked ? (isExam ? `0 10px 0 0 #b45309` : `0 10px 0 0 #047857`) : `0 10px 0 0 #d1d5db` }}
                  >
                    {isUnlocked ? (
                      <div className="flex flex-col items-center">
                        {isExam ? (
                          <Trophy className={`w-10 h-10 ${isCurrent ? 'text-amber-900 fill-amber-900 animate-[bounce_2s_infinite]' : 'text-amber-900 fill-amber-900'}`} />
                        ) : (
                          <Star className={`w-8 h-8 ${isCurrent ? 'text-white fill-white animate-[bounce_2s_infinite]' : 'text-white fill-white'}`} />
                        )}
                        <span className={`${isExam ? 'text-amber-900' : 'text-white'} font-black ${isExam ? 'text-2xl' : 'text-xl'} leading-none mt-1`}>{level}</span>
                      </div>
                    ) : (
                      <Lock className="w-8 h-8 text-slate-400" />
                    )}

                    <div className={`absolute -bottom-4 bg-white px-4 py-2 rounded-2xl shadow-sm border-2 whitespace-nowrap font-black text-sm uppercase tracking-widest ${
                      isUnlocked ? (isExam ? 'text-amber-700 border-amber-200' : 'text-emerald-700 border-emerald-100') : 'text-slate-400 border-slate-200'
                    }`}>
                      {isExam ? 'Ujian Akhir' : `Tahap ${level}`}
                    </div>
                  </button>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full pt-24 pb-32 flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/40 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

      <button 
          onClick={handleBackToDashboard}
          className="fixed left-4 top-4 sm:left-6 sm:top-6 w-12 h-12 bg-white rounded-[1rem] transition-transform active:scale-95 flex items-center justify-center z-30 border-2 border-slate-200 border-b-[6px] active:border-b-0 active:translate-y-[6px] text-slate-500 hover:text-emerald-600"
          aria-label="Kembali ke Dashboard"
        >
          <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="text-center mb-16 z-10 w-full px-6">
        <h2 className="text-3xl font-black text-slate-800">
          Peta Belajar
        </h2>
        <p className="text-slate-500 font-medium mt-2">
          Pilih tingkatan Iqra untuk memulai!
        </p>
      </div>

      <div className="w-[340px] mx-auto flex flex-col items-center gap-[60px] relative z-10">
        {/* Context for absolute SVG */}
        <div className="absolute top-[50px] bottom-[50px] left-0 right-0 z-0 pointer-events-none">
          <svg 
            className="w-full h-full" 
            overflow="visible" 
            viewBox={`0 0 340 ${(volumes.length - 1) * 160}`}
            preserveAspectRatio="none"
          >
            {volumes.map((vol, index) => {
              if (index === volumes.length - 1) return null;
              const isAlternate = vol % 2 !== 0;
              
              const startX = isAlternate ? 250 : 90;
              const endX = isAlternate ? 90 : 250;
              
              const startY = index * 160;
              const endY = (index + 1) * 160;
              const midY = (startY + endY) / 2;

              return (
                <path
                  key={vol}
                  d={`M ${startX} ${startY + 30} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY - 30}`}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray="0 32"
                  className="opacity-30"
                />
              );
            })}
          </svg>
        </div>

        {volumes.map((vol, index) => {
          const isUnlocked = vol <= maxUnlockedVolume;
          const isCurrent = vol === maxUnlockedVolume;
          const isAlternate = vol % 2 !== 0;

          let bgColor = "bg-[#e5e7eb]";
          let shadowColor = "#d1d5db";
          let textColor = "text-slate-400";
          
          if (isUnlocked) {
             const colors = ['bg-amber-400', 'bg-emerald-500', 'bg-sky-400', 'bg-rose-400', 'bg-purple-500', 'bg-indigo-500'];
             const shadows = ['#b45309', '#047857', '#0369a1', '#be123c', '#7e22ce', '#4338ca'];
             bgColor = colors[(vol - 1) % colors.length];
             shadowColor = shadows[(vol - 1) % shadows.length];
             textColor = "text-white";
          }

          return (
            <div key={vol} className="relative w-full flex justify-center z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (IQRA_VOLUMES - index) * 0.1, type: "spring", bounce: 0.6 }}
                className={`relative ${isAlternate ? 'translate-x-[80px]' : '-translate-x-[80px]'}`}
              >
                {isUnlocked && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex px-3 py-1 bg-white rounded-full border-2 border-slate-100 shadow-sm items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span className="text-xs font-black text-amber-600">
                      {Array.from({length: STAGES_PER_VOLUME}).reduce((acc, _, i) => {
                         const stageLevel = (vol - 1) * STAGES_PER_VOLUME + i + 1;
                         return (acc as number) + (levelScores[stageLevel] || 0);
                      }, 0)}
                      <span className="text-slate-400">/{STAGES_PER_VOLUME * 5}</span>
                    </span>
                  </div>
                )}
                <button
                  onClick={() => isUnlocked && handleSelectVolume(vol)}
                  disabled={!isUnlocked}
                  className={`relative group rounded-[2rem] w-[140px] h-[100px] md:w-[150px] md:h-[110px] flex items-center justify-center transition-transform ${
                    isUnlocked 
                      ? `${bgColor} border-[6px] border-white cursor-pointer`
                      : `${bgColor} border-[6px] border-white cursor-not-allowed`
                  } ${isCurrent ? 'ring-8 ring-emerald-300 ring-offset-4 ring-offset-[#eff8fc]' : ''}
                  active:translate-y-[8px] hover:scale-105 duration-200
                  `}
                  style={{ boxShadow: isUnlocked ? `0 10px 0 0 ${shadowColor}` : `0 10px 0 0 #d1d5db` }}
                >
                  
                  {isUnlocked ? (
                    <div className="flex flex-col items-center gap-1">
                      <BookOpen className={`w-8 h-8 md:w-8 md:h-8 ${textColor}`} />
                      <span className={`${textColor} font-black text-xl md:text-2xl leading-none mt-1`}>Iqra {vol}</span>
                      <span className={`${textColor} font-bold text-[9px] md:text-[11px] leading-tight text-center px-4 mt-1 opacity-90`}>{VOLUME_DESCRIPTIONS[vol]}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 items-center text-slate-400 font-bold">
                      <Lock className="w-8 h-8 md:w-8 md:h-8 text-slate-400/80" />
                      <span className="text-xl md:text-2xl mt-1">Iqra {vol}</span>
                      <span className="text-[9px] md:text-[11px] leading-tight text-center px-4 mt-1 opacity-70">{VOLUME_DESCRIPTIONS[vol]}</span>
                    </div>
                  )}
                </button>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
