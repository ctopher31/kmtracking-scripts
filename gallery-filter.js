// Photo and Video Gallery Filter
//
// Product – these values will be the list of product lines – see “Product List by Site” document
//
// Color (color ranges) – same as Graberblinds swatch ordering? Aquas & Blues, Beiges & Browns, Blacks & Greys, Greens, Pinks & Reds, Purples, Whites & Off-Whites, Yellows
//
// Design Style – Traditional, American Cottage, Contemporary, Eclectic, Transitional, Mid-Century Modern, Outdoor
//
// Room Type – Living Room, Dining Room, Bedroom, Bathroom, Kitchen, Sitting Room, Study, Entry Way, Laundry Room, Play Room, Sunroom
//

import _ from 'underscore';
import GalleryModal from './gallery-modal';

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g,
};

const filterOptionTemplate =
  `<li class="filter-selection-item">
    <input type="checkbox" name="{{ id }}" id="{{ id }}" class="filter-checkbox {{ id }}" value="{{ text }}">
    <label for="{{ id }}">{{ text }}</label>
  <li>`;
const filterOptions = _.template(filterOptionTemplate);

const photosOnlyElem = document.getElementById('photos-only');
const videosOnlyElem = document.getElementById('videos-only');
const productElem = document.querySelector('.select-product');
const colorElem = document.querySelector('.select-color');
const designStyleElem = document.querySelector('.select-design-style');
const roomTypeElem = document.querySelector('.select-room-type');
const originalListItems = document.querySelectorAll('.image-gallery .Grid-cell');
const labels = document.querySelectorAll('.filter-label');
const filters = document.querySelectorAll('.filter-selection-list');
const filterRow = document.querySelector('.filter-row');
const clearFilters = document.getElementById('clear-filters');

const buildFilterList = () => {
  const dataList = [];
  Array.prototype.map.call(originalListItems, (item) => {
    const { props } = item.firstElementChild.dataset;
    const [props0, props1, props2, props3, props4] = props.split(',');
    const tempProps = {
      type: props0,
      productLineName: props1,
      color: props2,
      designStyle: props3,
      roomType: props4,
    };
    dataList.push(tempProps);
  });
  return dataList;
};

const buildOptionDeck = (dataList, property) => {
  const deck = [];
  dataList.forEach((entry) => {
    if (deck.indexOf(entry[property]) === -1 && entry[property] !== null && entry[property] !== '') {
      deck.push(entry[property]);
    }
  });
  return deck.sort();
};

const buildOptions = (selector, deck) => {
  deck.forEach((entry) => {
    const compiled = filterOptions({ id: entry.toLowerCase().trim().replace(' ', '-'), text: entry });
    const d = document.createElement('div');
    d.innerHTML = compiled;
    selector.appendChild(d.firstChild);
  });
};

// Checks which checkbox is checked: Photo, Video, or none
const getPrimaryCheckedType = () => {
  let checkedType;
  if (photosOnlyElem.checked) {
    checkedType = 'Image';
  } else if (videosOnlyElem.checked) {
    checkedType = 'Video';
  } else {
    checkedType = 'All';
  }
  return checkedType;
};

const getSecondaryCheckedOptions = (elem) => {
  const selections = [];
  Array.prototype.map.call(elem.children, (item) => {
    if (item.firstElementChild.checked) {
      selections.push(item.firstElementChild.value);
    }
  });
  if (selections.length <= 0) {
    selections.push('All');
  }
  return selections;
};

// Gets the selected filter options
const getSelectedOptions = () => ({
  type: getPrimaryCheckedType(),
  productLineName: getSecondaryCheckedOptions(productElem),
  color: getSecondaryCheckedOptions(colorElem),
  designStyle: getSecondaryCheckedOptions(designStyleElem),
  roomType: getSecondaryCheckedOptions(roomTypeElem),
});

