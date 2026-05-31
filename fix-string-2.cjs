const fs = require('fs');
let content = fs.readFileSync('src/data/hijaiyah.ts', 'utf8');

content = content.replace(/Berhenti pakai Sin berdesis angin~\n/g, 'Berhenti pakai Sin berdesis angin~" },\n');

fs.writeFileSync('src/data/hijaiyah.ts', content);
console.log('Fixed unterminated string 2');
