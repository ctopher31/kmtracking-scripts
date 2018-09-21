// Scroll navigator

// Scolling navbar: when scrolling from top of page small navbar appears
const scrollingNav = (selector, toggle) => {
  let y;
  document.addEventListener('scroll', () => {
    y = window.pageYOffset;
    const scrollNav = document.querySelector(selector);
    if (y > 80) {
      scrollNav.classList.add(toggle);
    } else {
      scrollNav.classList.remove(toggle);
    }
  });
};

export default {
  scrollingNav,
};
