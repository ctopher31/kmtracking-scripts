// Photo and Video Modals
import _ from 'underscore';

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g,
};

let modalImageTemplate;

let modalVideoTemplate;

const removeModal = () => {
  const modal = document.querySelector('.modal');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const closeButton = document.querySelector('.btn-close');
  if (modal.parentElement) {
    modal.parentElement.removeChild(modal);
    modalBackdrop.parentElement.removeChild(modalBackdrop);
    document.removeEventListener('click', removeModal);
    closeButton.removeEventListener('click', removeModal);
  }
};

const modalHandler = () => {
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal-content');
  const closeButton = document.querySelector('.btn-close');
  if (modal && modalContent) {
    document.addEventListener('click', removeModal);
    modalContent.addEventListener('click', event => event.stopPropagation());
    closeButton.addEventListener('click', removeModal);
  }
};

const addModal = (self) => {
  if (self.parentElement.classList.contains('image-wrapper')) {
    const { props, imageUrl } = self.parentElement.dataset;
    const [prop0, prop1] = props.split(',');
    if (prop0 === 'Image') {
      const templateProps = {
        newId: self.parentElement.id.split('-')[2],
        productLineName: prop1,
        productDescription: self.parentElement.getAttribute('data-product-description'),
        productLineId: self.parentElement.getAttribute('data-product-line-id'),
        productLineURL: self.parentElement.getAttribute('data-product-url'),
        imageStory: self.parentElement.getAttribute('data-image-story'),
        imageSrc: imageUrl,
        imageAlt: self.parentElement.firstElementChild.firstElementChild.getAttribute('alt'),
      };
      const compiled = modalImageTemplate(templateProps);
      const d = document.createElement('div');
      d.innerHTML = compiled;
      self.parentElement.appendChild(d.firstChild);
      self.parentElement.firstElementChild.setAttribute('data-target', `#modal-${templateProps.newId}`);
      setTimeout(() => (modalHandler()), 300);
    }
  }
  if (self.parentElement.classList.contains('video-wrapper')) {
    const { props } = self.parentElement.dataset;
    const [prop0, prop1] = props.split(',');
    if (prop0 === 'Video') {
      const templateProps = {
        newId: self.parentElement.id.split('-')[2],
        productLineName: prop1,
        videoTitle: self.parentElement.getAttribute('data-video-title'),
        videoDescription: self.parentElement.getAttribute('data-video-description'),
        videoIframe: self.parentElement.getAttribute('data-video-iframe'),
      };
      const compiled = modalVideoTemplate(templateProps);
      const d = document.createElement('div');
      d.innerHTML = compiled;
      self.parentElement.appendChild(d.firstChild);
      self.parentElement.firstElementChild.setAttribute('data-target', `#modal-${templateProps.newId}`);
      setTimeout(() => (modalHandler()), 300);
    }
  }
};

const loadModal = (options) => {
  const {
    imageTemplate,
    videoTemplate,
    galleryModalSelector,
  } = options;

  modalImageTemplate = (imageTemplate ? _.template(imageTemplate) : null);
  modalVideoTemplate = (videoTemplate ? _.template(videoTemplate) : null);

  Array.prototype.map.call(document.querySelectorAll(galleryModalSelector), (item, index) => {
    item.parentElement.setAttribute('id', `modal-item-${index}`);
    item.addEventListener('click', (event) => {
      while (event.currentTarget.nextElementSibling) {
        event.currentTarget.parentElement.removeChild(event.currentTarget.nextElementSibling);
      }
      addModal(event.currentTarget);
    });
  });
};

// Initialize modal and set event listeners
const init = (options) => {
  loadModal(options);
  window.loadModal = loadModal;
};

export default {
  loadModal,
  init,
};
