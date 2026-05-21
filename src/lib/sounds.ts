// src/lib/sounds.ts

const getAudioContext = () => {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;
  return new AudioContextClass();
};

let audioCtx: AudioContext | null = null;

export const playSound = (type: 'click' | 'correct' | 'wrong' | 'transition' | 'win' | 'back') => {
  if (!audioCtx) {
    audioCtx = getAudioContext();
  }
  if (!audioCtx) return;

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const now = audioCtx.currentTime;

  if (type === 'click') {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, now);
    oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.1);
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.15);
    oscillator.start(now);
    oscillator.stop(now + 0.15);
  } 
  else if (type === 'back') {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(500, now);
    oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.15);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
    
    oscillator.start(now);
    oscillator.stop(now + 0.2);
  }
  else if (type === 'correct') {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, now);
    oscillator.frequency.setValueAtTime(800, now + 0.1);
    oscillator.frequency.setValueAtTime(1200, now + 0.2);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.5, now + 0.05);
    gainNode.gain.setValueAtTime(0.5, now + 0.2);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.4);
    
    oscillator.start(now);
    oscillator.stop(now + 0.4);
  }
  else if (type === 'wrong') {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(300, now);
    oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.3);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.5, now + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.4);
    
    oscillator.start(now);
    oscillator.stop(now + 0.4);
  }
  else if (type === 'transition') {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, now);
    oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.2);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
    
    oscillator.start(now);
    oscillator.stop(now + 0.3);
  }
  else if (type === 'win') {
    const freqs = [440, 554.37, 659.25, 880];
    let startTime = now;
    
    freqs.forEach((freq) => {
      const osc = audioCtx!.createOscillator();
      const gain = audioCtx!.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.4, startTime + 0.05);
      gain.gain.linearRampToValueAtTime(0, startTime + 0.3);
      
      osc.connect(gain);
      gain.connect(audioCtx!.destination);
      
      osc.start(startTime);
      osc.stop(startTime + 0.3);
      
      startTime += 0.15;
    });
  }
};
