// Gulpfile
const gulp = require('gulp');
const path = require('path');
const chalk = require('chalk');
const stylelint = require('stylelint');
const browserSync = require('browser-sync');
const { buildJs, buildSass, lintJs, testJs, buildTemplates } = require('./task-util');
const config = require('./project-config');
const webpackConfig = require('./webpack.config');

/* eslint-disable no-console */

browserSync.create();

const {
  bundleJs,
  bootstrapJs,
} = config.paths.js;

const {
  bundleSass,
  bootstrapSass,
} = config.paths.sass;

gulp.task('build', ['buildNunjucks', 'buildBundleJs', 'buildBundleSass']);

// Build JS ----------------------------------
gulp.task('buildBundleJs', async () => {
  const {
    dest,
    tests,
    watch,
  } = bundleJs;

  const linterResults = await lintJs(watch).catch(error => console.log(error));
  const testResults = await testJs(tests).catch(error => console.log(error));

  if (/* linterResults.success && */testResults.success) {
    const buildResults = await buildJs(bundleJs, webpackConfig).catch(error => console.log(error));
    console.log(`${buildResults.stats.toString({ colors: true })}\n`);
    console.log(`Output destination: ${path.resolve()}/${dest}`);
    console.log(`Bundle JS Built! ${new Date().toLocaleTimeString()}`);
    browserSync.reload('app.min.js');
    console.log('\n');
  } else {
    console.log(linterResults.formatted);
    console.log(linterResults ? '' : 'Linter Failed, BundleJs was not built');
    console.log(testResults.success ? '' : 'Tests Failed, BundleJs was not built');
  }
});

gulp.task('buildBootstrapJs', async () => {
  const {
    dest,
  } = bootstrapJs;

  try {
    const buildResults = await buildJs(bootstrapJs, webpackConfig).catch(error => console.log(error));
    console.log(`${buildResults.stats.toString({ colors: true })}\n`);
    console.log(`Output destination: ${path.resolve()}/${dest}`);
    console.log(`Bootstrap JS Built! ${new Date().toLocaleTimeString()}`);
    browserSync.reload('bootstrap.min.js');
    console.log('\n');
  } catch (err) {
    console.log(new Error(`There was an error building BootstrapJs: ${err}`));
  }
});

// Build Sass ----------------------------------
gulp.task('buildBundleSass', async () => {
  const {
    dest,
    filename,
    watch,
  } = bundleSass;

  const linterResults = await stylelint.lint({
    cache: true,
    configFile: '.stylelintrc.json',
    files: watch,
    formatter: 'verbose',
    syntax: 'scss',
  }).catch(error => console.log(error));
  console.log(linterResults.output);
  if (!linterResults.errored) {
    await buildSass(bundleSass).catch(error => console.log(error));
    console.log(`Output destination: ${path.resolve()}/${dest}`);
    console.log(`Bundle CSS Built! ${new Date().toLocaleTimeString()}`);
    console.log(chalk.green(path.join(__dirname, `${dest}/${filename}.min.css`)));
    console.log(chalk.green(path.join(__dirname, `${dest}/${filename}.min.css.map`)));
    browserSync.reload(`${filename}.min`);
    console.log('\n');
  } else {
    console.log(`There are CSS errors. Stylesheet did NOT build! Please fix your CSS errors. ${new Date().toLocaleTimeString()}`);
  }
});

gulp.task('buildBootstrapSass', async () => {
  const {
    dest,
    filename,
  } = bootstrapSass;

  try {
    await buildSass(bootstrapSass).catch(error => console.log(error));
    console.log(`Output destination: ${path.resolve()}/${dest}`);
    console.log(`Bootstrap CSS Built! ${new Date().toLocaleTimeString()}`);
    console.log(chalk.green(path.join(__dirname, `${dest}/${filename}.min.css`)));
    console.log(chalk.green(path.join(__dirname, `${dest}/${filename}.min.css.map`)));
    browserSync.reload(`${filename}.min`);
    console.log('\n');
  } catch (err) {
    console.log(new Error(`There was an error building BootstrapSass: ${err}`));
  }
});

// Build Templates ----------------------------------
gulp.task('buildNunjucks', async () => {
  const {
    source,
    templates,
    dest,
  } = config.paths.nunjucks;
  await buildTemplates(source, templates, dest).catch(err => console.log(err));
  // console.log(Array.isArray(buildResults.items), buildResults.items.map(item => (item.type === 'directory' ? Array.isArray(item.items) : null)));
  // console.log(`{
  //   type: ${buildResults.type},
  //   name: ${buildResults.name},
  //   items: ${buildResults.items.map(item => (`{
  //     type: ${item.type},
  //     name: ${item.name},
  //     ${(item.items)
  //     ? `item: ${item.items.map(item2 => (`{
  //         type: ${item2.type},
  //         name: ${item2.name},
  //         contents: ${item2.contents},
  //       }`))}`
  //     : `contents: ${item.contents}`},
  //     }`))},
  // }`);
  console.log('HTML (Nunjucks) Templates Built!');
  browserSync.reload('*.html');
});

gulp.task('watch', ['serve', 'watchNunjucks', 'watchBundleJs', 'watchBundleSass', 'watchTestJs']);

gulp.task('watchBundleJs', () => gulp.watch(bundleJs.watch, ['buildBundleJs']).on('change', () => console.log('Bundle JS Changed!')));

gulp.task('watchBootstrapJs', () => gulp.watch(bundleJs.watch, ['buildBootstrapJs']).on('change', () => console.log('Bootstrap JS Changed!')));

gulp.task('watchTestJs', () => gulp.watch(config.paths.js.tests).on('change', () => console.log('Test JS Run!')));

gulp.task('watchBundleSass', () => gulp.watch(bundleSass.watch, ['buildBundleSass']).on('change', () => console.log('Styles CSS Changed!')));

gulp.task('watchBootstrapSass', () => gulp.watch(bundleSass.watch, ['buildBootstrapSass']).on('change', () => console.log('Bootstrap CSS Changed!')));

gulp.task('watchNunjucks', () => gulp.watch(config.paths.nunjucks.watch, ['buildNunjucks']).on('change', () => console.log('HTML (Nunjucks) Templates Changed!')));

gulp.task('serve', () => browserSync.init({
  logLevel: 'debug',
  port: 3002,
  server: {
    baseDir: './www/',
  },
  ui: {
    port: 4002,
    weinre: {
      port: 9002,
    },
  },
}));

gulp.task('default', ['build', 'serve', 'watch'], () => console.log('Gulp started'));

module.exports = gulp;
