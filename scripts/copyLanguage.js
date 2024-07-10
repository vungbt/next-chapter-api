const fs = require('fs-extra');
const path = require('path');

const source = path.join(__dirname, '..', 'src', 'language');
const destination = path.join(__dirname, '..', 'dist', 'language');

fs.copy(source, destination)
  .then(() => console.log('Language folder copied successfully!'))
  .catch(err => console.error('Error copying language folder:', err));
