export const hijaiyahLetters = [
  {
    id: 1,
    char: "اَ",
    name: "A",
    idTTS: "a",
    arTTS: "اَ",
    hint: "Garis lurus seperti tiang.",
  },
  {
    id: 2,
    char: "بَ",
    name: "Ba",
    idTTS: "ba",
    arTTS: "بَ",
    hint: "Seperti perahu, titik satu di bawah.",
  },
  {
    id: 3,
    char: "تَ",
    name: "Ta",
    idTTS: "ta",
    arTTS: "تَ",
    hint: "Seperti perahu, senyum dengan titik dua di atas.",
  },
  {
    id: 4,
    char: "ثَ",
    name: "Tsa",
    idTTS: "tsa",
    arTTS: "ثَ",
    hint: "Seperti perahu, titik tiga di atas. Ucapkan dengan ujung lidah.",
  },
  {
    id: 5,
    char: "جَ",
    name: "Ja",
    idTTS: "ja",
    arTTS: "جَ",
    hint: "Ada perut di bawah, titik satu di tengah.",
  },
  {
    id: 6,
    char: "حَ",
    name: "Ha",
    idTTS: "ha",
    arTTS: "حَ",
    hint: "Sama seperti ja, tapi bersih tanpa titik.",
  },
  {
    id: 7,
    char: "خَ",
    name: "Kho",
    idTTS: "kho",
    arTTS: "خَ",
    hint: "Sama seperti ja, tapi titiknya di atas.",
  },
  {
    id: 8,
    char: "دَ",
    name: "Da",
    idTTS: "da",
    arTTS: "دَ",
    hint: "Garis menekuk, tanpa titik.",
  },
  {
    id: 9,
    char: "ذَ",
    name: "Dza",
    idTTS: "dza",
    arTTS: "ذَ",
    hint: "Seperti da, tapi ada titiknya satu di atas.",
  },
  {
    id: 10,
    char: "رَ",
    name: "Ro",
    idTTS: "ro",
    arTTS: "رَ",
    hint: "Garis melengkung ke bawah, tidak ada titiknya.",
  },
  {
    id: 11,
    char: "زَ",
    name: "Za",
    idTTS: "za",
    arTTS: "زَ",
    hint: "Bila tidak ada titiknya dibaca ro, ini ada titiknya di atas.",
  },
  {
    id: 12,
    char: "سَ",
    name: "Sa",
    idTTS: "sa",
    arTTS: "سَ",
    hint: "Punya gigi tiga, tanpa titik.",
  },
  {
    id: 13,
    char: "شَ",
    name: "Sya",
    idTTS: "sya",
    arTTS: "شَ",
    hint: "Punya gigi tiga, dengan tiga titik di atas.",
  },
  {
    id: 14,
    char: "صَ",
    name: "Sho",
    idTTS: "sho",
    arTTS: "صَ",
    hint: "Ada lubang agak bulat, tanpa titik.",
  },
  {
    id: 15,
    char: "ضَ",
    name: "Dho",
    idTTS: "dho",
    arTTS: "ضَ",
    hint: "Seperti sho, tapi ada titik satu di atas.",
  },
  {
    id: 16,
    char: "طَ",
    name: "Tho",
    idTTS: "tho",
    arTTS: "طَ",
    hint: "Ada kotak melingkar dan tiang, tanpa titik.",
  },
  {
    id: 17,
    char: "ظَ",
    name: "Zho",
    idTTS: "zho",
    arTTS: "ظَ",
    hint: "Seperti tho, tapi dengan satu titik di atas.",
  },
  {
    id: 18,
    char: "عَ",
    name: "'A",
    idTTS: "a",
    arTTS: "عَ",
    hint: "Mulut terbuka ke kiri, tanpa titik.",
  },
  {
    id: 19,
    char: "غَ",
    name: "Gho",
    idTTS: "gho",
    arTTS: "غَ",
    hint: "Seperti 'a, tapi titiknya satu di atas.",
  },
  {
    id: 20,
    char: "فَ",
    name: "Fa",
    idTTS: "fa",
    arTTS: "فَ",
    hint: "Punya kepala bulat, titik satu di atas.",
  },
  {
    id: 21,
    char: "قَ",
    name: "Qo",
    idTTS: "qo",
    arTTS: "قَ",
    hint: "Seperti fa, tapi titiknya dua di atas.",
  },
  {
    id: 22,
    char: "كَ",
    name: "Ka",
    idTTS: "ka",
    arTTS: "كَ",
    hint: "Garis siku dengan bentuk hamzah kecil di dalamnya.",
  },
  {
    id: 23,
    char: "لَ",
    name: "La",
    idTTS: "la",
    arTTS: "لَ",
    hint: "Garis lurus seperti kail pancing.",
  },
  {
    id: 24,
    char: "مَ",
    name: "Ma",
    idTTS: "ma",
    arTTS: "مَ",
    hint: "Kepala bulat berlubang, ekor melengkung ke bawah.",
  },
  {
    id: 25,
    char: "نَ",
    name: "Na",
    idTTS: "na",
    arTTS: "نَ",
    hint: "Setengah lingkaran (seperti mangkuk), titik satu di tengah/atas.",
  },
  {
    id: 26,
    char: "وَ",
    name: "Wa",
    idTTS: "wa",
    arTTS: "وَ",
    hint: "Bentuk seperti huruf u atau angka sembilan.",
  },
  {
    id: 27,
    char: "هَ",
    name: "Ha",
    idTTS: "ha",
    arTTS: "هَ",
    hint: "Bentuk bulat atau ikatan tali.",
  },
  {
    id: 28,
    char: "يَ",
    name: "Ya",
    idTTS: "ya",
    arTTS: "يَ",
    hint: "Seperti angsa dengan dua titik di bawah.",
  },
];

