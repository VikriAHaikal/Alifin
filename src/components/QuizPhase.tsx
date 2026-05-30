import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, AlertTriangle, Volume2, ArrowLeft } from 'lucide-react';
import { generateQuiz, QuizQuestion, getQuestionCount, IQRA_VOLUMES, STAGES_PER_VOLUME } from '../data/hijaiyah';
import { playSound } from '../lib/sounds';
import { iqra1AudioMap, getAudioUrlsForParts } from '../lib/audioMap';

interface Props {
  level: number;
  onFinish: (score: number, wrongLetterIds: number[]) => void;
  onBack: () => void;
}

const getQuizFontSize = (length: number) => {
  if (length > 20) return 'text-[1.25rem] sm:text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem]';
  if (length > 15) return 'text-[1.5rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem]';
  if (length > 10) return 'text-[1.75rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem]';
  if (length > 6) return 'text-[2.25rem] sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.25rem]';
  if (length > 3) return 'text-[2.75rem] sm:text-[3.75rem] md:text-[4.5rem] lg:text-[5rem]';
  return 'text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem]';
};

const getQuestionTextSize = (length: number) => {
  if (length > 70) return 'text-xl md:text-2xl lg:text-3xl';
  if (length > 50) return 'text-xl md:text-2xl lg:text-3xl';
  return 'text-2xl md:text-3xl lg:text-4xl';
};