const buildGalleryList = (selectedOptions) => {
  const galleryList = [];
  Array.prototype.map.call(originalListItems, (item) => {
    const { props } = item.firstElementChild.dataset;
    const [props0, props1, props2, props3, props4] = props.split(',');

    let type = false;
    let product = false;
    let color = false;
    let design = false;
    let room = false;
    if (selectedOptions.type === props0 || selectedOptions.type === 'All') {
      type = true;
    }
    if (selectedOptions.productLineName.indexOf(props1) > -1 || selectedOptions.productLineName[0] === 'All') {
      product = true;
    }
    if (selectedOptions.color.indexOf(props2) > -1 || selectedOptions.color[0] === 'All') {
      color = true;
    }
    if (selectedOptions.designStyle.indexOf(props3) > -1 || selectedOptions.designStyle[0] === 'All') {
      design = true;
    }
    if (selectedOptions.roomType.indexOf(props4) > -1 || selectedOptions.roomType[0] === 'All') {
      room = true;
    }
    if (type === true && product === true && color === true && design === true && room === true) {
      galleryList.push(item);
    }
  });
  return galleryList;
};

// Builds the gallery list items
const buildGallery = (listItems, options) => {
  const {
    galleryListSelector,
  } = options;

  const list = document.querySelectorAll(galleryListSelector);
  while (list[0].firstChild) {
    list[0].removeChild(list[0].firstChild);
  }
  if (listItems.length === 0) {
    const none = document.createElement('p');
    none.classList.add('no-results');
    none.textContent = 'No results matched your selection.';
    list[0].appendChild(none);
  } else {
    Array.prototype.map.call(listItems, (item) => {
      list[0].appendChild(item);
    });
  }
  GalleryModal.loadModal(options);
};

const filterHandler = (options) => {
  buildGallery(buildGalleryList(getSelectedOptions()), options);
};

// Adds the event listeners to the DOM
const addListeners = (options) => {
  photosOnlyElem.addEventListener('change', () => {
    if (photosOnlyElem.checked) {
      videosOnlyElem.checked = false;
    }
    filterHandler(options);
  });
  videosOnlyElem.addEventListener('change', () => {
    if (videosOnlyElem.checked) {
      photosOnlyElem.checked = false;
    }
    filterHandler(options);
  });
  productElem.parentElement.addEventListener('change', () => filterHandler(options));
  colorElem.parentElement.addEventListener('change', () => filterHandler(options));
  designStyleElem.parentElement.addEventListener('change', () => filterHandler(options));
  roomTypeElem.parentElement.addEventListener('change', () => filterHandler(options));

  document.addEventListener('click', () => {
    Array.prototype.map.call(filters, (filter) => {
      filter.classList.remove('open');
    });
    Array.prototype.map.call(labels, (label) => {
      label.classList.remove('open');
    });
  });

  Array.prototype.map.call(labels, (label) => {
    label.addEventListener('click', (event) => {
      event.stopPropagation();
      filterRow.classList.remove('hide');
      const dataFilter = label.getAttribute('data-filter');
      Array.prototype.map.call(filters, (filter) => {
        if (filter.classList.contains(dataFilter) && filter.classList.contains('open')) {
          filter.classList.toggle('open');
        } else if (filter.classList.contains(dataFilter) && !filter.classList.contains('open')) {
          filter.classList.add('open');
        } else {
          filter.classList.remove('open');
        }
      });
      if (label.classList.contains('open')) {
        label.classList.remove('open');
      } else {
        Array.prototype.map.call(labels, (label2) => {
          label2.classList.remove('open');
        });
        label.classList.add('open');
      }
    });
  });

  Array.prototype.map.call(filters, (filter) => {
    filter.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });

  clearFilters.addEventListener('click', () => {
    Array.prototype.map.call(document.querySelectorAll('.filter-checkbox'), (filter) => {
      if (filter.checked === true) {
        filter.checked = false;
      }
    });
    filterHandler(options);
  });
};

// Initialize filter and set event listeners
const init = (options) => {
  const data = buildFilterList();

  buildOptions(productElem, buildOptionDeck(data, 'productLineName'));
  buildOptions(colorElem, buildOptionDeck(data, 'color'));
  buildOptions(designStyleElem, buildOptionDeck(data, 'designStyle'));
  buildOptions(roomTypeElem, buildOptionDeck(data, 'roomType'));

  addListeners(options);
  GalleryModal.loadModal(options);
};

export default {
  init,
};
