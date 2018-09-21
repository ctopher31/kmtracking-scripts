/* eslint-disable prefer-arrow-callback, func-names, no-var, strict, vars-on-top, prefer-template */
// Visualization tracking
(function () {
  'use strict';

  function selectionHandler(event) {
    var data = {
      swatches: [],
    };
    if (event.currentTarget.parentElement.firstElementChild.querySelector('.filter-selection-list').value === '200' || event.currentTarget.classList.contains('swatch-selection-button')) {
      setTimeout(function () {
        Array.prototype.map.call(document.querySelectorAll('.visualization-tabs-container .filter-list-item'), function (item) {
          data[item.firstElementChild.textContent.toLowerCase().replace(' ', '').trim()] = (item.lastElementChild.firstChild.nodeType === 3 ? item.lastElementChild.textContent.trim() : item.lastElementChild.firstElementChild.selectedOptions[0].textContent);
        });
        Array.prototype.map.call(document.querySelectorAll('.swatch-selection-button.selected'), function (item) {
          data.swatches.push(item.querySelector('.swatch-primary-text').textContent.trim());
        });

        dataLayer.push({
          event: 'km_record',
          km_event: 'Visualization - Product Selection',
          km_property: data,
        });
      }, 500);
    }
  }

  function shareLinkHandler(event) {
    var data = {
      swatches: [],
      shareTo: event.currentTarget.title,
    };
    Array.prototype.map.call(document.querySelectorAll('.visualization-tabs-container .filter-list-item'), function (item) {
      data[item.firstElementChild.textContent.toLowerCase().replace(' ', '').trim()] = (item.lastElementChild.firstChild.nodeType === 3 ? item.lastElementChild.textContent.trim() : item.lastElementChild.firstElementChild.selectedOptions[0].textContent);
    });
    Array.prototype.map.call(document.querySelectorAll('.swatch-selection-button.selected'), function (item) {
      data.swatches.push(item.querySelector('.swatch-primary-text').textContent.trim());
    });

    dataLayer.push({
      event: 'km_record',
      km_event: 'Visualization - Product Selection Shared',
      km_property: data,
    });
  }

  // Viewed page
  dataLayer.push({
    event: 'km_record',
    km_event: 'Viewed Visualization',
  });

  // Selection made
  $(document).on('change', '.visualization-tabs-container .filter-list-item', selectionHandler);
  $(document).on('click', '.visualization-tabs-container .swatch-selection-button', selectionHandler);

  // Share selections
  $(document).on('click', '.visualization-action-bar .share-link', shareLinkHandler);
}());
