const fs = require('fs');
let content = fs.readFileSync('src/data/hijaiyah.ts', 'utf8');

content = content.replace(/isStandingGaris miring atas/g, 'isStandingFathah');

fs.writeFileSync('src/data/hijaiyah.ts', content);
console.log('Fixed var names');
