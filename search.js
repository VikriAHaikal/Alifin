const https = require('https');

const searchUrl = 'https://api.github.com/search/code?q=nasheed+extension:mp3';

https.get(searchUrl, { headers: { 'User-Agent': 'node.js' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      if (result.items && result.items.length > 0) {
        result.items.slice(0,5).forEach(item => {
           console.log(item.html_url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/'));
        });
      } else {
        console.log('No results found.', result);
      }
    } catch(e) { console.error('Parse error'); }
  });
});
