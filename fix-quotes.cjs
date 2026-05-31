const fs = require('fs');
let content = fs.readFileSync('src/data/hijaiyah.ts', 'utf8');

content = content.replace(/"Garis dua di atas dibacanya "an" yaa/g, '"Garis dua di atas dibacanya \'an\' yaa');
content = content.replace(/"Garis dua bawah dibacanya "in" yaa/g, '"Garis dua bawah dibacanya \'in\' yaa');

fs.writeFileSync('src/data/hijaiyah.ts', content);
console.log('Fixed internal quotes');
