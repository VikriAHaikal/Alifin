import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, ArrowRight, ArrowLeft, Heart, Target, BookOpen } from 'lucide-react';
import { getLettersForLevel, IQRA_VOLUMES, STAGES_PER_VOLUME } from '../data/hijaiyah';
import { playSound } from '../lib/sounds';

interface Props {
  level: number;
  maxLevel: number;
  hasScore?: boolean;
  wrongLetterIds?: number[];
  onComplete: () => void;
  onBack: () => void;
}

export function LearningPhase({ level, maxLevel, hasScore = false, wrongLetterIds = [], onComplete, onBack }: Props) {
  const [isNiatDone, setIsNiatDone] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);
  const [learnedIds, setLearnedIds] = useState<Set<number>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Custom display for level mapping
  const currentVolume = Math.ceil(Math.min(level, IQRA_VOLUMES * STAGES_PER_VOLUME) / STAGES_PER_VOLUME);
  const currentStageInVolume = (level - 1) % STAGES_PER_VOLUME + 1;

  // Provide characters only for the specific level
  const letters = useMemo(() => getLettersForLevel(level), [level]);
  const currentLetter = letters[currentIndex] || letters[0]; // fallback safely

  // Reset states when level changes
  const wrongLettersStr = wrongLetterIds.join(',');

  useEffect(() => {
    setCurrentIndex(0);
    const initialLearned = (level < maxLevel || hasScore) ? new Set(letters.map(l => l.id)) : new Set<number>();
    
    // Unmark letters that were answered incorrectly so user has to review them
    if (wrongLettersStr) {
      wrongLettersStr.split(',').forEach(idStr => {
        initialLearned.delete(Number(idStr));
      });
    }
    
    setLearnedIds(initialLearned);
    setLearnedCount(initialLearned.size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, maxLevel, hasScore, wrongLettersStr]);

  const playAudio = (letter: typeof letters[0]) => {
    // We add an Arabic comma to let TTS draw out the sound naturally
    const textToPlay = letter.arTTS + ' ،';
    const url = `https://translate.googleapis.com/translate_tts?client=tw-ob&ie=UTF-8&tl=ar&q=${encodeURIComponent(textToPlay)}`;
    
    const audio = new Audio(url);
    audio.playbackRate = 0.85;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const msg = new SpeechSynthesisUtterance();
          msg.lang = 'ar-SA';
          msg.text = letter.arTTS;
          msg.rate = 0.8;
          window.speechSynthesis.speak(msg);
        }
      });
    }

    if (!learnedIds.has(letter.id)) {
      const newIds = new Set(learnedIds).add(letter.id);
      setLearnedIds(newIds);
      setLearnedCount(newIds.size);
    }
  };

  const handleNext = () => {
    playSound('click');
    if (currentIndex < letters.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    playSound('back');
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleStartNiat = () => {
    playSound('click');
    setIsNiatDone(true);
  };

  const handleBack = () => {
    playSound('back');
    onBack();
  };

  const handleComplete = () => {
    playSound('click');
    onComplete();
  };

  if (!isNiatDone) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 text-center relative z-10 w-full">
        <button 
          onClick={handleBack}
          className="absolute left-4 top-4 sm:left-6 sm:top-6 w-12 h-12 bg-white rounded-[1rem] transition-transform active:scale-95 flex items-center justify-center z-30 border-2 border-slate-200 border-b-[6px] active:border-b-0 active:translate-y-[6px] text-slate-500 hover:text-emerald-600"
          aria-label="Kembali ke Dashboard"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-[2.5rem] p-8 max-w-sm shadow-sm border-4 border-slate-200 border-b-[8px] flex flex-col items-center w-full relative overflow-hidden"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-[1.5rem] flex items-center justify-center mb-6 border-2 border-emerald-200 rotate-3">
            <Heart className="w-10 h-10 text-emerald-500 fill-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">
            Fokus & Niat
          </h2>
          <p className="text-slate-500 font-medium mb-8">
            Sebelum memulai, mari luruskan niat semata-mata karena Allah. Siapkan fokus dan pikiran Anda...
          </p>
          <button
            onClick={handleStartNiat}
            className="w-full bg-emerald-500 border-emerald-700 border-b-[6px] active:border-b-0 active:translate-y-[6px] text-white font-black text-lg py-4 rounded-2xl flex justify-center items-center gap-2 transition-all cursor-pointer"
          >
            <Target className="w-6 h-6" />
            Mulai Belajar
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full flex flex-col relative">
      <div className="bg-emerald-500 border-b-4 border-emerald-700 text-white p-4 sm:p-6 shrink-0 z-20 relative w-full pt-10 sm:pt-6">
        <button 
          onClick={handleBack}
          className="absolute left-4 top-10 sm:left-6 sm:top-6 w-10 h-10 bg-white/20 rounded-xl transition-transform active:scale-95 flex items-center justify-center z-30 border-2 border-emerald-400 hover:bg-white/30 text-white"
          aria-label="Kembali ke Dashboard"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="max-w-4xl mx-auto px-12 sm:px-16 flex flex-col justify-center min-h-[64px]">
          <div className="flex items-center justify-center gap-2 mb-2 text-emerald-100 opacity-90">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Iqra {currentVolume}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-center mb-3">Tahap {currentStageInVolume}</h2>
          <div className="w-full bg-emerald-800/50 rounded-full h-3 sm:h-4 overflow-hidden border-2 border-emerald-600/30">
            <motion.div 
              className="bg-amber-300 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(learnedCount / letters.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-xs sm:text-sm font-bold mt-2 text-emerald-100 hidden sm:block">
            Selesaikan materi ini untuk membuka kuis ({learnedCount} / {letters.length})
          </p>
          <p className="text-center text-xs font-bold mt-2 text-emerald-100 sm:hidden uppercase tracking-widest">
            {learnedCount} / {letters.length} Dipelajari
          </p>
        </div>
      </div>

      <div className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center gap-6 min-h-[400px] relative">
        <AnimatePresence mode="wait">
          <motion.button
            key={currentLetter.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", bounce: 0.5 }}
            whileHover={{ y: -4 }}
            whileTap={{ y: 4 }}
            onClick={() => playAudio(currentLetter)}
            className={`w-full max-w-sm sm:max-w-2xl flex-1 min-h-[350px] flex flex-col items-center justify-center p-6 sm:p-8 relative transition-all cursor-pointer ${
              learnedIds.has(currentLetter.id) 
                ? 'bg-white border-4 border-emerald-400 border-b-[12px] active:border-b-4 text-emerald-800 rounded-[3rem] active:mt-[8px]' 
                : 'bg-white border-4 border-slate-200 border-b-[12px] active:border-b-4 text-slate-800 rounded-[3rem] active:mt-[8px] hover:border-emerald-300 hover:border-b-emerald-400'
            }`}
          >
            <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 transition-colors p-2 rounded-xl border-2 z-10 ${
              learnedIds.has(currentLetter.id) ? 'bg-emerald-50 border-emerald-200 text-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-300'
            }`}>
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </div>
            
            {wrongLetterIds.includes(currentLetter.id) && !learnedIds.has(currentLetter.id) && (
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 transition-colors px-3 py-1 rounded-xl border-2 z-10 bg-rose-50 border-rose-200 text-rose-500 font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2">
                <Target className="w-4 h-4" />
                Perlu Diperbaiki
              </div>
            )}
            
            <div className="flex-1 w-full flex items-center justify-center relative mt-4 sm:mt-6 px-4">
               <span className={`font-arabic ${currentLetter.char.length > 3 ? 'text-[4rem] sm:text-[5rem] md:text-[6rem]' : 'text-[5rem] sm:text-[6rem] md:text-[7rem]'} font-bold leading-normal text-center drop-shadow-sm flex items-center justify-center flex-1`}>
                 {currentLetter.char}
               </span>
            </div>
            
            <div className="flex flex-col items-center w-full pb-4 shrink-0">
              <span className="font-black text-2xl sm:text-3xl md:text-4xl tracking-widest uppercase mb-2">
                {currentLetter.name}
              </span>
              {currentLetter.hint && (
                <p className="text-emerald-700/80 font-bold text-xs sm:text-sm md:text-base px-4 sm:px-5 text-center leading-relaxed bg-emerald-50 py-2 sm:py-3 rounded-xl border border-emerald-100 max-w-[85%] mx-auto">
                  💡 {currentLetter.hint}
                </p>
              )}
            </div>
          </motion.button>
        </AnimatePresence>

        <div className="flex items-center gap-4 sm:gap-6 w-full max-w-sm justify-center shrink-0">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-[1.5rem] flex items-center justify-center border-4 transition-all shrink-0 ${currentIndex === 0 ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed border-b-4' : 'bg-white border-emerald-300 border-b-[8px] active:border-b-4 active:translate-y-[4px] text-emerald-600'}`}
          >
            <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </button>
          
          <span className="font-black text-slate-400 text-base sm:text-lg md:text-xl min-w-[4rem] text-center">
            {currentIndex + 1} / {letters.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentIndex === letters.length - 1}
            className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-[1.5rem] flex items-center justify-center border-4 transition-all shrink-0 ${currentIndex === letters.length - 1 ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed border-b-4' : 'bg-white border-emerald-300 border-b-[8px] active:border-b-4 active:translate-y-[4px] text-emerald-600'}`}
          >
            <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </button>
        </div>
      </div>

      <div className="bg-white border-t-2 border-slate-200 p-4 md:p-6 shrink-0 z-20 flex justify-center w-full">
        <button
          onClick={handleComplete}
          disabled={learnedCount < 1}
          className={`px-6 sm:px-8 py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl flex items-center gap-3 transition-all w-full max-w-sm justify-center uppercase tracking-wider ${
            learnedCount >= (letters.length / 2) 
              ? 'bg-amber-400 border-amber-600 border-b-[6px] active:border-b-0 active:translate-y-[6px] text-amber-950 cursor-pointer'
              : 'bg-slate-200 border-slate-300 border-b-[6px] text-slate-400 cursor-not-allowed'
          }`}
        >
          {learnedCount >= (letters.length / 2) ? 'Mulai Kuis!' : `Minimal 50% (${Math.round(letters.length / 2)})`}
          <ArrowRight className={`w-6 h-6 md:w-7 md:h-7 shrink-0 ${learnedCount >= (letters.length / 2) ? 'animate-bounce' : ''}`} />
        </button>
      </div>
    </div>
  );
}
