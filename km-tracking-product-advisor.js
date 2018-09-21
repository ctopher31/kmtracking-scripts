/* eslint-disable prefer-arrow-callback, func-names, no-var, strict, vars-on-top, prefer-template */
// Product Advisor tracking
(function () {
  'use strict';

  // Viewed page
  dataLayer.push({
    event: 'km_record',
    km_event: 'Viewed Product Advisor',
  });

  var categorySelections = {
    Shape: '',
    'Light/Privacy': '',
    Material: '',
    Solutions: [],
  };

  var preSelectedShape = document.querySelector('.c-advisorStep__slide.selected');
  if (preSelectedShape) {
    categorySelections.Shape = preSelectedShape.querySelector('.heading--xs').textContent;
    dataLayer.push({
      event: 'km_record',
      km_event: 'Product Advisor - Shape Selected on Home Page',
      km_property: categorySelections,
    });
  }

  // Track each category with the options selected
  var selectedCategory = document.querySelector('.c-filterTabs__tab.is-active > .u-center').textContent;
  Array.prototype.map.call(document.querySelectorAll('.c-advisorStep__slide'), function (stepSlide) {
    stepSlide.addEventListener('click', function (event) {
      var selectedOption = event.currentTarget.querySelector('.heading--xs').textContent;

      if (selectedCategory === 'Solutions') {
        if (categorySelections.Solutions.indexOf(selectedOption) > -1) {
          categorySelections.Solutions.splice(categorySelections.Solutions.indexOf(selectedOption), 1);
        } else {
          categorySelections.Solutions.push(selectedOption);
        }
      } else {
        categorySelections[selectedCategory] = selectedOption;
      }

      dataLayer.push({
        event: 'km_record',
        km_event: 'Product Advisor - Category Selection tracking',
        km_property: categorySelections,
      });

      selectedCategory = document.querySelector('.c-filterTabs__tab.is-active > .u-center').textContent;
    }, false);
  });

  Array.prototype.map.call(document.querySelectorAll('.o-card'), function (card) {
    card.addEventListener('click', function (event) {
      var productSelection = {
        Product: event.currentTarget.querySelector('h3 > a').textContent,
        Selected_link: event.target.href,
        Selected_Options: categorySelections,
      };

      if (event.target.textContent.includes('Details')) {
        dataLayer.push({
          event: 'km_record',
          km_event: 'Product Advisor - View Product Details',
          km_property: productSelection,
        });
      }
      if (event.target.textContent.includes('Swatches')) {
        dataLayer.push({
          event: 'km_record',
          km_event: 'Product Advisor - Browse Swatches',
          km_property: productSelection,
        });
      }
    }, false);
  });
}());
