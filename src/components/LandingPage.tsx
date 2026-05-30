import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, BookOpen, Clock, ShieldCheck, Star, ChevronDown, Check, Menu, X, ArrowUp } from 'lucide-react';
import { playSound } from '../lib/sounds';
import { Logo } from './Logo';

export function LandingPage({ onStart, onLogin }: { onStart: () => void, onLogin?: () => Promise<void> }) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStart = () => {
    playSound('click');
    onStart();
  };

  const handleLoginClick = async () => {
    if (onLogin) {
      playSound('click');
      setIsLoggingIn(true);
      try {
        await onLogin();
      } catch (err: any) {
        if (err?.code !== 'auth/popup-closed-by-user' && err?.code !== 'auth/cancelled-popup-request') {
          console.error("Login failed inside LandingPage", err);
        }
      } finally {
        setIsLoggingIn(false);
      }
    } else {
      handleStart();
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans selection:bg-emerald-200 overflow-x-hidden relative flex flex-col">
      
      {/* Nav & Hero Wrapper with Sky & Desert */}
      <div className="relative w-full min-h-[100dvh] flex flex-col overflow-hidden bg-gradient-to-b from-sky-300 to-amber-100">
        
        {/* Animated Clouds scoped to Hero */}
        <div className="absolute inset-x-0 top-0 h-64 pointer-events-none z-0 opacity-70">
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

        {/* Desert Landscape scoped to Hero */}
        <div className="absolute inset-x-0 bottom-0 h-[40vh] pointer-events-none z-0">
          <div className="absolute bottom-0 w-[150%] h-full bg-orange-200 rounded-t-[100%] translate-x-[-20%] translate-y-[40%]"></div>
          <div className="absolute bottom-0 w-[180%] h-full bg-amber-300 rounded-t-[100%] translate-x-[-10%] translate-y-[50%]"></div>
          <div className="absolute bottom-0 w-[120%] h-3/4 bg-orange-300 rounded-t-[100%] translate-x-[10%] translate-y-[30%]"></div>
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 inset-x-0 z-50">
          <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="cursor-pointer">
              <Logo />
            </a>
            
            {/* Desktop Navigation Menus */}
            <div className="hidden md:flex items-center gap-8 text-sm font-black text-slate-600">
              <a href="#cara-kerja" onClick={(e) => handleNavClick(e, 'cara-kerja')} className="hover:text-emerald-600 transition-colors">Cara Kerja</a>
              <a href="#fitur" onClick={(e) => handleNavClick(e, 'fitur')} className="hover:text-emerald-600 transition-colors">Fitur</a>
              <a href="#testimoni" onClick={(e) => handleNavClick(e, 'testimoni')} className="hover:text-emerald-600 transition-colors">Testimoni</a>
              <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-emerald-600 transition-colors">FAQ</a>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Login Button Desktop */}
              <button 
                onClick={handleLoginClick}
                disabled={isLoggingIn}
                className="hidden md:flex bg-emerald-500 border-emerald-700 border-2 border-b-[4px] active:border-b-[2px] active:translate-y-[2px] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-400 transition-all disabled:opacity-50 items-center gap-2"
              >
                {isLoggingIn ? 'Memuat...' : 'Masuk / Login'}
              </button>
              
              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 text-slate-700 hover:bg-white/50 rounded-lg active:scale-95 transition-all"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="md:hidden absolute top-[76px] left-4 right-4 bg-white shadow-2xl rounded-2xl border border-slate-100 overflow-hidden transform-gpu"
              >
                <div className="flex flex-col font-bold text-slate-800 px-6 py-2 divide-y divide-slate-100">
                  <a href="#cara-kerja" onClick={(e) => handleNavClick(e, 'cara-kerja')} className="py-4 hover:text-emerald-600 transition-colors">Cara Kerja</a>
                  <a href="#fitur" onClick={(e) => handleNavClick(e, 'fitur')} className="py-4 hover:text-emerald-600 transition-colors">Fitur</a>
                  <a href="#testimoni" onClick={(e) => handleNavClick(e, 'testimoni')} className="py-4 hover:text-emerald-600 transition-colors">Testimoni</a>
                  <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="py-4 hover:text-emerald-600 transition-colors">FAQ</a>
                  <div className="py-5">
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); handleLoginClick(); }}
                      disabled={isLoggingIn}
                      className="w-full bg-emerald-500 border-emerald-700 border-2 border-b-[4px] active:border-b-[2px] active:translate-y-[2px] text-white px-4 py-3.5 rounded-xl font-bold text-base hover:bg-emerald-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoggingIn ? 'Memuat...' : 'Masuk / Login'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Content */}
        <header className="container mx-auto px-4 md:px-6 pt-32 pb-20 md:pt-40 md:pb-28 relative z-20 text-center flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto w-full mt-8 md:mt-0"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 md:mb-8 leading-[1.15] tracking-tight drop-shadow-sm px-2">
              Belajar Mengaji Lebih <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 drop-shadow-sm">Asyik & Interaktif.</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-800 mb-8 md:mb-12 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm px-2 md:px-0">
              Langkah awal membaca Al-Qur'an untuk semua usia. Dilengkapi teknologi cerdas, kuis seru, dan pelokalan yang ramah pemula.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={handleStart}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 border-emerald-700 border-2 border-b-[6px] active:border-b-[2px] active:translate-y-[4px] text-white font-black text-lg flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
              >
                <Play className="w-5 h-5 fill-white" />
                Coba Tanpa Login
              </button>
            </div>

            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               transition={{ delay: 0.5, duration: 1 }}
               className="mt-12 flex flex-col items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white bg-slate-300 overflow-hidden shadow-sm`} style={{ zIndex: 10 - i }}>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-bold text-slate-700 bg-white/60 px-5 py-2 rounded-full backdrop-blur-md border border-white/50 shadow-sm flex items-center gap-2">
                <div className="flex text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                </div>
                Dipercaya oleh <span className="text-emerald-700">10,000+</span> Pelajar
              </div>
            </motion.div>
          </motion.div>
        </header>
      </div>

      {/* How it Works Section */}
      <section id="cara-kerja" className="py-20 relative z-10 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Cara Belajar di Alifin</h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">Kami menyederhanakan proses belajar agar mudah dimengerti, bahkan oleh yang baru pertama kali mengenal huruf hijaiyah.</p>
             </div>
             
             <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: BookOpen, title: "1. Materi Interaktif", desc: "Mulai dari pengenalan huruf hingga tajwid dengan tata cara yang terstruktur." },
                  { icon: Play, title: "2. Kuis Menyenangkan", desc: "Uji seberapa jauh pemahaman Anda dengan cara yang tidak membosankan." },
                  { icon: Sparkles, title: "3. Evaluasi Pintar", desc: "Pantau progres Anda dan ulangi pada bagian yang masih Anda rasa sulit." }
                ].map((item, idx) => (
                  <motion.div key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className="bg-white rounded-[2rem] p-8 border-2 border-slate-200 border-b-[6px] hover:border-emerald-200 hover:-translate-y-1 transition-all"
                  >
                     <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                        <item.icon className="w-7 h-7 text-emerald-600" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                     <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* App Snippet/Mockup Section */}
      <section className="py-24 relative z-10 w-full overflow-hidden bg-slate-900">
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
             <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">Pengalaman Belajar Seperti Bermain Game</h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">Antarmuka Alifin didesain khusus agar ringan, cepat, dan membuat Anda betah berlama-lama belajar tanpa terasa bosan.</p>
                <ul className="space-y-4 mb-8 text-left inline-block md:block">
                  {['Tampilan Ramah Anak & Dewasa', 'Sistem Poin & Prestasi', 'Audio Native Profesional'].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-200">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      {text}
                    </li>
                  ))}
                </ul>
             </div>
             
             {/* Mockup */}
             <div className="flex-1 w-full max-w-sm mx-auto">
               <div className="relative bg-slate-800 rounded-[2.5rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-slate-700">
                 {/* iPhone Notch */}
                 <div className="absolute top-0 inset-x-0 h-6 bg-slate-700 rounded-b-3xl mx-[25%] z-20"></div>
                 {/* Screen */}
                 <div className="bg-slate-50 rounded-[2rem] overflow-hidden relative min-h-[500px]">
                    <div className="bg-gradient-to-b from-emerald-400 to-teal-500 h-48 absolute top-0 inset-x-0"></div>
                    <div className="relative z-10 p-6 pt-12">
                       <h3 className="text-white font-bold text-2xl mb-6">Materi Hari Ini</h3>
                       
                       <div className="bg-white p-4 rounded-2xl flex justify-between items-center mb-4 border-2 border-slate-200 border-b-[4px]">
                          <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center"><BookOpen className="w-6 h-6 text-sky-600"/></div>
                            <div>
                               <div className="font-bold text-slate-800">Pengenalan Hijaiyah</div>
                               <div className="text-sm text-slate-500">Materi Dasar</div>
                            </div>
                          </div>
                          <div className="text-sky-500"><ChevronDown className="w-5 h-5 -rotate-90"/></div>
                       </div>
                       
                       <div className="bg-white p-4 rounded-2xl flex justify-between items-center border-2 border-slate-200 border-b-[4px]">
                          <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center"><Star className="w-6 h-6 text-amber-600"/></div>
                            <div>
                               <div className="font-bold text-slate-800">Latihan Huruf Alif</div>
                               <div className="text-sm text-slate-500">Kuis 1</div>
                            </div>
                          </div>
                          <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600"><Play className="w-4 h-4 fill-emerald-600"/></div>
                       </div>
                       
                       <div className="mt-8">
                         <motion.div initial={{ width: 0 }} whileInView={{ width: '33%' }} transition={{ duration: 1, delay: 0.5 }} className="h-4 bg-emerald-200 rounded-full mb-3"></motion.div>
                         <motion.div initial={{ width: 0 }} whileInView={{ width: '75%' }} transition={{ duration: 1, delay: 0.6 }} className="h-4 bg-emerald-200 rounded-full mb-3"></motion.div>
                         <motion.div initial={{ width: 0 }} whileInView={{ width: '50%' }} transition={{ duration: 1, delay: 0.7 }} className="h-4 bg-emerald-200 rounded-full"></motion.div>
                       </div>
                    </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="bg-slate-50 py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">Dirancang Untuk Semua</h2>
            <p className="text-lg text-slate-500">Kami percaya setiap orang berhak belajar Al-Qur'an dengan cara yang menyenangkan.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
             {[
               { icon: Sparkles, title: "Ramah Pemula", desc: "Cocok untuk mualaf maupun anak-anak tanpa dasar sama sekali.", color: "bg-emerald-50 text-emerald-600" },
               { icon: Star, title: "Gamifikasi", desc: "Kumpulkan poin dan buka level selanjutnya.", color: "bg-amber-50 text-amber-600" },
               { icon: ShieldCheck, title: "Aman Sepenuhnya", desc: "Konten diverifikasi dan bebas dari iklan yang mengganggu.", color: "bg-sky-50 text-sky-600" },
               { icon: BookOpen, title: "Sesuai Kurikulum", desc: "Materi disusun berjenjang menyerupai metode Iqra.", color: "bg-indigo-50 text-indigo-600" },
               { icon: Clock, title: "Belajar Kapan Saja", desc: "Akses 24/7 di mana pun Anda berada tanpa batasan.", color: "bg-rose-50 text-rose-600" }
             ].map((feat, idx) => (
                <motion.div key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white p-8 rounded-[2rem] border-2 border-slate-200 border-b-[6px] hover:-translate-y-1 transition-all"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feat.color}`}>
                    <feat.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-slate-500">{feat.desc}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimoni" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">Apa Kata Mereka?</h2>
            <p className="text-lg text-slate-500">Testimoni nyata dari mereka yang telah terbantu oleh Alifin.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Review 1 */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="bg-white p-8 rounded-[2rem] border-2 border-slate-200 border-b-[6px] flex flex-col relative hover:-translate-y-1 transition-all"
            >
               <div className="flex gap-1 mb-4">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
               </div>
               <p className="text-slate-700 leading-relaxed mb-6 italic">
                 "Alhamdulillah, aplikasi ini sangat membantu saya belajar dari nol. Materinya terstruktur dan mudah diikuti. Anak saya juga jadi semangat belajarnya!"
               </p>
               <div className="flex items-center gap-4 mt-auto">
                 <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-xl">👨‍💼</div>
                 <div>
                   <h4 className="font-bold text-slate-900">Bapak Budi</h4>
                   <p className="text-sm text-slate-500">Pekerja IT</p>
                 </div>
               </div>
            </motion.div>
            
            {/* Review 2 */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="bg-white p-8 rounded-[2rem] border-2 border-slate-200 border-b-[6px] flex flex-col relative hover:-translate-y-1 transition-all"
            >
               <div className="flex gap-1 mb-4">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
               </div>
               <p className="text-slate-700 leading-relaxed mb-6 italic">
                 "Tampilannya ramah anak, kuisnya interaktif tidak membosankan. Sangat cocok buat ngisi waktu luang jadi bermanfaat."
               </p>
               <div className="flex items-center gap-4 mt-auto">
                 <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-xl">🧕</div>
                 <div>
                   <h4 className="font-bold text-slate-900">Ibu Siti</h4>
                   <p className="text-sm text-slate-500">Ibu Rumah Tangga</p>
                 </div>
               </div>
            </motion.div>

            {/* Review 3 */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.5, delay: 0.3 }}
               className="bg-white p-8 rounded-[2rem] border-2 border-slate-200 border-b-[6px] flex flex-col relative hover:-translate-y-1 transition-all"
            >
               <div className="flex gap-1 mb-4">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
               </div>
               <p className="text-slate-700 leading-relaxed mb-6 italic">
                 "Sebagai mualaf, pengucapan huruf sangat menantang. Tapi adanya audio di aplikasi ini sangat membimbing. Sangat direkomendasikan!"
               </p>
               <div className="flex items-center gap-4 mt-auto">
                 <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-xl">👨‍🎓</div>
                 <div>
                   <h4 className="font-bold text-slate-900">Mas Anton</h4>
                   <p className="text-sm text-slate-500">Mahasiswa</p>
                 </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">Pertanyaan Seputar Alifin</h2>
          </div>
          
          <div className="flex flex-col gap-4">
            {[
              { q: "Apakah Alifin 100% gratis?", a: "Ya. Alifin sepenuhnya gratis. Kami tidak memasang iklan agar fokus dan kekhusyukan pengguna terjaga." },
              { q: "Apakah wajib punya akun?", a: "Tidak. Anda bisa langsung mencoba fitur sebagai Tamu. Akun digunakan hanya jika Anda ingin menyimpan progres hafalan Anda antar perangkat." },
              { q: "Bagaimana jika saya tidak bisa bahasa Arab?", a: "Tentu saja! Alifin dirancang spesifik untuk mereka yang memulai benar-benar dari nol. Modul dimulai dari pengenalan huruf tunggal." },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border-2 border-slate-200 border-b-[4px] overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left font-bold text-slate-800 flex justify-between items-center hover:bg-slate-50 transition-colors"
                >
                  <span className="text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                   {activeFaq === idx && (
                     <motion.div 
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: 'auto', opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                     >
                       <div className="px-6 pb-5 pt-2 text-slate-600 leading-relaxed border-t border-slate-100">
                         {faq.a}
                       </div>
                     </motion.div>
                   )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-emerald-600 text-white relative overflow-hidden">
        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[200%] bg-teal-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.6 }}
           className="container mx-auto px-6 relative z-10 text-center max-w-3xl"
        >
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 md:mb-8 leading-tight">Mari Mulai Perjalanan Membaca Al-Qur'an</h2>
           <p className="text-lg md:text-xl text-emerald-100 mb-8 md:mb-12 font-medium">Bismillah, luangkan 5 menit hari ini untuk mengenal huruf hijaiyah.</p>
           <button 
            onClick={handleLoginClick}
            disabled={isLoggingIn}
            className="px-10 py-5 bg-white border-white border-2 border-b-[6px] active:border-b-[2px] active:translate-y-[4px] shadow-[0_6px_0_rgba(20,184,166,1)] hover:shadow-[0_6px_0_rgba(20,184,166,1)] active:shadow-[0_2px_0_rgba(20,184,166,1)] text-emerald-600 rounded-2xl font-black text-xl hover:bg-emerald-50 transition-all disabled:opacity-50 inline-flex items-center justify-center"
           >
             {isLoggingIn ? 'Memuat...' : 'Mulai Sekarang'}
           </button>
        </motion.div>
      </section>
      
      <footer className="bg-white py-16 text-center text-slate-500 font-medium border-t-2 border-slate-200 flex flex-col items-center gap-6 pb-[100px] sm:pb-16 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="cursor-pointer block focus:outline-none">
            <Logo size="md" className="mx-auto justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" />
          </a>
          
          <div className="max-w-md mx-auto mt-6 mb-8 flex flex-col gap-2">
             <p className="text-slate-600 font-bold text-lg">Alifin.</p>
             <p className="text-sm">Platform belajar membaca Al-Qur'an dan tajwid dasar gratis untuk semua kalangan. Mudah, interaktif, dan menyenangkan.</p>
          </div>

          <div className="h-0.5 bg-slate-100 w-full max-w-lg mx-auto mb-8 rounded-full"></div>

          <p className="text-sm font-bold">&copy; {new Date().getFullYear()} Alifin. Dibuat dengan ❤️ untuk umat.</p>
        </div>
      </footer>
      {/* Back to Top Floating Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-emerald-500 text-white p-3 md:p-4 rounded-full shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 active:scale-95 transition-all z-50 border-2 border-emerald-400 cursor-pointer"
            aria-label="Kembali ke Atas"
          >
            <ArrowUp className="w-6 h-6 md:w-7 md:h-7" strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
