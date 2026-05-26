/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { Roadmap } from './components/Roadmap';
import { LandingPage } from './components/LandingPage';
import { LearningPhase } from './components/LearningPhase';
import { QuizPhase } from './components/QuizPhase';
import { Feedback } from './components/Feedback';
import { Profile } from './components/Profile';
import { UstadzAI } from './components/UstadzAI';
import { CookieConsent } from './components/CookieConsent';
import { Volume2, VolumeX, Home, MessageCircle } from 'lucide-react';
import { playSound } from './lib/sounds';
import { TOTAL_LEVELS, STAGES_PER_VOLUME, getQuestionCount } from './data/hijaiyah';
import { useAuth } from './lib/AuthContext';

type Gender = 'ikhwan' | 'akhwat' | null;

type ViewState = 'LANDING' | 'ONBOARDING' | 'DASHBOARD' | 'MAP' | 'LEARNING' | 'QUIZ' | 'FEEDBACK' | 'PROFILE';

const loadState = (key: string, defaultValue: any) => {
  try {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn(`Error loading state ${key}`, e);
  }
  return defaultValue;
};

export default function App() {
  const { user, profile, loading, updateProfile, logOut, signInWithGoogle } = useAuth();
  const [userName, setUserName] = useState<string>(() => loadState('alifin_userName', ''));
  const [gender, setGender] = useState<Gender>(() => loadState('alifin_gender', null));
  const [view, setView] = useState<ViewState>(() => gender ? 'DASHBOARD' : 'LANDING');
  const [points, setPoints] = useState<number>(() => loadState('alifin_points', 0));
  const [levelScores, setLevelScores] = useState<Record<number, number>>(() => loadState('alifin_levelScores', {}));
  const [levelWrongLetters, setLevelWrongLetters] = useState<Record<number, number[]>>(() => loadState('alifin_levelWrongLetters', {}));
  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState<number>(() => {
    const saved = loadState('alifin_maxUnlockedLevel', 1);
    return Math.min(TOTAL_LEVELS, Math.max(1, saved));
  });
  const [currentLevel, setCurrentLevel] = useState(1);
  const [lastScore, setLastScore] = useState(0);
  const [isPlayingBGM, setIsPlayingBGM] = useState(false);
  const [userMutedBGM, setUserMutedBGM] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isUstadzOpen, setIsUstadzOpen] = useState(false);
  const [selectedVolume, setSelectedVolume] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && profile) {
      if (profile.userName) setUserName(profile.userName);
      if (profile.gender) setGender(profile.gender as Gender);
      if (profile.maxUnlockedLevel !== undefined) setMaxUnlockedLevel(profile.maxUnlockedLevel);
      if (profile.points !== undefined) setPoints(profile.points);
      if (profile.levelScores) setLevelScores(profile.levelScores);
      if (profile.levelWrongLetters) setLevelWrongLetters(profile.levelWrongLetters);

      // If they just logged in and we're on landing/onboarding, but they have a profile
      if (profile.gender) {
        setView(prev => (prev === 'LANDING' || prev === 'ONBOARDING') ? 'DASHBOARD' : prev);
      } else if (user) {
        // They are logged in but don't have a profile yet (new user or incomplete)
        setView(prev => prev === 'LANDING' ? 'ONBOARDING' : prev);
      }
    }
  }, [profile, loading, user]); // Remove 'view' to avoid loop, it triggers once profile loads

  useEffect(() => {
    localStorage.setItem('alifin_userName', JSON.stringify(userName));
    localStorage.setItem('alifin_gender', JSON.stringify(gender));
    localStorage.setItem('alifin_points', JSON.stringify(points));
    localStorage.setItem('alifin_levelScores', JSON.stringify(levelScores));
    localStorage.setItem('alifin_levelWrongLetters', JSON.stringify(levelWrongLetters));
    localStorage.setItem('alifin_maxUnlockedLevel', JSON.stringify(Math.min(TOTAL_LEVELS, Math.max(1, maxUnlockedLevel))));
  }, [userName, gender, points, maxUnlockedLevel, levelScores, levelWrongLetters]);

  useEffect(() => {
    // Initialize background music
    // Use the uploaded Islamic instrumental background track
    const bgm = new Audio('/lagu-tema.mp3');
    bgm.loop = true;
    bgm.volume = 0.4; // Soft volume so it doesn't overpower the Hijaiyah TTS
    
    bgm.addEventListener('error', (e) => {
      console.error('Error loading background music:', e);
    });
    
    audioRef.current = bgm;

    // Try to auto-play (might be blocked by browser)
    if (gender !== null && view !== 'LANDING' && view !== 'ONBOARDING') {
      const playPromise = bgm.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlayingBGM(true);
        }).catch(() => {
          setIsPlayingBGM(false);
        });
      }
    } else {
      bgm.pause();
      setIsPlayingBGM(false);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [gender]);

  useEffect(() => {
    // Handle first user interaction to unlock audio
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current && !isPlayingBGM && !userMutedBGM && view !== 'ONBOARDING' && view !== 'LANDING') {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlayingBGM(true);
            setHasInteracted(true);
          }).catch(console.log);
        }
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    }
  }, [hasInteracted, isPlayingBGM, userMutedBGM, view]);

  useEffect(() => {
    if ((view === 'LANDING' || view === 'ONBOARDING') && isPlayingBGM && audioRef.current) {
      audioRef.current.pause();
      setIsPlayingBGM(false);
    } else if (view !== 'LANDING' && view !== 'ONBOARDING' && gender !== null && hasInteracted && !isPlayingBGM && !userMutedBGM && audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => setIsPlayingBGM(true)).catch(console.log);
        }
    }
  }, [view, isPlayingBGM, gender, hasInteracted, userMutedBGM]);


  const handleOnboardingComplete = (name: string, selectedGender: 'ikhwan' | 'akhwat') => {
    playSound('transition');
    setUserName(name);
    setGender(selectedGender);
    setView('DASHBOARD');
    
    if (user) {
      updateProfile({ userName: name, gender: selectedGender }).catch(console.error);
    }

    // Play music after first interaction
    if (audioRef.current && !isPlayingBGM) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlayingBGM(true);
        }).catch(err => {
          console.log('Audio playback prevented:', err);
          setIsPlayingBGM(false);
        });
      }
    }
  };

  const toggleBGM = () => {
    playSound('click');
    if (!audioRef.current) return;
    if (isPlayingBGM) {
      audioRef.current.pause();
      setIsPlayingBGM(false);
      setUserMutedBGM(true);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlayingBGM(true);
          setUserMutedBGM(false);
        }).catch(err => console.log('Audio playback prevented:', err));
      }
    }
  };

  const handleDashboardNavigate = (targetView: 'MAP' | 'LEARNING' | 'PROFILE') => {
    playSound('click');
    if (targetView === 'LEARNING') {
      setCurrentLevel(maxUnlockedLevel);
      setView('LEARNING');
    } else if (targetView === 'MAP') {
      setView('MAP');
    } else if (targetView === 'PROFILE') {
      setView('PROFILE');
    }
  };

  const handleSelectLevel = (level: number) => {
    playSound('click');
    setCurrentLevel(level);
    setView('LEARNING');
  };

  const handleFinishLearning = () => {
    playSound('transition');
    setView('QUIZ');
  };

  const handleFinishQuiz = (score: number, wrongLetterIds: number[]) => {
    const questionCount = getQuestionCount(currentLevel);
    // Passing score is 80%
    const passingScore = Math.ceil(questionCount * 0.8);

    let newMaxLevel = maxUnlockedLevel;
    if (score >= passingScore) {
      playSound('win');
      newMaxLevel = Math.min(TOTAL_LEVELS, Math.max(maxUnlockedLevel, currentLevel + 1));
      setMaxUnlockedLevel(newMaxLevel);
    } else {
      playSound('transition');
    }
    setLastScore(score);
    
    // Set wrong letters for this level
    const newWrongLetters = { ...levelWrongLetters, [currentLevel]: wrongLetterIds };
    setLevelWrongLetters(newWrongLetters);
    
    // Add points only for improvement
    const oldScore = levelScores[currentLevel] || 0;
    let newPoints = points;
    let newScores = levelScores;
    if (score > oldScore) {
      const difference = score - oldScore;
      newPoints = points + (difference * 10);
      newScores = { ...levelScores, [currentLevel]: score };
      setPoints(newPoints);
      setLevelScores(newScores);
    }
    
    if (user) {
      updateProfile({
        maxUnlockedLevel: newMaxLevel,
        points: newPoints,
        levelScores: newScores,
        levelWrongLetters: newWrongLetters
      }).catch(console.error);
    }
    
    setView('FEEDBACK');
  };

  const handleNextLevel = () => {
    playSound('click');
    if (currentLevel < maxUnlockedLevel) {
      setCurrentLevel(currentLevel + 1);
    }
    setView('MAP');
  };

  const handleRetry = () => {
    playSound('click');
    setView('LEARNING');
  };

  const handleReset = async () => {
    playSound('transition');
    if (user) {
      await logOut().catch(console.error);
    }
    localStorage.removeItem('alifin_userName');
    localStorage.removeItem('alifin_gender');
    localStorage.removeItem('alifin_points');
    localStorage.removeItem('alifin_levelScores');
    localStorage.removeItem('alifin_levelWrongLetters');
    localStorage.removeItem('alifin_maxUnlockedLevel');
    setUserName('');
    setGender(null);
    setPoints(0);
    setLevelScores({});
    setLevelWrongLetters({});
    setMaxUnlockedLevel(1);
    setCurrentLevel(1);
    setView('LANDING');
  };

  return (
    <div className="font-sans antialiased text-slate-800 min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-300 to-amber-100">
      {/* Animated Clouds and Desert are only global outside of landing page */}
      {view !== 'LANDING' && (
        <>
          <div className="fixed inset-x-0 top-0 h-64 pointer-events-none z-0 opacity-70">
            <div className="absolute top-10 left-[-20%] animate-[cloud_60s_linear_infinite] opacity-80 text-white">
              <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 20C40 9 49 0 60 0C68.5 0 75.7 5.3 78.5 12.8C80.3 11.7 82.5 11.1 84.8 11.1C92.6 11.1 98.9 17.4 98.9 25.2C98.9 25.8 98.8 26.3 98.7 26.8C100.8 25.9 103.1 25.4 105.6 25.4C114.6 25.4 122 32.7 122 41.8C122 42.1 122 42.4 122 42.7L25.3 42.7C21.4 42.7 18.2 39.5 18.2 35.6C18.2 31.7 21.4 28.5 25.3 28.5C26 28.5 26.6 28.6 27.2 28.8C28.8 23.7 33.9 20 40 20Z"/>
              </svg>
            </div>
            <div className="absolute top-24 left-[-10%] animate-[cloud_45s_linear_infinite_15s] opacity-60 text-white scale-75">
               <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 20C40 9 49 0 60 0C68.5 0 75.7 5.3 78.5 12.8C80.3 11.7 82.5 11.1 84.8 11.1C92.6 11.1 98.9 17.4 98.9 25.2C98.9 25.8 98.8 26.3 98.7 26.8C100.8 25.9 103.1 25.4 105.6 25.4C114.6 25.4 122 32.7 122 41.8C122 42.1 122 42.4 122 42.7L25.3 42.7C21.4 42.7 18.2 39.5 18.2 35.6C18.2 31.7 21.4 28.5 25.3 28.5C26 28.5 26.6 28.6 27.2 28.8C28.8 23.7 33.9 20 40 20Z"/>
              </svg>
            </div>
            <div className="absolute top-16 left-[-30%] animate-[cloud_80s_linear_infinite_5s] opacity-90 text-white scale-125">
               <svg width="120" height="40" viewBox="0 0 120 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 20C40 9 49 0 60 0C68.5 0 75.7 5.3 78.5 12.8C80.3 11.7 82.5 11.1 84.8 11.1C92.6 11.1 98.9 17.4 98.9 25.2C98.9 25.8 98.8 26.3 98.7 26.8C100.8 25.9 103.1 25.4 105.6 25.4C114.6 25.4 122 32.7 122 41.8C122 42.1 122 42.4 122 42.7L25.3 42.7C21.4 42.7 18.2 39.5 18.2 35.6C18.2 31.7 21.4 28.5 25.3 28.5C26 28.5 26.6 28.6 27.2 28.8C28.8 23.7 33.9 20 40 20Z"/>
              </svg>
            </div>
          </div>

          <div className="fixed inset-x-0 bottom-0 h-[40vh] pointer-events-none z-0">
            <div className="absolute bottom-0 w-[150%] h-full bg-orange-200 rounded-t-[100%] translate-x-[-20%] translate-y-[40%]"></div>
            <div className="absolute bottom-0 w-[180%] h-full bg-amber-300 rounded-t-[100%] translate-x-[-10%] translate-y-[50%]"></div>
            <div className="absolute bottom-0 w-[120%] h-3/4 bg-orange-300 rounded-t-[100%] translate-x-[10%] translate-y-[30%]"></div>
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {loading && (view === 'LANDING' || view === 'ONBOARDING') ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-8 border-white/40 border-t-emerald-500 rounded-full animate-spin mb-4 shadow-sm"></div>
            <p className="text-emerald-700 font-bold bg-white/60 px-4 py-2 rounded-full border border-white shadow-sm">Memuat profilmu...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {view === 'LANDING' && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 w-full h-full">
              <LandingPage 
                onStart={() => setView('ONBOARDING')} 
                onLogin={async () => {
                  try {
                    await signInWithGoogle();
                  } catch (e: any) {
                    if (e?.code !== 'auth/popup-closed-by-user' && e?.code !== 'auth/cancelled-popup-request') {
                      console.error('Failed login', e);
                    }
                    throw e;
                  }
                }} 
              />
            </motion.div>
          )}

          {view === 'ONBOARDING' && (
            <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 w-full flex flex-col">
              <Onboarding onComplete={handleOnboardingComplete} />
            </motion.div>
          )}

          {view === 'DASHBOARD' && gender && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex-1 w-full flex flex-col">
              <Dashboard 
                name={userName} 
                gender={gender} 
                maxLevel={maxUnlockedLevel} 
                points={points}
                levelScores={levelScores}
                onNavigate={handleDashboardNavigate} 
                onReset={handleReset}
                isGuest={!user}
                onLogin={async () => {
                  try {
                    await signInWithGoogle();
                    // We don't blindly overwrite with local states.
                    // The useEffect listening to `profile` will carefully sync the user's cloud data.
                    // If they want to merge guest progress, we handle it in the profile hook, but for now let's just let cloud take priority so existing users don't lose data.
                  } catch (e: any) {
                    if (e?.code !== 'auth/popup-closed-by-user' && e?.code !== 'auth/cancelled-popup-request') {
                      console.error('Failed login', e);
                    }
                  }
                }}
              />
            </motion.div>
          )}
        
          {view === 'MAP' && (
            <motion.div key="map" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex-1 w-full flex flex-col">
              <Roadmap maxLevel={maxUnlockedLevel} levelScores={levelScores} onSelectLevel={handleSelectLevel} onBack={() => { setView('DASHBOARD'); }} selectedVolume={selectedVolume} onSelectVolume={setSelectedVolume} />
            </motion.div>
          )}
          
          {view === 'LEARNING' && (
            <motion.div key="learning" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="flex-1 w-full flex flex-col">
              <LearningPhase 
                level={currentLevel} 
                maxLevel={maxUnlockedLevel} 
                hasScore={levelScores[currentLevel] !== undefined}
                wrongLetterIds={levelWrongLetters[currentLevel] || []}
                onComplete={handleFinishLearning} 
                onBack={() => { setView('MAP'); }} 
              />
            </motion.div>
          )}
          
          {view === 'QUIZ' && (
            <motion.div key="quiz" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex-1 w-full flex flex-col">
              <QuizPhase level={currentLevel} onFinish={handleFinishQuiz} />
            </motion.div>
          )}
          
          {view === 'FEEDBACK' && (
            <motion.div key="feedback" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex-1 w-full flex flex-col">
              <Feedback 
                score={lastScore} 
                total={getQuestionCount(currentLevel)} 
                onNextLevel={handleNextLevel} 
                onRetry={handleRetry} 
                isExam={currentLevel % STAGES_PER_VOLUME === 0}
                userName={userName}
                currentLevel={currentLevel}
              />
            </motion.div>
          )}
          {view === 'PROFILE' && (
            <motion.div key="profile" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full h-full flex items-center justify-center relative z-10 w-full h-full mx-auto p-4">
              <Profile 
                name={userName}
                gender={gender as 'ikhwan' | 'akhwat'}
                isGuest={!user}
                onSave={(newName, newGender) => {
                  setUserName(newName);
                  setGender(newGender);
                  if (user) {
                    updateProfile({ userName: newName, gender: newGender }).catch(console.error);
                  }
                  setView('DASHBOARD');
                }}
                onBack={() => setView('DASHBOARD')}
                onReset={handleReset}
                onUnlockAll={() => {
                  setMaxUnlockedLevel(TOTAL_LEVELS);
                  if (user) {
                    updateProfile({ maxUnlockedLevel: TOTAL_LEVELS }).catch(console.error);
                  }
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        )}
      
      {/* Home Button and Global Music Toggle overlay if not on onboarding/landing */}
      {gender && view !== 'ONBOARDING' && view !== 'LANDING' && (
        <>
          {view !== 'DASHBOARD' && view !== 'QUIZ' && view !== 'LEARNING' && view !== 'MAP' && view !== 'PROFILE' && (
            <button
              onClick={() => { playSound('back'); setView('DASHBOARD'); }}
              className="fixed top-4 left-4 bg-white/90 backdrop-blur p-3 rounded-full shadow-md text-emerald-700 hover:bg-emerald-50 transition-colors z-50 flex items-center justify-center border-2 border-emerald-100"
              title="Kembali ke Dashboard"
            >
              <Home className="w-5 h-5" />
            </button>
          )}
          
          {!isUstadzOpen && view !== 'QUIZ' && (
            <motion.div
              initial={false}
              animate={{ x: isMenuOpen ? 0 : 'calc(100% - 24px)' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(e, info) => {
                if (info.offset.x < -20) setIsMenuOpen(true);
                else if (info.offset.x > 20) setIsMenuOpen(false);
              }}
              className="fixed top-24 right-0 z-50 flex items-center bg-white/95 backdrop-blur shadow-lg rounded-l-2xl border-y-2 border-l-2 border-slate-200"
            >
              <div 
                className="w-6 h-24 flex items-center justify-center cursor-grab active:cursor-grabbing relative group bg-slate-50/50 rounded-l-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                title="Tarik untuk menu"
              >
                  <div className="w-1 h-10 rounded-full bg-slate-300 group-hover:bg-emerald-400 transition-colors"></div>
              </div>
              <div className="pr-3 pl-2 py-3 flex flex-col gap-3">
                <button
                  onClick={() => setIsUstadzOpen(true)}
                  className="p-3 rounded-[1rem] transition-all active:scale-95 flex items-center justify-center border-2 bg-sky-50 text-sky-500 border-sky-200 hover:bg-sky-100"
                  title="Tanya Ustadz AI"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleBGM}
                  className={`p-3 rounded-[1rem] transition-all active:scale-95 flex items-center justify-center border-2 ${isPlayingBGM ? 'bg-amber-100 text-amber-600 border-amber-300 hover:bg-amber-200' : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'}`}
                  title="Toggle Musik Latar"
                >
                  {isPlayingBGM ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>
          )}
        </>
      )}



      </div>
      {/* Ustadz AI Assistant */}
      <UstadzAI isOpen={isUstadzOpen} onClose={() => { playSound('back'); setIsUstadzOpen(false); }} />

      <CookieConsent />
    </div>
  );
}