export function QuizPhase({ level, onFinish, onBack }: Props) {
  const isExam = level % STAGES_PER_VOLUME === 0;
  const questionCount = getQuestionCount(level);
  const [questions] = useState<QuizQuestion[]>(() => generateQuiz(level, questionCount));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongLetterIds, setWrongLetterIds] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  
  const currentQ = questions[currentIndex];

  const [showHint, setShowHint] = useState(false);
  const [selectedWrong, setSelectedWrong] = useState<string | null>(null);
  
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  
  const [sequencePicks, setSequencePicks] = useState<string[]>([]);
  const [sequencePicksIdx, setSequencePicksIdx] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Reset play state and custom sequence state for new question
    setHasPlayedIntro(false);
    setSequencePicks([]);
    setSequencePicksIdx([]);
  }, [currentIndex]);

  const playAudio = () => {
    if (!currentQ) return;
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    if (currentQ.type === 'audio' || currentQ.type === 'sequence') {
      setIsPlaying(true);
      
      const currentVolume = Math.ceil(Math.min(level, IQRA_VOLUMES * STAGES_PER_VOLUME) / STAGES_PER_VOLUME);

      let urls: string[] = [];
      const currentStageInVolume = ((level - 1) % STAGES_PER_VOLUME) + 1;

      if (currentVolume >= 2) {
        // For Iqro 2 and above, use the combined recorded audio provided by user
        let fileName = currentQ.idTTS; // Set this accurately in generator
        urls = [`/audio/iqra-${currentVolume}/tahap-${currentStageInVolume}/${fileName}.mp3`];
      } else {
        const mappedAudioFile = iqra1AudioMap[currentQ.letterId];
        if (mappedAudioFile) {
          urls = [`/audio/iqra-1/hijaiyah/${mappedAudioFile}`];
        } else if (currentQ.parts) {
          urls = getAudioUrlsForParts(currentQ.parts);
        }
      }

      if (urls.length > 0) {
        const playNext = (index: number) => {
          if (index >= urls.length) {
            setIsPlaying(false);
            return;
          }
          const audio = new Audio(urls[index]);
          audioRef.current = audio;
          audio.onended = () => playNext(index + 1);
          const onPlaybackError = () => {
            console.warn('Audio mp3 playback failed', urls[index]);
            setIsPlaying(false);
          };
          audio.onerror = onPlaybackError;
          audio.play().catch(onPlaybackError);
        };
        playNext(0);
      } else {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (timeLeft <= 0 && !showHint) {
      if (currentQ.type === 'sequence') {
        evaluateAnswer(false, sequencePicks.join(' '));
        setSequencePicks([]); // Reset sequence picks on timeout
        setSequencePicksIdx([]);
      } else {
        handleAnswer('', -1); // Auto submit wrong if time runs out
      }
      return;
    }
    
    if (showHint) return; // Pause timer if hint is showing
    
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentIndex, showHint]);

  const handleAnswer = (answer: string, optIndex: number = -1) => {
    if (currentQ.type === 'sequence') {
      const parts = currentQ.parts || currentQ.correctAnswer.split(' ');
      const newPicks = [...sequencePicks, answer];
      const newPicksIdx = [...sequencePicksIdx, optIndex];
      setSequencePicks(newPicks);
      setSequencePicksIdx(newPicksIdx);
      
      // If sequence is complete
      if (newPicks.length === parts.length) {
        if (newPicks.join('') === parts.join('')) { // Changed logic to be safe regardless of spaces
          evaluateAnswer(true, '');
        } else {
          evaluateAnswer(false, newPicks.join(' '));
          // Reset picks after showing the hint briefly
          setTimeout(() => {
            setSequencePicks([]);
            setSequencePicksIdx([]);
          }, 2000);
        }
      }
      return;
    }

    if (answer === currentQ.correctAnswer) {
      evaluateAnswer(true, answer);
    } else {
      evaluateAnswer(false, answer);
    }
  };

  const evaluateAnswer = (isCorrect: boolean, wrongAnswerString: string) => {
    if (isCorrect) {
      playSound('correct');
      // Only give point if they didn't need a hint for this question
      const earnedPoint = !showHint && selectedWrong === null;
      if (earnedPoint) {
        setScore(s => s + 1);
      }
      
      setShowHint(false);
      setSelectedWrong(null);
      
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
        setTimeLeft(30);
      } else {
        // Finished
        onFinish(score + (earnedPoint ? 1 : 0), wrongLetterIds);
      }
    } else {
      playSound('wrong');
      // Wrong answer -> Show Isyarah (hint)
      setSelectedWrong(wrongAnswerString);
      setShowHint(true);
      if (!wrongLetterIds.includes(currentQ.letterId)) {
        setWrongLetterIds(prev => [...prev, currentQ.letterId]);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden text-slate-800 relative z-10 w-full">
      {showExitConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="bg-white rounded-[2rem] p-6 max-w-sm w-full shadow-xl border-4 border-slate-200 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4 border-4 border-red-200">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Kembali Belajar?</h3>
            <p className="text-slate-500 mb-6 font-medium">Progres kuis kamu saat ini akan hilang dan kamu harus mengulang dari awal materi ini.</p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowExitConfirm(false)} 
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl transition-colors border-b-4 border-slate-300 active:translate-y-1 active:border-b-0"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  setShowExitConfirm(false);
                  onBack();
                }} 
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-2xl transition-colors border-b-4 border-red-700 active:translate-y-1 active:border-b-0"
              >
                Ya, Keluar
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Header Info */}
      <div className="p-4 md:p-6 flex justify-between items-center bg-white border-b-4 border-slate-200 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowExitConfirm(true)} 
            className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>
          <div className="flex flex-col">
            <div className="w-32 md:w-48 bg-slate-200 h-3 rounded-full overflow-hidden mt-1 mb-2">
               <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${((currentIndex) / questions.length) * 100}%` }}></div>
            </div>
            <div className="text-slate-400 font-bold text-xs uppercase tracking-widest">
              Soal {currentIndex + 1} / {questions.length}
            </div>
          </div>
        </div>
        
        <div className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-3 rounded-2xl font-black text-xl md:text-2xl border-4 transition-colors ${
          timeLeft <= 10 ? 'bg-red-50 text-red-600 border-red-200 border-b-[6px] animate-pulse' : 'bg-white text-slate-700 border-slate-200 border-b-[6px]'
        }`}>
          <Clock className="w-5 h-5 md:w-6 md:h-6" />
          00:{timeLeft.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-y-auto w-full z-10 flex flex-col pt-4 sm:pt-8 pb-32">
        <div className="px-4 md:px-6 max-w-6xl mx-auto w-full flex flex-col min-h-max">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-10 xl:gap-16 py-4 shrink-0"
            >
            
            {/* Left side: Question & Audio */}
            <div className="flex flex-col items-center w-full lg:w-2/5 max-w-2xl shrink-0 lg:sticky lg:top-4">
              <h2 className={`${getQuestionTextSize(currentQ.question.length)} font-black mb-4 lg:mb-6 text-center leading-tight flex flex-col items-center gap-4 text-slate-800 w-full shrink-0`}>
                <span className="bg-white px-6 md:px-8 py-4 md:py-6 rounded-[2rem] shadow-sm border-4 border-slate-200 border-b-[8px] w-full">{currentQ.question}</span>
                {(currentQ.type === 'audio' || currentQ.type === 'sequence') && (
                  <motion.button
                    whileHover={{ y: -4 }}
                    whileTap={{ y: 4 }}
                    onClick={playAudio}
                    disabled={isPlaying}
                    className={`mt-2 rounded-[1.5rem] p-4 transition-all border-4 ${
                      isPlaying 
                      ? 'bg-amber-400 border-amber-600 text-white animate-pulse border-b-[8px]' 
                      : 'bg-sky-400 border-sky-600 border-b-[8px] text-white hover:bg-sky-500 active:border-b-4 active:translate-y-[4px] cursor-pointer'
                    }`}
                  >
                    <Volume2 className="w-8 h-8 md:w-10 md:h-10" />
                  </motion.button>
                )}
              </h2>
              
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="mt-2 md:mt-4 p-4 md:p-6 bg-amber-100 border-4 border-amber-200 border-b-[8px] rounded-[2rem] flex items-start gap-3 md:gap-4 w-full shadow-sm shrink-0 text-left"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 border-2 border-amber-200">
                    <span className="text-xl md:text-2xl font-black">👨‍🏫</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-black text-amber-900 mb-1 text-base md:text-lg">
                      Petunjuk A Iki
                    </h3>
                    <p className="text-amber-800 font-medium leading-relaxed text-sm md:text-base break-words">
                      Oops.. bukan yang itu. Coba perhatikan: <strong className="text-amber-950 font-black bg-amber-200/50 px-2 rounded break-words whitespace-pre-line inline-block mt-1">"{currentQ.hint}"</strong>
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right side: Options Grid */}
            <div className="flex flex-col w-full lg:w-3/5 max-w-2xl shrink-0 gap-6">
              {currentQ.type === 'sequence' && (
                <div className="flex flex-row-reverse justify-center gap-3 md:gap-4 mb-2">
                  {Array.from({ length: currentQ.parts?.length || currentQ.correctAnswer.split(' ').length }).map((_, i) => {
                    return (
                    <motion.button 
                      key={i} 
                      whileTap={sequencePicks[i] ? { scale: 0.95 } : {}}
                      onClick={() => {
                        if (sequencePicks[i]) {
                          const newPicks = [...sequencePicks];
                          newPicks.splice(i, 1); // remove clicked element
                          const newPicksIdx = [...sequencePicksIdx];
                          newPicksIdx.splice(i, 1);
                          setSequencePicksIdx(newPicksIdx);
                          setSequencePicks(newPicks);
                          setShowHint(false); // remove hint if they retry
                        }
                      }}
                      className={`w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 rounded-2xl border-4 flex items-center justify-center text-5xl md:text-6xl font-arabic transition-colors ${
                        sequencePicks[i] 
                          ? (showHint ? 'bg-red-50 border-red-300 text-red-600' : 'bg-amber-100 border-amber-300 text-amber-800 cursor-pointer hover:bg-amber-50 drop-shadow-sm')
                          : 'bg-slate-50 border-slate-200 border-dashed text-transparent'
                      }`}
                    >
                      {sequencePicks[i] || ''}
                    </motion.button>
                  )})}
                </div>
              )}

              <div className={`grid gap-4 md:gap-6 w-full ${currentQ.options.length > 4 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {currentQ.options.map((opt, i) => {
                  let isSelectedAndWrong = showHint && selectedWrong === opt;
                  let isPicked = false;
                  
                  if (currentQ.type === 'sequence') {
                    isPicked = sequencePicksIdx.includes(i);
                    // For sequence, the hint applies to the full string, not single option
                    // So we don't highlight single options red in sequence mode unless we change the logic
                    isSelectedAndWrong = false; 
                  }

                  return (
                    <motion.button
                      key={i}
                      whileHover={!isSelectedAndWrong && !isPicked ? { y: -4 } : {}}
                      whileTap={!isSelectedAndWrong && !isPicked ? { y: 4 } : {}}
                      onClick={() => !isPicked && handleAnswer(opt, i)}
                      disabled={isPicked}
                      className={`bg-white rounded-3xl p-2 transition-all flex flex-col items-center justify-center group ${currentQ.options.length > 4 ? 'border-b-[6px]' : 'border-b-[10px] active:border-b-4 active:mt-[6px]'} border-4 h-[120px] sm:h-[140px] md:h-[180px]
                        ${isPicked 
                          ? 'opacity-40 border-slate-200 cursor-not-allowed border-b-4 translate-y-[4px] bg-slate-50' 
                          : isSelectedAndWrong 
                            ? 'border-red-400 bg-red-50 text-red-400 opacity-50 pointer-events-none border-b-4 translate-y-[4px]' 
                            : 'text-emerald-800 border-slate-200 hover:border-emerald-300 hover:border-b-emerald-400 cursor-pointer'}
                      `}
                    >
                      <span className={`font-arabic ${getQuizFontSize(opt.length)} font-bold leading-none flex items-center justify-center transition-transform h-full drop-shadow-sm text-center ${!isSelectedAndWrong && !isPicked ? 'group-hover:scale-110' : ''}`}>
                        {opt}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
