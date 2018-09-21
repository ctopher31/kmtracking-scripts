// Thumbnail Gallery
const setupGallery = () => {
  const controls = document.querySelectorAll('.thumbnail-control');
  const thumbToggles = document.querySelectorAll('.thumbnail-item');
  let [thumbs0, , thumbs2] = document.querySelectorAll('.display-thumbnail');
  const leftButton = document.querySelector('.thumbnail-container .left');
  const rightButton = document.querySelector('.thumbnail-container .right');
  if (thumbs0.previousElementSibling !== null) {
    leftButton.classList.remove('hide');
  } else {
    leftButton.classList.add('hide');
  }
  if (thumbs2 && thumbs2.nextElementSibling !== null) {
    rightButton.classList.remove('hide');
  } else {
    rightButton.classList.add('hide');
  }

  Array.prototype.map.call(controls, control => control.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (control.classList.contains('left') && thumbs0.previousElementSibling !== null) {
      thumbs0.previousElementSibling.classList.add('display-thumbnail');
      thumbs2.classList.remove('display-thumbnail');
      [thumbs0, , thumbs2] = document.querySelectorAll('.display-thumbnail');
      if (thumbs0.previousElementSibling === null) {
        leftButton.classList.add('hide');
      } else {
        leftButton.classList.remove('hide');
      }
      if (thumbs2.nextElementSibling === null) {
        rightButton.classList.add('hide');
      } else {
        rightButton.classList.remove('hide');
      }
    }
    if (control.classList.contains('right') && thumbs2.nextElementSibling !== null) {
      thumbs0.classList.remove('display-thumbnail');
      thumbs2.nextElementSibling.classList.add('display-thumbnail');
      [thumbs0, , thumbs2] = document.querySelectorAll('.display-thumbnail');
      if (thumbs0.previousElementSibling === null) {
        leftButton.classList.add('hide');
      } else {
        leftButton.classList.remove('hide');
      }
      if (thumbs2.nextElementSibling === null) {
        rightButton.classList.add('hide');
      } else {
        rightButton.classList.remove('hide');
      }
    }
  }));

  Array.prototype.map.call(thumbToggles, thumbToggle => thumbToggle.addEventListener('click', () => {
    const toggles = document.querySelectorAll('.thumbnail-item');
    Array.prototype.map.call(toggles, toggle => (toggle.classList.contains('active') ? toggle.classList.remove('active') : false));
    thumbToggle.classList.add('active');
  }));
};

export default {
  setupGallery,
};
