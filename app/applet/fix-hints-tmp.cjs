const fs = require('fs');

let content = fs.readFileSync('src/components/LearningPhase.tsx', 'utf8');

// Update getNameFontSize
content = content.replace(/const getNameFontSize = \(length: number\) => {[\s\S]*?};/, `const getNameFontSize = (length: number) => {
  if (length > 20) return 'text-sm sm:text-base md:text-lg';
  if (length > 15) return 'text-base sm:text-lg md:text-xl';
  return 'text-lg sm:text-xl md:text-2xl';
};`);

// Add state for showing hint
if (!content.includes('const [showHint, setShowHint] = useState(false);')) {
  content = content.replace(
    'const [currentIndex, setCurrentIndex] = useState(0);',
    'const [currentIndex, setCurrentIndex] = useState(0);\n  const [showHint, setShowHint] = useState(false);'
  );
}

// Reset hint on letter change
// We know handleNext sets index with Math.min and handlePrev does Math.max
content = content.replace(/setCurrentIndex\((\w+) => Math.min\(\1 \+ 1, letters\.length - 1\)\);/g, 'setCurrentIndex($1 => Math.min($1 + 1, letters.length - 1));\n    setShowHint(false);');
content = content.replace(/setCurrentIndex\((\w+) => Math.max\(0, \1 - 1\)\);/g, 'setCurrentIndex($1 => Math.max(0, $1 - 1));\n    setShowHint(false);');

// Replace hint block
content = content.replace(
  /\{currentLetter\.hint && \([\s\S]*?<\/p>\s*\)\}/,
`{currentLetter.hint && (
                <div 
                  className="mt-2 text-center"
                  onClick={(e) => { e.stopPropagation(); setShowHint(!showHint); }}
                >
                  <AnimatePresence mode="wait">
                    {!showHint ? (
                      <motion.button 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-xs sm:text-sm font-bold text-slate-400 bg-slate-50 border-2 border-slate-200 px-4 py-1.5 rounded-full hover:bg-slate-100 hover:text-slate-500 transition-colors inline-block md:mb-0 mb-4"
                      >
                        💡 Lihat Petunjuk
                      </motion.button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-emerald-700/80 font-bold text-xs sm:text-sm md:text-base px-4 sm:px-5 text-center leading-relaxed bg-emerald-50 py-2 sm:py-3 rounded-xl border border-emerald-100 max-w-[90%] mx-auto whitespace-pre-line inline-block"
                      >
                        💡 {currentLetter.hint}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}`
);

fs.writeFileSync('src/components/LearningPhase.tsx', content);
