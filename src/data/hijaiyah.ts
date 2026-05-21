export const hijaiyahLetters = [
  { id: 1, char: 'اَ', name: 'A', idTTS: 'a', arTTS: 'أَ', hint: 'Garis lurus seperti tiang.' },
  { id: 2, char: 'بَ', name: 'Ba', idTTS: 'ba', arTTS: 'بَ', hint: 'Seperti perahu, titik satu di bawah.' },
  { id: 3, char: 'تَ', name: 'Ta', idTTS: 'ta', arTTS: 'تَ', hint: 'Seperti perahu, senyum dengan titik dua di atas.' },
  { id: 4, char: 'ثَ', name: 'Tsa', idTTS: 'tsa', arTTS: 'ثَ', hint: 'Seperti perahu, titik tiga di atas. Ucapkan dengan ujung lidah.' },
  { id: 5, char: 'جَ', name: 'Ja', idTTS: 'ja', arTTS: 'جَ', hint: 'Ada perut di bawah, titik satu di tengah.' },
  { id: 6, char: 'حَ', name: 'Ha', idTTS: 'ha', arTTS: 'حَ', hint: 'Sama seperti ja, tapi bersih tanpa titik.' },
  { id: 7, char: 'خَ', name: 'Kho', idTTS: 'kho', arTTS: 'خَ', hint: 'Sama seperti ja, tapi titiknya di atas.' },
  { id: 8, char: 'دَ', name: 'Da', idTTS: 'da', arTTS: 'دَ', hint: 'Garis menekuk, tanpa titik.' },
  { id: 9, char: 'ذَ', name: 'Dza', idTTS: 'dza', arTTS: 'ذَ', hint: 'Seperti da, tapi ada titiknya satu di atas.' },
  { id: 10, char: 'رَ', name: 'Ro', idTTS: 'ro', arTTS: 'رَ', hint: 'Garis melengkung ke bawah, tidak ada titiknya.' },
  { id: 11, char: 'زَ', name: 'Za', idTTS: 'za', arTTS: 'زَ', hint: 'Bila tidak ada titiknya dibaca ro, ini ada titiknya di atas.' },
  { id: 12, char: 'سَ', name: 'Sa', idTTS: 'sa', arTTS: 'سَ', hint: 'Punya gigi tiga, tanpa titik.' },
  { id: 13, char: 'شَ', name: 'Sya', idTTS: 'sya', arTTS: 'شَ', hint: 'Punya gigi tiga, dengan tiga titik di atas.' },
  { id: 14, char: 'صَ', name: 'Sho', idTTS: 'sho', arTTS: 'صَ', hint: 'Ada lubang agak bulat, tanpa titik.' },
  { id: 15, char: 'ضَ', name: 'Dho', idTTS: 'dho', arTTS: 'ضَ', hint: 'Seperti sho, tapi ada titik satu di atas.' },
  { id: 16, char: 'طَ', name: 'Tho', idTTS: 'tho', arTTS: 'طَ', hint: 'Ada kotak melingkar dan tiang, tanpa titik.' },
  { id: 17, char: 'ظَ', name: 'Zho', idTTS: 'zho', arTTS: 'ظَ', hint: 'Seperti tho, tapi dengan satu titik di atas.' },
  { id: 18, char: 'عَ', name: '\'A', idTTS: 'a', arTTS: 'عَ', hint: 'Mulut terbuka ke kiri, tanpa titik.' },
  { id: 19, char: 'غَ', name: 'Gho', idTTS: 'gho', arTTS: 'غَ', hint: 'Seperti \'a, tapi titiknya satu di atas.' },
  { id: 20, char: 'فَ', name: 'Fa', idTTS: 'fa', arTTS: 'فَ', hint: 'Punya kepala bulat, titik satu di atas.' },
  { id: 21, char: 'قَ', name: 'Qo', idTTS: 'qo', arTTS: 'قَ', hint: 'Seperti fa, tapi titiknya dua di atas.' },
  { id: 22, char: 'كَ', name: 'Ka', idTTS: 'ka', arTTS: 'كَ', hint: 'Garis siku dengan bentuk hamzah kecil di dalamnya.' },
  { id: 23, char: 'لَ', name: 'La', idTTS: 'la', arTTS: 'لَ', hint: 'Garis lurus seperti kail pancing.' },
  { id: 24, char: 'مَ', name: 'Ma', idTTS: 'ma', arTTS: 'مَ', hint: 'Kepala bulat berlubang, ekor melengkung ke bawah.' },
  { id: 25, char: 'نَ', name: 'Na', idTTS: 'na', arTTS: 'نَ', hint: 'Setengah lingkaran (seperti mangkuk), titik satu di tengah/atas.' },
  { id: 26, char: 'وَ', name: 'Wa', idTTS: 'wa', arTTS: 'وَ', hint: 'Bentuk seperti huruf u atau angka sembilan.' },
  { id: 27, char: 'هَ', name: 'Ha', idTTS: 'ha', arTTS: 'هَ', hint: 'Bentuk bulat atau ikatan tali.' },
  { id: 28, char: 'يَ', name: 'Ya', idTTS: 'ya', arTTS: 'يَ', hint: 'Seperti angsa dengan dua titik di bawah.' }
];