export interface QuizQuestion {
  id: string;
  letterId: number; // For sequence, the id of the combo
  type: "visual" | "audio" | "sequence";
  question: string;
  correctAnswer: string; // The joined sequence string e.g. "اَ بَ"
  parts?: string[]; // The separated elements that make up the combo
  options: string[]; // Options to pick from (for sequence: single letters)
  hint: string;
  audioText: string;
  idTTS: string;
}

export const IQRA_VOLUMES = 6;
export const STAGES_PER_VOLUME = 7;
export const TOTAL_LEVELS = IQRA_VOLUMES * STAGES_PER_VOLUME;

// IQRA 2 now generated dynamically

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
  const range =
    levelRanges.find((r) => r.level === normalizedLevel) || levelRanges[0];
  const baseLetters = hijaiyahLetters.filter(
    (l) => l.id >= range.start && l.id <= range.end,
  );

  if (volume === 1) return baseLetters;

  return baseLetters.map((l) => {
    let char = l.char;
    let name = l.name.toLowerCase();
    let arTTS = l.arTTS;
    let hint = l.hint;

    const replaceHarokat = (
      newHarokat: string,
      suffix: string,
      longChar = "",
    ) => {
      char = char.replace("\u064E", newHarokat) + longChar;
      arTTS = arTTS.replace("\u064E", newHarokat) + longChar;

      let baseName = name;
      if (baseName === "a") baseName = "";
      else if (baseName === "'a") baseName = "'";
      else if (baseName.endsWith("a") || baseName.endsWith("o"))
        baseName = baseName.slice(0, -1);

      name = baseName + suffix;
    };

    if (volume === 2) {
      // Handled entirely manually in getLettersForLevel to show pairs
      // But we just return base fathah here to act as pool base
    } else if (volume === 3) {
      // Iqro 3: Kasrah, Dhammah, Mad Lanjut
      const r = l.id % 4;
      if (r === 0) {
        replaceHarokat("\u0650", "i");
        hint = `Kasrah (baris bawah) dibaca: ${name}`;
      } else if (r === 1) {
        replaceHarokat("\u064F", "u");
        hint = `Dhammah (baris depan) dibaca: ${name}`;
      } else if (r === 2) {
        replaceHarokat("\u0650", "ii", "ي");
        hint = `Mad Kasrah dibaca panjang: ${name}`;
      } else {
        replaceHarokat("\u064F", "uu", "و");
        hint = `Mad Dhammah dibaca panjang: ${name}`;
      }
    } else if (volume === 4) {
      // Iqro 4: Tanwin, Sukun, Qalqalah
      const r = l.id % 4;
      if (r === 0) {
        replaceHarokat("\u064B", "an", "ا"); // Fathatain
        hint = `Tanwin Fathah (an): ${name}`;
      } else if (r === 1) {
        replaceHarokat("\u064D", "in"); // Kasratain
        hint = `Tanwin Kasrah (in): ${name}`;
      } else if (r === 2) {
        replaceHarokat("\u064C", "un"); // Dhammatain
        hint = `Tanwin Dhammah (un): ${name}`;
      } else {
        // Sukun (add Alif Fathah at front so we can pronounce it like Ab, At)
        char = "أَ" + char.replace("\u064E", "\u0652");
        arTTS = char;
        let baseName = name;
        if (baseName === "a") baseName = "";
        else if (baseName === "'a") baseName = "'";
        else if (baseName.endsWith("a") || baseName.endsWith("o"))
          baseName = baseName.slice(0, -1);
        name = "a" + baseName;
        hint = `Huruf Sukun (mati): ${name}`;
      }
    } else if (volume === 5) {
      // Iqro 5: Tasydid, Alif Lam
      if (l.id % 2 === 0) {
        // Tasydid: e.g. أبَّ
        char = "أَ" + char.replace("\u064E", "\u0651\u064E");
        arTTS = char;
        let baseName = name;
        if (baseName === "a") baseName = "";
        else if (baseName === "'a") baseName = "'";
        else if (baseName.endsWith("a") || baseName.endsWith("o"))
          baseName = baseName.slice(0, -1);
        name = "a" + baseName + baseName + "a";
        hint = `Tasydid (ditekan): ${name}`;
      } else {
        // Alif lam: e.g. البَ
        char = "اَلْ" + char;
        arTTS = char;
        name = "al " + name;
        hint = `Alif Lam (baca al-): ${name}`;
      }
    } else if (volume === 6) {
      // Iqro 6: Nun Mati / Hukum Tajwid
      char = "مِنْ " + char;
      arTTS = "مِنْ " + arTTS;
      hint = `Hukum Tajwid Nun Sukun / Tanwin sebelum ${l.name}`;
      name = "min " + name;
    }

    const capitalizedName = name
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return { ...l, char, name: capitalizedName, idTTS: name, arTTS, hint };
  });
};

