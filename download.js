const fs = require('fs');
fetch('https://unpkg.com/@elevenlabs/convai-widget-embed')
    .then(res => res.text())
    .then(text => fs.writeFileSync('convai.js', text))
    .catch(console.error);
