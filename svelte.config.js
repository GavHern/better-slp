const preprocess = require('svelte-preprocess');

module.exports = {
  preprocess: [
    preprocess()
  ],
  assetsDir: 'svelte',
  filenameHashing: true
}
