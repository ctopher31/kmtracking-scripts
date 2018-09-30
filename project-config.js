// Project Config for Task Runner
module.exports = {
  paths: {
    sass: {
      bundleSass: {
        source: './src/css/styles.scss',
        watch: ['./src/css/styles.scss', './src/css/sass/**/*.scss'],
        dest: './www/css',
        filename: 'styles',
      },
      bootstrapSass: {
        source: './src/css/bootstrap.scss',
        watch: ['./src/css/bootstrap.scss', './src/css/bootstrap/**/*.scss'],
        dest: './www/css',
        filename: 'bootstrap',
      },
    },
    js: {
      bundleJs: {
        source: './src/js/app.js',
        watch: ['./src/js/app.js', './src/js/modules/**/*.js'],
        dest: './www/js',
        filename: 'app',
        tests: ['./tests/test.spec.js'],
      },
      bootstrapJs: {
        source: './src/js/bootstrap.js',
        watch: ['./src/js/bootstrap.js', './src/js/bootstrap/**/*.js'],
        dest: './www/js',
        filename: 'bootstrap',
        tests: '',
      },
      tests: ['./tests/test.spec.js'],
    },
    nunjucks: {
      source: '/src/pages',
      templates: './src/templates',
      watch: ['./src/pages/**/*.+(html|njk)', './src/templates/**/*.+(html|njk)'],
      dest: './www',
    },
  },
};