export const getLettersForLevel = (level: number) => {
  const baseLetters = getBaseLettersForLevel(level);
  const volume = Math.ceil(Math.min(level, TOTAL_LEVELS) / STAGES_PER_VOLUME);
  const normalizedLevel = ((level - 1) % STAGES_PER_VOLUME) + 1;

  const combos: typeof hijaiyahLetters = [];

  if (volume === 1) {
    const poolBase = hijaiyahLetters.slice(
      0,
      baseLetters[baseLetters.length - 1]?.id || Math.min(level * 4, 28),
    );
    const volume1ComboCount = 10;

    for (let i = 0; i < volume1ComboCount; i++) {
      const isThreeLetters = Math.random() > 0.4;
      const comboLength = isThreeLetters ? 3 : 2;
      const pickedLetters = [];
      pickedLetters.push(
        baseLetters[Math.floor(Math.random() * baseLetters.length)],
      );

      for (let j = 1; j < comboLength; j++) {
        pickedLetters.push(
          poolBase[Math.floor(Math.random() * poolBase.length)],
        );
      }

      pickedLetters.sort(() => 0.5 - Math.random());

      const char = pickedLetters.map((l) => l.char).join(" ");
      const finalName = pickedLetters
        .map((l) => l.name.toLowerCase())
        .join(" ");
      const formatName = finalName
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
      const idTTS = pickedLetters.map((l) => l.idTTS).join(" ");
      const arTTS = pickedLetters.map((l) => l.arTTS).join(" ، ");

      combos.push({
        id: 100000 + level * 1000 + i,
        char,
        name: formatName,
        idTTS,
        arTTS,
        hint: "Baca satu per satu secara berurutan",
        parts: pickedLetters.map((l) => l.char),
      } as any);
    }
    return [...baseLetters, ...combos];
  }

  if (volume === 2) {
    const pairs: typeof hijaiyahLetters = [];
    
    // Show single letter variations learning cards - skip for level 8 as it focuses solely on 2-letter combos
    if (level > 8) {
      baseLetters.forEach(l => {
        if (l.id === 1) { // Alif
           pairs.push({
             ...l,
             id: 2001,
             char: "اَ",
             name: "A",
             arTTS: "اَ",
             idTTS: "a",
             hint: "Alif fathah dibaca pendek 'a'"
           });
           pairs.push({
             ...l,
             id: 2002,
             char: "اَا",
             name: "Aa",
             arTTS: "اَا",
             idTTS: "a",
             hint: "Alif bertemu alif mati dibaca panjang 'aa'"
           });
           
           if (normalizedLevel >= 5) {
              pairs.push({
                ...l,
                id: 2003,
                char: "ا\u0670",
                name: "Aa",
                arTTS: "ا\u0670",
                idTTS: "a",
                hint: "Fathah berdiri, dibaca panjang 'aa'"
              });
           }
        } else {
           pairs.push({
             ...l,
             id: 2000 + l.id,
             char: l.char + "ا",
             name: l.name + (l.name.toLowerCase().endsWith('a') ? "a" : "aa"),
             arTTS: l.arTTS + "ا",
             idTTS: l.idTTS,
             hint: `${l.name} bertemu alif dibaca panjang`
           });
           
           if (normalizedLevel >= 5) {
              pairs.push({
                 ...l,
                 id: 3000 + l.id,
                 char: l.char.replace("\u064E", "\u0670"),
                 name: l.name + (l.name.toLowerCase().endsWith('a') ? "a" : "aa"),
                 arTTS: l.arTTS.replace("\u064E", "\u0670"),
                 idTTS: l.idTTS,
                 hint: `Fathah berdiri dibaca panjang`
              });
           }
        }
      });
    }

    const poolBase = hijaiyahLetters.slice(0, 28);

    const volume2ComboCount = level === 8 ? 14 : 15;
    const firstLetterPool = level === 8 ? poolBase : (baseLetters.length > 0 ? baseLetters : poolBase);

    // Force some examples with 'a' in the middle/end and identical sambung if we have Ba, Ta, Tsa in the pool
    if (level === 8) {
      combos.push({
        id: 108000,
        char: "بَبَ",
        parts: ["بَ", "بَ"],
        name: "Ba ba",
        idTTS: "ba ba",
        arTTS: "بَ ، بَ",
        hint: "Titik satu di bawah = Ba",
      } as any);
      combos.push({
        id: 108001,
        char: "تَتَ",
        parts: ["تَ", "تَ"],
        name: "Ta ta",
        idTTS: "ta ta",
        arTTS: "تَ ، تَ",
        hint: "Titik dua di atas = Ta",
      } as any);
      combos.push({
        id: 108002,
        char: "ثَثَ",
        parts: ["ثَ", "ثَ"],
        name: "Tsa tsa",
        idTTS: "tsa tsa",
        arTTS: "ثَ ، ثَ",
        hint: "Titik tiga di atas = Tsa",
      } as any);
      combos.push({
        id: 108003,
        char: "بَاَ",
        parts: ["بَ", "اَ"],
        name: "Ba a",
        idTTS: "ba a",
        arTTS: "بَ ، اَ",
        hint: "Alif (ا) di akhir dibaca pendek 'a'",
      } as any);
      combos.push({
        id: 108004,
        char: "تَاَ",
        parts: ["تَ", "اَ"],
        name: "Ta a",
        idTTS: "ta a",
        arTTS: "تَ ، اَ",
        hint: "Alif (ا) di akhir dibaca pendek 'a'",
      } as any);
      combos.push({
        id: 108005,
        char: "اَبَ",
        parts: ["اَ", "بَ"],
        name: "A ba",
        idTTS: "a ba",
        arTTS: "اَ ، بَ",
        hint: "Alif (ا) di awal tidak bisa nyambung ke kiri",
      } as any);
    }

    for (let i = 0; i < volume2ComboCount; i++) {
      const isThreeLetters = level === 8 ? false : Math.random() > 0.3;
      const comboLength = isThreeLetters ? 3 : 2;
      const pickedLetters = [];
      pickedLetters.push(
        firstLetterPool[Math.floor(Math.random() * firstLetterPool.length)],
      );

      for (let j = 1; j < comboLength; j++) {
        pickedLetters.push(
          poolBase[Math.floor(Math.random() * poolBase.length)],
        );
      }

      pickedLetters.sort(() => 0.5 - Math.random());

      const transformedLetters = pickedLetters.map((l) => {
        // Special variations for 'a' to show different hamzah/alif forms in Iqro 2
        if (l.id === 1) {
          const aVariations = ["اَ"];
          const pickedA = aVariations[0];
          return {
            ...l,
            char: pickedA,
            name: "a",
            arTTS: pickedA,
            idTTS: "a",
          };
        }

        // Randomly make it short or long. Level 8 has NO long vowels (no mad).
        const isLong = level === 8 ? false : Math.random() > 0.6;
        if (!isLong) return l;

        // Long variations: Stages 1-4 Alif mati, Stages 5-7 introduce Fathah Berdiri
        let isStandingFathah = false;
        if (normalizedLevel >= 5) {
          isStandingFathah = Math.random() > 0.5;
        }

        let longChar = l.char;
        let longArTTS = l.arTTS;
        if (isStandingFathah) {
          longChar = longChar.replace("\u064E", "\u0670");
          longArTTS = longArTTS.replace("\u064E", "\u0670");
        } else {
          longChar = longChar.replace("\u064E", "\u064Eا");
          longArTTS = longArTTS.replace("\u064E", "\u064Eا");
        }

        let baseName = l.name.toLowerCase();
        if (baseName === "a") baseName = "";
        else if (baseName === "'a") baseName = "'";
        else if (baseName.endsWith("a") || baseName.endsWith("o"))
          baseName = baseName.slice(0, -1);

        let longName = baseName + "aa";
        if (l.name.toLowerCase() === "ro") longName = "roo";
        if (l.name.toLowerCase() === "sho") longName = "shoo";
        if (l.name.toLowerCase() === "dho") longName = "dhoo";
        if (l.name.toLowerCase() === "tho") longName = "thoo";
        if (l.name.toLowerCase() === "zho") longName = "zhoo";
        if (l.name.toLowerCase() === "qo") longName = "qoo";
        if (l.name.toLowerCase() === "gho") longName = "ghoo";
        if (l.name.toLowerCase() === "kho") longName = "khoo";

        const capName = longName.charAt(0).toUpperCase() + longName.slice(1);

        return {
          ...l,
          char: longChar,
          name: capName,
          arTTS: longArTTS,
          idTTS: capName.toLowerCase().replace("'", " "),
        };
      });

      const nonConnecting = ["ا", "د", "ذ", "ر", "ز", "و", "أ", "ؤ", "إ"];
      const canConnectToLeft = (arabicString: string) => {
        const baseChar = arabicString.replace(/[\u064B-\u065F\u0670]/g, "");
        const lastChar = baseChar.slice(-1);
        return !nonConnecting.includes(lastChar);
      };

      let char = "";
      let finalName = "";
      let idTTS = "";
      let arTTS = "";
      const partsArray: string[] = [];

      for (let k = 0; k < transformedLetters.length; k++) {
        const tl = transformedLetters[k];
        partsArray.push(tl.char);

        if (k === 0) {
          char += tl.char;
          finalName += tl.name;
          idTTS += tl.idTTS;
          arTTS += tl.arTTS;
        } else {
          const prev = transformedLetters[k - 1];
          const connects = canConnectToLeft(prev.char);

          char += tl.char;
          finalName += " " + tl.name.toLowerCase();
          idTTS += " " + tl.idTTS;
          arTTS += " ، " + tl.arTTS;
        }
      }

      const formatName = finalName
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");

      let hintAdditions = "";
      if (char.includes("\u0670")) {
        hintAdditions += "\n(Fathah berdiri = panjang)";
      }
      if (
        partsArray.some(
          (p) => p.includes("اَ")
        )
      ) {
        hintAdditions +=
          "\n(Alif fathah = 'a' pendek)";
      }

      combos.push({
        id: level * 1000 + i,
        char,
        parts: partsArray,
        name: formatName,
        idTTS,
        arTTS,
        hint:
          (partsArray.length > 0
            ? `Bentuk sambung: ${partsArray.join(" + ")}`
            : "Latihan huruf tunggal") + hintAdditions,
      } as any);
    }

    if (level === 8) {
      return combos; // Level 8 only focuses on 2-letter combos, no single letters
    }
    return [...baseLetters, ...pairs, ...combos];
  } else {
    // We want to combine from the pool of current level + past levels in same volume + plain fathah
    const poolBase = hijaiyahLetters.slice(
      0,
      baseLetters[baseLetters.length - 1]?.id || Math.min(level * 4, 28),
    );

    const otherVolumeComboCount = 6;
    for (let i = 0; i < otherVolumeComboCount; i++) {
      const isThreeLetters = Math.random() > 0.3;
      const comboLength = isThreeLetters ? 3 : 2;

      const pickedLetters = [];
      pickedLetters.push(
        baseLetters[Math.floor(Math.random() * baseLetters.length)],
      ); // At least one focal

      for (let j = 1; j < comboLength; j++) {
        const rawLetter = poolBase[Math.floor(Math.random() * poolBase.length)];
        // Randomly apply volume specific rule to the raw letter
        // Easiest hack: call getBaseLettersForLevel using a random level from current volume!
        const randomVolLevel =
          (volume - 1) * STAGES_PER_VOLUME + Math.ceil(rawLetter.id / 4);
        const adaptedArray = getBaseLettersForLevel(randomVolLevel);
        const adapted =
          adaptedArray.find((a) => a.id === rawLetter.id) || rawLetter;

        // We don't want "min" or "al" mid-word usually, so fallback to raw if Volume 5/6 and not first
        if (volume >= 5 && j > 0) {
          pickedLetters.push(rawLetter);
        } else {
          pickedLetters.push(adapted);
        }
      }

      pickedLetters.sort(() => 0.5 - Math.random());

      const nonConnecting = ["ا", "د", "ذ", "ر", "ز", "و", "أ", "ؤ", "إ"];
      const canConnectToLeft = (arabicString: string) => {
        const baseChar = arabicString.replace(/[\u064B-\u065F\u0670]/g, "");
        const lastChar = baseChar.slice(-1);
        return !nonConnecting.includes(lastChar);
      };

      let char = "";
      let finalName = "";
      let idTTS = "";
      let arTTS = "";
      const partsArray: string[] = [];

      for (let k = 0; k < pickedLetters.length; k++) {
        const pl = pickedLetters[k];
        partsArray.push(pl.char);

        if (k === 0) {
          char += pl.char;
          finalName += pl.name;
          idTTS += pl.idTTS;
          arTTS += pl.arTTS;
        } else {
          const prev = pickedLetters[k - 1];
          const connects = canConnectToLeft(prev.char);

          char += pl.char;
          finalName += " " + pl.name.toLowerCase();
          idTTS += " " + pl.idTTS;
          arTTS += " ، " + pl.arTTS;
        }
      }

      const formatName = finalName
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");

      combos.push({
        id: level * 1000 + i,
        char,
        parts: partsArray,
        name: formatName,
        idTTS,
        arTTS,
        hint: `Bentuk sambung dari: ${partsArray.join(" + ")}`,
      } as any);
    }
  }

  return [...baseLetters, ...combos];
};

