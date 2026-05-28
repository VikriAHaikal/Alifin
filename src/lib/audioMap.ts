import { hijaiyahLetters } from '../data/hijaiyah';

export const iqra1AudioMap: Record<number, string> = {
  1: 'A.mp3',
  2: 'Ba.mp3',
  3: 'Ta.mp3',
  4: 'Tsa.mp3',
  5: 'Ja.mp3',
  6: 'Ha_kecil.mp3', // حَ
  7: 'Kho.mp3',
  8: 'Da.mp3',
  9: 'Dza.mp3', // ذَ
  10: 'Ra.mp3',
  11: 'Za.mp3',
  12: 'Sa.mp3',
  13: 'Sya.mp3',
  14: 'Sha.mp3', // صَ
  15: 'Dha.mp3', // ضَ
  16: 'Tha.mp3', // طَ
  17: 'Dzo.mp3', // ظَ
  18: 'A_ain.mp3', // عَ
  19: 'Gha.mp3', // غَ
  20: 'Fa.mp3',
  21: 'Qa.mp3',
  22: 'Ka.mp3',
  23: 'La.mp3',
  24: 'Ma.mp3',
  25: 'Na.mp3',
  26: 'Wa.mp3',
  27: 'Ha_besar.mp3', // هَ
  28: 'Ya.mp3',
  29: 'A.mp3' // ءَ
};

export const getAudioUrlsForParts = (parts: string[]): string[] => {
  const urls: string[] = [];
  for (const part of parts) {
    const letter = hijaiyahLetters.find(l => l.char === part);
    if (letter && iqra1AudioMap[letter.id]) {
      urls.push(`/audio/hijaiyah/${iqra1AudioMap[letter.id]}`);
    }
  }
  return urls;
};
