import { motion } from 'motion/react';
import { Trophy, Frown, ArrowRight, RotateCcw, Star, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { STAGES_PER_VOLUME } from '../data/hijaiyah';

interface Props {
  score: number;
  total: number;
  onNextLevel: () => void;
  onRetry: () => void;
  isExam?: boolean;
  userName?: string;
  currentLevel?: number;
}

export function Feedback({ score, total, onNextLevel, onRetry, isExam, userName, currentLevel }: Props) {
  const percentage = Math.round((score / total) * 100);
  const isPass = percentage >= 80;

  useEffect(() => {
    if (isPass) {
      // Fire confetti once from both edges to be performant but still festive
      const count = isExam ? 100 : 50;
      const defaults = { origin: { y: 0.7 } };

      const fire = (particleRatio: number, opts: any) => {
        confetti(Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        }));
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  }, [isPass, isExam]);

  const volume = currentLevel ? Math.ceil(currentLevel / STAGES_PER_VOLUME) : 1;

  if (isExam && isPass) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-300 to-amber-100 pb-24">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 2 }}
          className="bg-white border-[12px] border-amber-200 rounded-3xl p-8 sm:p-12 w-full max-w-2xl flex flex-col items-center text-center shadow-2xl relative z-10"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23fef3c7\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        >
          <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }} className="mb-6">
            <div className="bg-gradient-to-br from-amber-300 to-amber-500 p-6 rounded-full border-4 border-amber-100 shadow-lg">
              <Award className="w-24 h-24 sm:w-32 sm:h-32 text-white drop-shadow-md" />
            </div>
          </motion.div>

          <div className="text-amber-600 font-bold tracking-[0.2em] uppercase text-sm mb-2">Sertifikat Kelulusan</div>
          <h1 className="text-4xl sm:text-6xl font-black mb-6 text-slate-800 font-serif">
            Iqra {volume}
          </h1>
          
          <p className="text-lg font-medium mb-4 text-slate-500">Diberikan sebagai penghargaan kepada</p>
          
          <div className="text-3xl sm:text-5xl font-black text-emerald-600 mb-8 pb-4 border-b-2 border-emerald-100 px-12">
            {userName || 'Siswa Alifin'}
          </div>

          <p className="text-base font-medium max-w-md text-slate-500 leading-relaxed mb-10">
            Telah menyelesaikan seluruh materi pada Iqra {volume} dengan nilai yang sangat memuaskan dan berhak untuk melanjutkan ke tingkat berikutnya.
          </p>

          <button 
            onClick={onNextLevel}
            className="w-full sm:w-auto px-12 bg-emerald-500 border-emerald-700 border-b-[6px] active:border-b-0 active:translate-y-[6px] text-white font-black text-xl py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-transform cursor-pointer"
          >
            Lanjut Iqra {volume + 1}
            <ArrowRight className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-[100dvh] flex flex-col items-center justify-center p-6 bg-[#f8fafc]`}>
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="bg-white border-4 border-slate-200 border-b-[8px] rounded-[3rem] p-8 sm:p-12 w-full max-w-xl flex flex-col items-center text-center shadow-sm relative z-10"
      >
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          className="mb-8"
        >
          {isPass ? (
            <div className="bg-amber-100 p-6 rounded-full border-4 border-amber-300">
              <Trophy className="w-20 h-20 sm:w-24 sm:h-24 text-amber-500 drop-shadow-sm" />
            </div>
          ) : (
            <div className="bg-red-100 p-6 rounded-full border-4 border-red-300">
              <Frown className="w-20 h-20 sm:w-24 sm:h-24 text-red-500 drop-shadow-sm" />
            </div>
          )}
        </motion.div>

        <h1 className={`text-4xl sm:text-5xl font-black mb-4 ${isPass ? 'text-emerald-700' : 'text-red-600'}`}>
          {isPass ? 'Masya Allah! Lulus!' : 'Jangan Menyerah!'}
        </h1>
        
        <p className="text-lg font-medium mb-8 max-w-sm text-slate-500">
          {isPass 
            ? (isExam ? 'Luar biasa! Kamu berhasil lulus Ujian Akhir!' : 'Hebat! Kamu bisa melanjutkan perjalanan ke tahap berikutnya.') 
            : 'Perbanyak latihan, kamu pasti bisa mencapai skor minimal 80%.'}
        </p>

        <div className={`bg-slate-50 rounded-[2rem] px-8 sm:px-12 py-6 mb-10 border-4 border-slate-100 shadow-sm flex flex-col items-center ${isPass ? 'text-emerald-700' : 'text-slate-700'}`}>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {[...Array(total)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-6 h-6 sm:w-8 sm:h-8 ${i < score ? 'fill-amber-400 text-amber-500' : 'fill-slate-200 text-slate-300'}`} 
              />
            ))}
          </div>
          <div className="text-4xl font-black mb-2">{score} <span className="text-3xl text-slate-400">/ {total}</span></div>
          <div className="text-sm uppercase tracking-widest font-bold text-slate-400 mt-1">Skor Akhir ({percentage}%)</div>
        </div>

        {isPass ? (
          <button 
            onClick={onNextLevel}
            className="w-full bg-emerald-500 border-emerald-700 border-b-[6px] active:border-b-0 active:translate-y-[6px] text-white font-black text-xl py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-transform cursor-pointer"
          >
            Lanjut Level Berikutnya
            <ArrowRight className="w-6 h-6" />
          </button>
        ) : (
          <button 
            onClick={onRetry}
            className="w-full bg-sky-400 border-sky-600 border-b-[6px] active:border-b-0 active:translate-y-[6px] text-white font-black text-xl py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-transform cursor-pointer"
          >
            <RotateCcw className="w-6 h-6" />
            Coba Belajar Lagi
          </button>
        )}
      </motion.div>
    </div>
  );
}
