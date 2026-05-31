const fs = require('fs');
let content = fs.readFileSync('src/data/hijaiyah.ts', 'utf8');

content = content.replace(/Asik nih campur aduk panjang-panjangnya~ ada alif, garis tegak, sama titik dua bawah~\n/g, 'Asik nih campur aduk panjang-panjangnya~ ada alif, garis tegak, sama titik dua bawah~" },\n');

fs.writeFileSync('src/data/hijaiyah.ts', content);
console.log('Fixed unterminated string');
