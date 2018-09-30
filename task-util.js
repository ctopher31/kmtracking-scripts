// Task Functions for Task Runner
const path = require('path');
const fs = require('fs');
const { CLIEngine } = require('eslint');
const Mocha = require('mocha');
const webpack = require('webpack');
const sass = require('node-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const nunjucks = require('nunjucks');

const buildJs = ({ source, dest, filename }, webpackConfig) => new Promise((resolve, reject) => {
  webpack(Object.assign({}, webpackConfig, {
    entry: {
      source,
    },
    output: {
      path: path.resolve(dest),
      filename: `${filename}${webpackConfig.output.filename}`,
    },
  }), (err, stats) => {
    if (err) {
      reject(new Error(`Error building Javascript: ${err}`));
    }
    resolve({
      stats,
    });
  });
});

const lintJs = src => new Promise((resolve, reject) => {
  try {
    const eslint = new CLIEngine({
      cache: true,
      useEslintrc: true,
    });
    const report = eslint.executeOnFiles(src);
    const formatter = eslint.getFormatter();
    resolve({
      report,
      success: report.errorCount === 0 || false,
      formatted: formatter(report.results),
    });
  } catch (reason) {
    reject(new Error(`Linting error: ${reason}`));
  }
});

const testJs = src => new Promise((resolve, reject) => {
  try {
    const mocha = new Mocha();
    [...src].map((file) => {
      delete require.cache[path.resolve(file)];
      return mocha.addFile(path.resolve(file));
    });
    mocha.run(failures => resolve({ success: failures === 0 || false }));
  } catch (reason) {
    reject(new Error(`Tests failed: ${reason}`));
  }
});

const buildSass = ({ file, includePaths, outputStyle, sourceMap, outFile }) => new Promise((resolve, reject) => {
  sass.render({
    file,
    includePaths,
    outFile,
    outputStyle,
    sourceMap,
  }, async (err, result) => {
    if (err) {
      reject(new Error(`Error building bundleSass: ${err}`));
    }
    const postCssResult = await postcss([autoprefixer]).process(result.css.toString(), {
      from: file,
      to: outFile,
      map: {
        inline: false,
        prev: result.map.toString(),
      },
    }).catch(postCssErr => reject(new Error(`Error with postcss: ${postCssErr}`)));
    fs.writeFileSync(outFile, postCssResult.css.toString());
    fs.writeFileSync(`${outFile}.map`, postCssResult.map.toString());
    resolve(postCssResult);
  });
});

const getTemplateContent = (src) => {
  const dirContents = fs.readdirSync(path.join(__dirname, src), 'utf8');

  return dirContents.map((file) => {
    if (fs.statSync(path.join(__dirname, `${src}/${file}`)).isDirectory()) {
      return {
        type: 'directory',
        name: file,
        items: getTemplateContent(`${src}/${file}`),
      };
    }
    return {
      type: 'file',
      name: file,
      contents: fs.readFileSync(path.join(__dirname, `${src}/${file}`), 'utf8'),
    };
  });
};

const writeHtml = (items, renderer, dest) => {
  items.map((item) => {
    if (item.type === 'directory') {
      try {
        fs.statSync(path.join(__dirname, `${dest}/${item.name}`));
      } catch (err) {
        fs.mkdirSync(path.join(__dirname, `${dest}/${item.name}`));
      }
      writeHtml(item.items, renderer, `${dest}/${item.name}`);
      return item;
    }
    fs.writeFileSync(`${path.join(__dirname, dest)}/${item.name.split('.')[0]}.html`, renderer.renderString(item.contents), 'utf8');
    return item;
  });
};

// Template engine implementation (Nunjucks)
const templateEngine = (src, templates) => ({
  // create instance of engine
  engine: new nunjucks.Environment([new nunjucks.FileSystemLoader([path.join(__dirname, src), path.join(__dirname, templates)])]),

  // render the engine output as a string
  renderString(contents) {
    return this.engine.renderString(contents);
  },
});

const buildTemplates = (src, templates, dest) => new Promise((resolve, reject) => {
  try {
    resolve(writeHtml(getTemplateContent(src), templateEngine(src, templates), dest));
  } catch (reason) {
    reject(new Error(reason));
  }
});

module.exports = {
  buildJs,
  lintJs,
  testJs,
  buildSass,
  buildTemplates,
};
