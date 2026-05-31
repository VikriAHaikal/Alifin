const fs = require('fs');

let content = fs.readFileSync('src/components/LearningPhase.tsx', 'utf8');

// Update playAudio signature
content = content.replace(
  'const playAudio = (letter: typeof letters[0]) => {',
  'const playAudio = (letter: typeof letters[0], index: number) => {'
);

// Update URLs creation
content = content.replace(
  /if \(currentVolume >= 2\) \{[\s\S]*?urls = \[\`\/audio\/iqra-\$\{currentVolume\}\/tahap-\$\{currentStageInVolume\}\/\$\{fileName\}\.mp3\`\];\n    \} else \{/,
  `if (currentVolume >= 2) {
      // Menggunakan penamaan file berurutan berdasarkan index (1.mp3, 2.mp3, dst.)
      const fileName = index + 1; 
      urls = [\`/audio/iqra-\${currentVolume}/tahap-\${currentStageInVolume}/\${fileName}.mp3\`];
    } else {`
);

// Update onClick caller
content = content.replace(
  'onClick={() => playAudio(currentLetter)}',
  'onClick={() => playAudio(currentLetter, currentIndex)}'
);

fs.writeFileSync('src/components/LearningPhase.tsx', content);
