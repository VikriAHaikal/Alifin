const fs = require('fs');
let content = fs.readFileSync('src/data/hijaiyah.ts', 'utf8');

// replace Ain or ain that is NOT preceded by a quote with 'Ain or 'ain
content = content.replace(/(?<!['`])\bAin\b/g, "'Ain");
content = content.replace(/(?<!['`])\bain\b/g, "'ain");

// also replace `ain or `Ain with 'ain or 'Ain
content = content.replace(/`Ain\b/g, "'Ain");
content = content.replace(/`ain\b/g, "'ain");

fs.writeFileSync('src/data/hijaiyah.ts', content);
console.log("Ain normalized.");
