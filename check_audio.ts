import https from 'https';

https.get('https://upload.wikimedia.org/wikipedia/commons/transcoded/4/41/Taqsim_Oud_Maqam_Rast.ogg/Taqsim_Oud_Maqam_Rast.ogg.mp3', (res) => {
  console.log('MP3 Status:', res.statusCode);
});

https.get('https://upload.wikimedia.org/wikipedia/commons/transcoded/4/48/Taqasim_Bayati_on_Oud.ogg/Taqasim_Bayati_on_Oud.ogg.mp3', (res) => {
  console.log('MP3 Status 2:', res.statusCode);
});
