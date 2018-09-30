// Project Config for Task Runner
module.exports = {
  paths: {
    sass: {
      bundleSass: {
        file: './src/scss/styles.scss',
        includePaths: ['./base', './layout', './modules', './state', './theme'],
        outputStyle: 'compressed',
        sourceMap: true,
        outFile: 'www/assets/css/styles.min.css',
        watch: ['./src/scss/styles.scss', './src/scss/**/*.scss'],
        dest: 'www/assets/css',
        filename: 'styles',
      },
    },
    js: {
      bundleJs: {
        source: './src/js/app.js',
        watch: ['./src/js/app.js', './src/js/modules/**/*.js'],
        dest: 'www/assets/js',
        filename: 'app',
        tests: ['./tests/test.spec.js'],
      },
      tests: ['./tests/test.spec.js'],
    },
    nunjucks: {
      source: './src/pages',
      templates: './src/templates',
      watch: ['./src/pages/**/*.+(html|njk)', './src/templates/**/*.+(html|njk)'],
      dest: 'www',
    },
  },
};
