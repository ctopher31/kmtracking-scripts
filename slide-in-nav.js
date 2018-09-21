// Slide In Nav
const removeClass = (selector, toggle) => {
  selector.classList.remove(toggle);
};

const toggleClass = (selector, toggle) => {
  selector.classList.toggle(toggle);
};

const addListeners = (eventType, options) => {
  let {
    selector,
    toggle,
    activator,
    notActive,
  } = options;

  selector = document.querySelector(selector);
  toggle = toggle.replace(/\W/, '');
  activator = document.querySelector(activator);
  notActive = document.querySelector(notActive);
  document.addEventListener(eventType, (event) => {
    event.stopPropagation();
    removeClass(selector, toggle);
  });
  notActive.addEventListener(eventType, (event) => {
    event.stopPropagation();
  });
  activator.addEventListener(eventType, (event) => {
    event.stopPropagation();
    toggleClass(selector, toggle);
  });
};

const init = (options) => {
  addListeners((navigator.userAgent.match(/(iPad|iPhone)/i) ? 'touchend' : 'click'), options);
};

export default {
  init,
};
