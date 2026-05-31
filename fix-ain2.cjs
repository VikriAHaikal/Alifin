const fs = require('fs');
let c = fs.readFileSync('src/data/hijaiyah.ts', 'utf8');
c = c.replace(/'ain/g, "'Ain");
fs.writeFileSync('src/data/hijaiyah.ts', c);