export interface QuizQuestion {
  id: string;
  letterId: number; // For sequence, the id of the combo
  type: 'visual' | 'audio' | 'sequence';
  question: string;
  correctAnswer: string; // The joined sequence string e.g. "اَ بَ"
  options: string[]; // Options to pick from (for sequence: single letters)
  hint: string;
  audioText: string;
  idTTS: string;
}

export const IQRA_VOLUMES = 6;
export const STAGES_PER_VOLUME = 7;
export const TOTAL_LEVELS = IQRA_VOLUMES * STAGES_PER_VOLUME;

export const getBaseLettersForLevel = (level: number) => {
  const levelRanges = [
    { level: 1, start: 1, end: 4 }, // a, ba, ta, tsa
    { level: 2, start: 5, end: 7 }, // ja, ha, kho
    { level: 3, start: 8, end: 11 }, // da, dza, ro, za
    { level: 4, start: 12, end: 15 }, // sa, sya, sho, dho
    { level: 5, start: 16, end: 19 }, // tho, zho, a, gho
    { level: 6, start: 20, end: 23 }, // fa, qo, ka, la
    { level: 7, start: 24, end: 28 }, // ma, na, wa, ha, ya
  ];
  
  const volume = Math.ceil(Math.min(level, TOTAL_LEVELS) / STAGES_PER_VOLUME);
  const normalizedLevel = ((level - 1) % STAGES_PER_VOLUME) + 1;
  const range = levelRanges.find(r => r.level === normalizedLevel) || levelRanges[0];
  const baseLetters = hijaiyahLetters.filter(l => l.id >= range.start && l.id <= range.end);
  
  if (volume === 1) return baseLetters;
  
  return baseLetters.map(l => {
    let char = l.char;
    let name = l.name.toLowerCase();
    let arTTS = l.arTTS;

    // Fathah unicode is \u064E
    const convert = (newHarokat: string, suffix: string) => {
      char = char.replace('\u064E', newHarokat);
      arTTS = arTTS.replace('\u064E', newHarokat);
      if (name === 'a') name = suffix;
      else if (name === "'a") name = "'" + suffix;
      else if (name.endsWith('a') || name.endsWith('o')) name = name.slice(0, -1) + suffix;
      else name = name + suffix;
    };

    if (volume === 2) convert('\u0650', 'i'); // Kasrah
    else if (volume === 3) convert('\u064F', 'u'); // Dhammah
    else if (volume === 4) convert('\u064B', 'an'); // Fathatain
    else if (volume === 5) convert('\u064D', 'in'); // Kasratain
    else if (volume === 6) convert('\u064C', 'un'); // Dhammatain

    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    return { ...l, char, name: capitalizedName, idTTS: name, arTTS };
  });
};

export const getLettersForLevel = (level: number) => {
  const baseLetters = getBaseLettersForLevel(level);
  const volume = Math.ceil(Math.min(level, TOTAL_LEVELS) / STAGES_PER_VOLUME);
  
  // We only add combos (reading practice) to Iqra 1 for now
  if (volume !== 1) return baseLetters;
  
  const allAvailableBaseLetters: typeof hijaiyahLetters = [];
  const normalizedMax = Math.min(level, STAGES_PER_VOLUME);
  for (let i = 1; i <= normalizedMax; i++) {
    allAvailableBaseLetters.push(...getBaseLettersForLevel(i));
  }
  
  const combos: typeof hijaiyahLetters = [];
  
  // Generate 4 practice combinations blending new letters with old ones
  for (let i = 0; i < 4; i++) {
    const isThreeLetters = Math.random() > 0.3; // 70% chance of 3 letters, 30% of 2 letters
    const comboLength = isThreeLetters ? 3 : 2;
    
    const pickedLetters = [];
    
    // Always guarantee that at least one letter is from the current level
    pickedLetters.push(baseLetters[Math.floor(Math.random() * baseLetters.length)]);
    
    for (let j = 1; j < comboLength; j++) {
      pickedLetters.push(allAvailableBaseLetters[Math.floor(Math.random() * allAvailableBaseLetters.length)]);
    }
    
    // Shuffle the picked letters
    pickedLetters.sort(() => 0.5 - Math.random());
    
    const char = pickedLetters.map(l => l.char).join(' ');
    const name = pickedLetters.map(l => l.name).join(' ');
    // Important: Using an arabic comma ' ، ' for TTS to have a tiny pause
    const arTTS = pickedLetters.map(l => l.arTTS).join(' ، '); 
    const idTTS = pickedLetters.map(l => l.idTTS).join(' ');
    
    combos.push({
      id: level * 1000 + i, // unique offset ID for combos
      char,
      name,
      idTTS,
      arTTS,
      hint: 'Rangkaian huruf: baca satu per satu tanpa lambat.'
    });
  }

  return [...baseLetters, ...combos];
};

