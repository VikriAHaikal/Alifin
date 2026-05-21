import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { playSound } from '../lib/sounds';

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

export function UstadzAI({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: '1',
    role: 'ai',
    content: "Assalamu'alaikum! Ada yang ingin ditanyakan kepada Ustadz tentang mengaji?"
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    playSound('click');
    const userMessage = input.trim();
    setInput("");
    
    // Add user message
    const newMessages: ChatMessage[] = [
      ...messages, 
      { id: Date.now().toString(), role: 'user', content: userMessage }
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ask-ustadz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage })
      });

      if (!response.ok) throw new Error("Failed to get response");
      
      const data = await response.json();
      
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'ai', content: data.answer }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'ai', content: "Maaf ya, Ustadz koneksinya sedang terganggu. Nanti kita coba lagi ya!" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 md:bottom-8 md:right-8 w-full md:w-[400px] lg:w-[450px] h-[85dvh] md:max-h-[min(650px,calc(100vh-80px))] bg-white/95 backdrop-blur-xl md:rounded-[2rem] rounded-t-[2rem] shadow-2xl z-50 flex flex-col border-t-4 md:border-4 border-emerald-100/50 overflow-hidden"
            >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-4 md:p-6 text-white flex justify-between items-center relative overflow-hidden shrink-0 shadow-md">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 mix-blend-overlay"></div>
              <div className="relative z-10 flex gap-4 items-center">
                <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-md border border-white/30 shadow-inner">
                  <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg md:text-xl leading-tight drop-shadow-sm">Ustadz AI</h3>
                  <p className="text-emerald-50 text-xs md:text-sm font-medium drop-shadow-sm opacity-90">Asisten cerdas seputar Al-Qur'an</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="relative z-10 bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all hover:rotate-90"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-5 bg-slate-50/80">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] md:max-w-[80%] p-3.5 md:p-4 rounded-2xl md:rounded-[1.25rem] text-sm md:text-base font-medium leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-emerald-600 text-white rounded-br-sm' 
                        : 'bg-white text-slate-700 border border-slate-100 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-emerald-600 p-3 md:p-4 rounded-2xl rounded-bl-sm shadow-sm border border-slate-100 text-sm md:text-base font-medium flex gap-3 items-center">
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                    <span>Ustadz sedang mengetik...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 md:p-5 bg-white border-t border-slate-100 flex gap-3 shrink-0 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya Ustadz..."
                className="flex-1 bg-slate-50 border border-slate-200 text-slate-700 px-5 py-3.5 rounded-2xl md:rounded-[1.25rem] outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm md:text-base font-medium placeholder:text-slate-400 transition-all shadow-inner"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-emerald-600 text-white p-3.5 md:p-4 rounded-2xl md:rounded-[1.25rem] hover:bg-emerald-700 disabled:bg-slate-300 transition-all shadow-md active:scale-95 flex items-center justify-center min-w-[56px]"
              >
                <Send className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </form>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
