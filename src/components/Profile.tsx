import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Save, User, Settings, Check, LogOut, AlertTriangle, PenLine, Unlock } from 'lucide-react';
import { playSound } from '../lib/sounds';

interface Props {
  name: string;
  gender: 'ikhwan' | 'akhwat';
  isGuest: boolean;
  onSave: (name: string, gender: 'ikhwan' | 'akhwat') => void;
  onBack: () => void;
  onReset: () => void;
  onUnlockAll?: () => void;
}

export function Profile({ name, gender, isGuest, onSave, onBack, onReset, onUnlockAll }: Props) {
  const [editName, setEditName] = useState(name);
  const [editGender, setEditGender] = useState<'ikhwan' | 'akhwat'>(gender);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleSave = () => {
    if (!editName.trim()) return;
    playSound('correct');
    onSave(editName.trim(), editGender);
  };

  const isChanged = editName.trim() !== name || editGender !== gender;
  const isNameEmpty = !editName.trim();

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center p-4 sm:p-6 relative z-10">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 md:w-96 md:h-96 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-200/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 md:w-[600px] md:h-[600px] -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        className="w-full max-w-[420px] bg-white rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-slate-200 flex flex-col relative z-20"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => {
              playSound('back');
              onBack();
            }}
             className="w-10 h-10 rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-200 hover:text-slate-700 active:scale-95 transition-all shadow-sm p-0 m-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
             <Settings className="w-4 h-4 text-emerald-500" />
             <h1 className="font-bold text-emerald-800 text-sm tracking-wide">PENGATURAN</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-5">
          
          {/* Avatar & Name Input */}
          <div className="flex items-center gap-4 bg-slate-50 p-3 sm:p-4 rounded-[1.5rem] border-2 border-slate-100 shadow-sm relative overflow-hidden">
             <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm relative">
                <img 
                  src={editGender === 'ikhwan' ? '/ikhwan.png' : '/akhwat.png'} 
                  alt="Avatar" 
                  className="w-[120%] h-[120%] object-cover mt-2 sm:mt-3 opacity-90 transition-all" 
                />
             </div>
             <div className="flex-1 min-w-0 flex flex-col justify-center">
               <label className="text-xs font-bold text-slate-400 mb-1 ml-1 flex items-center gap-1"><PenLine className="w-3 h-3" /> Nama Kamu</label>
               <input 
                  type="text" 
                  className="w-full bg-white border-2 border-slate-200 rounded-xl px-3 py-2 text-base sm:text-lg font-black text-slate-700 focus:outline-none focus:border-emerald-500 focus:bg-emerald-50/30 transition-all placeholder:text-slate-300"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  placeholder="Nama Panggilan"
                  maxLength={15}
                />
             </div>
          </div>

          {/* Gender Select */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 ml-1 text-center mb-1">Pilih Karakter</label>
            <div className="grid grid-cols-2 gap-3">
               <button 
                  onClick={() => { playSound('click'); setEditGender('ikhwan'); }}
                  className={`py-3 px-3 rounded-2xl border-2 font-black transition-all flex items-center justify-center gap-2 ${
                    editGender === 'ikhwan' 
                    ? 'bg-sky-50 border-sky-400 text-sky-700 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${editGender === 'ikhwan' ? 'bg-sky-200' : 'bg-slate-100 border border-slate-200'}`}>
                     <img src="/ikhwan.png" className="w-[120%] h-[120%] object-cover mt-1" alt="Ikhwan" />
                  </div>
                  <span className="text-sm">Ikhwan</span>
                  {editGender === 'ikhwan' && <Check className="w-4 h-4 flex-shrink-0 stroke-[3]" />}
                </button>
                <button 
                  onClick={() => { playSound('click'); setEditGender('akhwat'); }}
                  className={`py-3 px-3 rounded-2xl border-2 font-black transition-all flex items-center justify-center gap-2 ${
                    editGender === 'akhwat' 
                    ? 'bg-rose-50 border-rose-400 text-rose-700 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${editGender === 'akhwat' ? 'bg-rose-200' : 'bg-slate-100 border border-slate-200'}`}>
                     <img src="/akhwat.png" className="w-[120%] h-[120%] object-cover mt-1" alt="Akhwat" />
                  </div>
                  <span className="text-sm">Akhwat</span>
                  {editGender === 'akhwat' && <Check className="w-4 h-4 flex-shrink-0 stroke-[3]" />}
                </button>
            </div>
          </div>

          <button 
             onClick={handleSave}
             disabled={isNameEmpty || !isChanged}
             className="w-full mt-2 py-4 bg-emerald-500 text-white rounded-2xl font-black text-base sm:text-lg border-b-[4px] border-emerald-700 active:border-b-[0px] active:translate-y-[4px] hover:bg-emerald-400 disabled:opacity-50 disabled:active:border-b-[4px] disabled:active:translate-y-0 disabled:hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Save className="w-5 h-5" />
            Simpan Perubahan
          </button>
          
          <hr className="border-slate-100 my-1" />

          {/* Logout Section */}
          <button
             onClick={() => { playSound('click'); setShowConfirmLogout(true); }}
             className="w-full py-3 bg-white border-2 border-red-100 text-red-500 font-bold rounded-xl hover:bg-red-50 hover:border-red-200 active:scale-95 transition-all flex items-center justify-center gap-2"
           >
             <LogOut className="w-4 h-4" />
             Keluar / Ganti Akun
           </button>

           {/* Unlock All Levels Cheat for User */}
           {onUnlockAll && (
             <button
               onClick={() => {
                 playSound('win');
                 onUnlockAll();
                 onBack();
               }}
               className="w-full py-3 mt-2 bg-sky-50 border-2 border-dashed border-sky-300 text-sky-600 font-bold rounded-xl hover:bg-sky-100 hover:border-sky-400 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
               title="Buka semua materi hingga Iqra 6 (Fitur Tester)"
             >
               <Unlock className="w-4 h-4" />
               Buka Semua Materi (Bypass Tester)
             </button>
           )}
        </div>
      </motion.div>

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
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm md:max-w-md w-full relative z-10 shadow-xl border-4 border-slate-200 flex flex-col items-center text-center"
            >
               <div className="w-16 h-16 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mb-4 rotate-3">
                 <LogOut className="w-8 h-8 -rotate-3" />
               </div>
               <h3 className="text-xl font-black text-slate-800 mb-2">Keluar Aplikasi?</h3>
               {isGuest ? (
                 <p className="text-slate-500 mb-8 font-medium leading-relaxed">
                   Kamu sedang dalam Mode Tamu. Yakin ingin keluar? <br/>
                   <span className="font-bold text-red-500 block mt-2 bg-red-50 py-2 px-3 rounded-lg border border-red-100">Semua progres belajarmu akan hilang!</span>
                 </p>
               ) : (
                 <p className="text-slate-500 mb-8 font-medium leading-relaxed">Yakin ingin keluar dari akunmu? Progresmu sudah tersimpan aman.</p>
               )}
               
               <div className="flex flex-col-reverse sm:flex-row gap-3 w-full">
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
                   className="flex-1 bg-red-500 text-white p-3 sm:p-4 rounded-xl font-bold hover:bg-red-400 transition-all border-2 border-red-700 border-b-[4px] active:border-b-2 active:translate-y-[2px]"
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
