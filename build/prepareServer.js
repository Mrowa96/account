const fs = require('fs');

console.info('Preparing server');

fs.promises
  .mkdir('./dist/server', { recursive: true })
  .then(function onDirCreated() {
    return fs.promises.writeFile('./dist/server/index.js', '');
  })
  .then(function onFileCreated() {
    console.info('All prepared!');
  })
  .catch(console.error);