export const getAllLettersUpToLevel = (level: number) => {
  const letters: typeof hijaiyahLetters = [];
  const volume = Math.ceil(Math.min(level, TOTAL_LEVELS) / STAGES_PER_VOLUME);
  const minLevel = (volume - 1) * STAGES_PER_VOLUME + 1;
  const maxLevel = Math.min(level, TOTAL_LEVELS);
  for (let i = minLevel; i <= maxLevel; i++) {
    letters.push(...getLettersForLevel(i));
  }
  return letters;
};

export const getQuestionCount = (level: number) => {
  const isExam = level % STAGES_PER_VOLUME === 0;
  return isExam ? 20 : 10;
};

export const generateQuiz = (
  level: number = 1,
  count: number = 5,
): QuizQuestion[] => {
  const currentLevelLetters = getLettersForLevel(level);
  const allAvailableLetters = getAllLettersUpToLevel(level);
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const volume = Math.ceil(Math.min(level, TOTAL_LEVELS) / STAGES_PER_VOLUME);
    const minLevelInVolume = (volume - 1) * STAGES_PER_VOLUME + 1;

    let targetPool = currentLevelLetters;
    if (level > minLevelInVolume && Math.random() > 0.7) {
      targetPool = allAvailableLetters;
    }

    if (volume >= 2) {
      targetPool = targetPool.filter((l) => l.id >= 100);
    }

    if (targetPool.length === 0) targetPool = currentLevelLetters;

    const target = targetPool[Math.floor(Math.random() * targetPool.length)];
    const isTargetCombo = target.id >= 1000;

    // Determine the type: if combo, 50% chance to be sequence
    const isSequence = isTargetCombo && Math.random() > 0.5;
    const isAudio = !isSequence && Math.random() > 0.5;

    if (isSequence) {
      const parts = (target as any).parts || target.char.split(" ");
      // Add random single letters to the pool
      const singleLetterPool = allAvailableLetters.filter(
        (l) => l.id < 1000 && !parts.includes(l.char),
      );
      const decoys = singleLetterPool
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .map((l) => l.char);
      const options = [...parts, ...decoys].sort(() => 0.5 - Math.random());

      questions.push({
        id: `q_${i}_${target.id}_seq`,
        letterId: target.id,
        type: "sequence",
        question: `Dengarkan suara Ustadz. Susun huruf berikut secara berurutan: ${target.name.split(" ").join(" - ")}`,
        correctAnswer: parts.join(""), // store sequence exactly as joined or unjoined? Answer expects joined string for char
        parts: parts,
        options,
        hint: `Susun sesuai apa yang kamu dengar.`,
        audioText: target.arTTS,
        idTTS: target.idTTS,
      });
      // But wait! quiz logic usually checks equality against `correctAnswer`.
      // If correctAnswer is `target.char`... let the existing logic remain but just fix parts parsing.
      questions[questions.length - 1].correctAnswer = target.char;
      continue;
    }

    // Standard options generation for visual/audio
    let wrongOptionsPool = allAvailableLetters.filter(
      (l) => l.id !== target.id && l.id >= 1000 === isTargetCombo,
    );

    // If not enough pool, fall back to any available letters
    if (wrongOptionsPool.length < 3) {
      wrongOptionsPool = allAvailableLetters.filter((l) => l.id !== target.id);
    }

    let wrongOptions = [...wrongOptionsPool];

    // SMART DECOYS FOR COMBOS (Permutations)
    if (isTargetCombo && (volume === 1 || volume === 2)) {
      const parts = (target as any).parts || target.char.split(" ");
      const joinSeparator = volume === 1 ? " " : "";
      const generated = new Set<string>();
      generated.add(target.char);
      wrongOptions = [];
      let attempts = 0;
      while (wrongOptions.length < 4 && attempts < 20) {
        let perm = [...parts].sort(() => 0.5 - Math.random()).join(joinSeparator);
        if (!generated.has(perm)) {
          generated.add(perm);
          wrongOptions.push({
            ...target,
            id: target.id * 10 + attempts,
            char: perm,
          });
        }
        attempts++;
      }
      if (wrongOptions.length < 4) {
        const needed = 4 - wrongOptions.length;
        wrongOptions.push(...wrongOptionsPool.slice(0, needed));
      }
    }

    // SMART DECOYS FOR IQRA 2 (Panjang Pendek / Mad Test)
    if (volume === 2 && isTargetCombo && level > 8) {
      const parts = (target as any).parts;
      if (parts && parts.length === 2) {
        const makeShort = (p: string) => p.replace("ا", "");
        const makeLong = (p: string) => (p.includes("ا") ? p : p + "ا");

        const decoy1 = makeShort(parts[0]) + makeShort(parts[1]); // Semua pendek
        const decoy2 = makeShort(parts[0]) + makeLong(parts[1]); // Panjang di akhir
        const decoy3 = makeLong(parts[0]) + makeLong(parts[1]); // Panjang semua
        // If original was part of these, make sure to add alternate
        const decoy4 = makeLong(parts[0]) + makeShort(parts[1]); // Panjang di awal

        const allDecoys = [decoy1, decoy2, decoy3, decoy4].filter(
          (d) => d !== target.char,
        );
        const customDecoys = allDecoys
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        wrongOptions = customDecoys.map((char, idx) => ({
          ...target,
          id: target.id * 10 + idx,
          char,
        }));
      } else if (parts && parts.length === 3) {
        const makeShort = (p: string) => p.replace("ا", "");
        const makeLong = (p: string) => (p.includes("ا") ? p : p + "ا");

        const decoy1 =
          makeShort(parts[0]) + makeShort(parts[1]) + makeShort(parts[2]);
        const decoy2 =
          makeShort(parts[0]) + makeLong(parts[1]) + makeShort(parts[2]);
        const decoy3 =
          makeShort(parts[0]) + makeShort(parts[1]) + makeLong(parts[2]);
        const decoy4 =
          makeLong(parts[0]) + makeShort(parts[1]) + makeShort(parts[2]);

        const allDecoys = [decoy1, decoy2, decoy3, decoy4].filter(
          (d) => d !== target.char,
        );
        const customDecoys = allDecoys
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        wrongOptions = customDecoys.map((char, idx) => ({
          ...target,
          id: target.id * 10 + idx,
          char,
        }));
      }
    }

    // If we STILL don't have enough wrong options (e.g., Level 1), pad with other random letters
    if (wrongOptions.length < 5) {
      // Just create synthetic wrong options by shuffling target char if it's combo, or getting random hijaiyah if single
      if (isTargetCombo) {
        const parts = (target as any).parts || target.char.split(" ");
        for (let pad = 0; pad < 5 - wrongOptions.length; pad++) {
          wrongOptions.push({
            ...target,
            char: [...parts]
              .sort(() => 0.5 - Math.random())
              .join(volume >= 2 ? "" : " "),
          });
        }
      } else {
        const padding = hijaiyahLetters.filter(
          (l) =>
            l.id !== target.id && !wrongOptions.find((wo) => wo.id === l.id),
        );
        wrongOptions.push(
          ...padding
            .sort(() => 0.5 - Math.random())
            .slice(0, 5 - wrongOptions.length),
        );
      }
    }

    wrongOptions = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 5);

    const options = [target.char, ...wrongOptions.map((l) => l.char)].sort(
      () => 0.5 - Math.random(),
    );

    questions.push({
      id: `q_${i}_${target.id}`,
      letterId: target.id,
      type: isAudio ? "audio" : "visual",
      question: isAudio
        ? `Dengarkan suara Ustadz. Huruf apakah ini?`
        : isTargetCombo && volume >= 2 && Math.random() > 0.4
        ? `Bagaimana bentuk sambung dari ${(target as any).parts.join(" + ")} ?`
        : `Huruf apakah ini: "${target.name}"?`,
      correctAnswer: target.char,
      options,
      hint: target.hint,
      audioText: target.arTTS,
      idTTS: target.idTTS,
    });
  }

  return questions;
};