export const getAllLettersUpToLevel = (level: number) => {
  const letters: typeof hijaiyahLetters = [];
  const normalizedMax = Math.min(level, STAGES_PER_VOLUME);
  for (let i = 1; i <= normalizedMax; i++) {
    letters.push(...getLettersForLevel(i));
  }
  return letters;
};

export const generateQuiz = (level: number = 1, count: number = 5): QuizQuestion[] => {
  const currentLevelLetters = getLettersForLevel(level);
  const allAvailableLetters = getAllLettersUpToLevel(level);
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < count; i++) {
    // 70% chance to pick from current level, 30% from past levels (if level > 1)
    let targetPool = currentLevelLetters;
    if (level > 1 && Math.random() > 0.7) {
      targetPool = allAvailableLetters;
    }
    
    // In Stage 1 there's no past level, but we want variety
    if (targetPool.length === 0) targetPool = currentLevelLetters;
    
    const target = targetPool[Math.floor(Math.random() * targetPool.length)];
    const isTargetCombo = target.id >= 1000;
    
    // Determine the type: if combo, 50% chance to be sequence
    const isSequence = isTargetCombo && Math.random() > 0.5;
    const isAudio = !isSequence && Math.random() > 0.5;
    
    if (isSequence) {
      const parts = target.char.split(' ');
      // Add random single letters to the pool
      const singleLetterPool = allAvailableLetters.filter(l => l.id < 1000 && !parts.includes(l.char));
      const decoys = singleLetterPool.sort(() => 0.5 - Math.random()).slice(0, 2).map(l => l.char);
      const options = [...parts, ...decoys].sort(() => 0.5 - Math.random());
      
      questions.push({
        id: `q_${i}_${target.id}_seq`,
        letterId: target.id,
        type: 'sequence',
        question: `Dengarkan suara Ustadz. Susun huruf berikut secara berurutan: ${target.name.split(' ').join(' - ')}`,
        correctAnswer: target.char,
        options,
        hint: `Susun sesuai apa yang kamu dengar.`,
        audioText: target.arTTS,
        idTTS: target.idTTS
      });
      continue;
    }

    // Standard options generation for visual/audio
    let wrongOptionsPool = allAvailableLetters.filter(l => l.id !== target.id && (l.id >= 1000) === isTargetCombo);
    
    // If not enough pool, fall back to any available letters
    if (wrongOptionsPool.length < 3) {
      wrongOptionsPool = allAvailableLetters.filter(l => l.id !== target.id);
    }
    
    let wrongOptions = [...wrongOptionsPool];
    
    // If we don't have enough wrong options (e.g., Level 1), pad with other random letters
    if (wrongOptions.length < 3) {
      // Just create synthetic wrong options by shuffling target char if it's combo, or getting random hijaiyah if single
      if (isTargetCombo) {
        const parts = target.char.split(' ');
        for (let pad = 0; pad < 3 - wrongOptions.length; pad++) {
           wrongOptions.push({ ...target, char: [...parts].sort(() => 0.5 - Math.random()).join(' ') });
        }
      } else {
        const padding = hijaiyahLetters.filter(l => l.id !== target.id && !wrongOptions.find(wo => wo.id === l.id));
        wrongOptions.push(...padding.sort(() => 0.5 - Math.random()).slice(0, 3 - wrongOptions.length));
      }
    }
    
    wrongOptions = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const options = [target.char, ...wrongOptions.map(l => l.char)].sort(() => 0.5 - Math.random());
    
    questions.push({
      id: `q_${i}_${target.id}`,
      letterId: target.id,
      type: isAudio ? 'audio' : 'visual',
      question: isAudio ? `Dengarkan suara Ustadz. Huruf apakah ini?` : `Huruf apakah ini: "${target.name}"?`,
      correctAnswer: target.char,
      options,
      hint: target.hint,
      audioText: target.arTTS,
      idTTS: target.idTTS
    });
  }

  return questions;
};
