const fs = require('fs');
let content = fs.readFileSync('src/data/hijaiyah.ts', 'utf8');

const replacements = [
  [/Kombinasi mad alif(.*)mad ya sukun(.*)/gi, 'Asik nih campur aduk panjang-panjangnya~ ada alif, garis tegak, sama titik dua bawah~'],
  [/Kata yang disambung dari wau sukun ke Ha dhamir terbalik, lalu Ya fathah\./gi, 'Ini gandengan asik dari Wau bentuk O sampai ke bunyi Yaa~'],
  [/Awas huruf Jim di depan\. Panjang mad secara konsisten harus dilantunkan tanpa ragu\./gi, 'Eitss huruf Jim minggir dulu! Tarik nafas dan panjang-pendekinnya dengan pede yaa~'],
  [/Qaf mad ya sukun, disambung huruf Lam berdekatan \(karena dipisah spasi\)\. Huruf Ha besar berharakat dhammah di dalem\./gi, 'Huruf Qa-nya ketemu ya mati, terus Lam nya deketan. Ha-nya kayak ulet gede di dalem nih~'],
  [/Menjebak! Rangkaian titik atas dan bawah yang rapat: Tu \(titik dua\), Bi \(satu bawah\), Ya \(dua bawah\)\./gi, 'Awas mata ketipu! Titiknya numpuk atas bawah: dua di atas, satu di bawah, dua di bawah hihi~'],
  [/Bentuk Lam gandengan Ha kecil \(ngumpet\)\. Perhatikan alif kosong lambang jamak di ujung\./gi, 'Lam-nya pelukan sama Ha kecil (ngumpet tuh). Eh ada tiang kosong (alif) di paling belakang lho~'],
  [/Potongan ayat\. Ain gandengan Shad yang memanjang dengan fathah berdiri \(pada Ya tanpa titik\)\. Disusul Alif fathah berdiri\./gi, 'Sepenggal huruf suci nih~ Ain nempel Shad ditarik panjang gara-gara Ya polos. Pas depannya pusing ada Alif lurus~'],
  [/Tanwin Fathah \(an\/fathatain\)\. Bila ada alif setelahnya, alif tersebut dianggap tidak ada \(dibacanya cepet aja yaa~\)\./gi, 'Garis dua di atas dibacanya "an" yaa. Kalau nabrak alif setelahnya gausah dianggep alifnya (cepet aja an-nya)~'],
  [/Tanwin Kasrah \(in\/kasratain\) berada di bawah huruf, dibaca bin\./gi, 'Garis dua bawah dibacanya "in" yaa~ Kalau nempel di Ba bunyinya jadi bin!'],
  [/Tanwin/gi, 'Garis kembar'],
  [/Fathatain/gi, 'Garis dua atas'],
  [/Kasratain/gi, 'Garis dua bawah'],
  [/Dhommatain/gi, 'Wau kembar (un)'],
  [/Fathah/gi, 'Garis miring atas'],
  [/Kasrah/gi, 'Garis senyum bawah'],
  [/Dhammah/gi, 'Koma kecil bundar atas'],
  [/mad alif/gi, 'alif buat manjangin'],
  [/Mati\/Sukun/gi, 'Mati (Bulet Kecil)'],
  [/Sukun/gi, 'Bulet Kecil Mati'],
  [/Alif Kosong/gi, 'Tiang Alif nganggur'],
  [/Bila .* dibaca /gi, 'Kalau nemu yang ini jadinya dibunyikan '],
  [/Dibaca /g, 'Bunyinya dipanggil '],
  [/Pengejaan huruf dengan .* dibaca /gi, 'Cara ngejanya gampang nih, jadinya beryanyi '],
  [/Huruf .* dibaca /gi, 'Hurufnya senyum manis dibunyikan '],
  [/Panjang /g, 'Ditarik panjang '],
  [/Pendek /g, 'Lompat cepet '],
  [/Menjebak! /gi, 'Eitss awas nyungsep! ']
];

for (const [regex, replacement] of replacements) {
  content = content.replace(regex, replacement);
}

fs.writeFileSync('src/data/hijaiyah.ts', content);
console.log('Final hints 3 updated successfully!');
