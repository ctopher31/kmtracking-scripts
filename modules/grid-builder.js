// Grid Builder
// Bootstrap Grid/Baseline Overlay
import _ from 'underscore';

/* eslint-disable function-paren-newline */
const gridTemplate = _.template(
  `<div class="show-grid-baseline">
      <div class="container">
          <div class="grid-border grid-border-left"></div>
          <div class="row">
              <div class="span1 col-xs-1"></div>
              <div class="span1 col-xs-1"></div>
              <div class="span1 col-xs-1"></div>
              <div class="span1 col-xs-1"></div>
              <div class="span1 col-xs-1"></div>
              <div class="span1 col-xs-1"></div>
              <div class="span1 col-xs-1"></div>
              <div class="span1 col-xs-1"></div>
              <div class="span1 col-xs-1"></div>
              <div class="span1 col-xs-1"></div>
              <div class="span1 col-xs-1"></div>
              <div class="span1 col-xs-1"></div>
          </div>
          <div class="grid-border grid-border-right"></div>
      </div>
  </div>`,
);
/* eslint-enable function-paren-newline */

const buildGrid = () => {
  const compiled = gridTemplate();
  const d = document.createElement('div');
  d.innerHTML = compiled;
  document.body.appendChild(d.firstChild);

  // set the height of the grid container to the page
  document.querySelector('.show-grid-baseline').style.height = `${document.querySelector('.app').scrollHeight}px`;
};

const removeGrid = () => {
  const grid = document.querySelector('.show-grid-baseline');
  document.body.removeChild(grid);
};

const init = () => {
  window.buildGrid = buildGrid;
  window.removeGrid = removeGrid;
};

export default {
  buildGrid,
  removeGrid,
  init,
};
