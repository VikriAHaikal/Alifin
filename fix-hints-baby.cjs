const fs = require('fs');
let content = fs.readFileSync('src/data/hijaiyah.ts', 'utf8');

const replacements = [
  // Tone down tildes and slang
  [/yaa~/g, 'ya'],
  [/nih~/g, 'ya'],
  [/~"/g, '"'],
  [/~\]/g, ']'],
  [/~\./g, '.'],
  [/~,/g, ','],
  [/lho~/g, 'ya'],
  [/gitu~/g, 'ya'],
  [/aja yaa/g, 'saja ya'],
  [/aja/g, 'saja'],
  [/cepet/g, 'cepat'],
  [/panjaang/g, 'panjang'],
  [/puanjaaang/g, 'panjang sekali'],
  [/nggak/g, 'tidak'],
  [/kayak/g, 'seperti'],
  [/Wah perutnya gendut/g, 'Bentuknya melengkung ke bawah'],
  [/dalem/g, 'dalam'],
  [/asik/g, 'bagus'],
  [/Asoy/g, 'Wah,'],
  [/badannya belok-belok/g, 'bentuk melengkung'],

  // Specific phrases
  [/Garis lurus seperti tiang ya/g, 'Garis lurus seperti tiang ya'],
  [/Bentuknya seperti perahu/g, 'Bentuknya seperti perahu'],
  [/perahu senyum ya/g, 'perahu tersenyum'],
  [/gandengan/g, 'bersambung'],
  [/nyeruduk/g, 'menyambung ke'],
  [/nabrak/g, 'menyambung ke'],
  [/dilabrak/g, 'disambung ke'],
  [/ketemu sama/g, 'bertemu'],
  [/mampir ke/g, 'bertemu'],
  [/disulap/g, 'berubah'],
  [/pelukan sama/g, 'bersambung dengan'],
  [/ngumpet/g, 'bersembunyi'],
  [/ulet gede/g, 'lingkaran besar'],
  [/Awas mata ketipu!/g, 'Hati-hati ya!'],
  [/hihi/g, ''],
  [/Eitss/g, 'Hati-hati,'],
  [/minggir dulu!/g, ''],
  [/Tarik nafas dan panjang-pendekinnya dengan pede/g, 'Perhatikan panjang-pendeknya'],

  // Formatting terms
  [/Garis miring atas/g, 'Garis atas (Fathah)'],
  [/Garis senyum bawah/g, 'Garis bawah (Kasrah)'],
  [/Koma kecil bundar atas/g, 'Harakat melengkung (Dhammah)'],
  [/Bulet Kecil Mati/g, 'Tanda mati (Sukun)'],
  [/Wau kembar \(un\)/g, 'Garis dua depan (Dhommatain)'],
  [/kembar atas/g, 'garis dua atas'],
  [/Garis kembar/g, 'Garis dua'],
  
  // Specific words fixes
  [/dibacanya cepat/g, 'dibaca pendek/cepat'],
  [/dibacanya panjang/g, 'dibaca panjang'],
  [/dibunyikan/g, 'dibaca'],
  [/Cara ngejanya gampang ya, jadinya beryanyi/g, 'Cara bacanya mudah, jadi berbunyi'],

  [/di atas ya/g, 'di atas'],
  [/di bawah ya/g, 'di bawah']
];

for (const [regex, replacement] of replacements) {
  content = content.replace(regex, replacement);
}

// Clean up leftovers
content = content.replace(/~ /g, ' ');
content = content.replace(/~/g, '');

fs.writeFileSync('src/data/hijaiyah.ts', content);
console.log('Fixed baby hints to be relevant and balanced!');
