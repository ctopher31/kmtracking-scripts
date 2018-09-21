// polyfillJs
import detect from 'feature-detect-es6';

detect.fetch = () => {
  try {
    eval('fetch'); /* eslint-disable-line no-eval */
    return true;
  } catch (err) {
    return false;
  }
};

const polyfillScript = document.getElementById('polyfill-script');

if (!detect.all('class', 'spread', 'destructuring', 'let', 'const', 'arrowFunction', 'generators', 'defaultParamValues', 'templateStrings', 'collections', 'newArrayFeatures', 'promises', 'fetch')) {
  const babelPolyfillScript = document.createElement('script');
  babelPolyfillScript.src = '/Assets/Scripts/babel-polyfill.min.js';
  document.body.insertBefore(babelPolyfillScript, polyfillScript);
  const fetchScript = document.createElement('script');
  fetchScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.min.js';
  document.body.insertBefore(fetchScript, polyfillScript);
}
