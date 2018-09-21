/* eslint-disable prefer-arrow-callback, func-names, no-var, strict, vars-on-top, prefer-template */
// How To Buy Link tracking
(function () {
  'use strict';

  Array.prototype.map.call(document.querySelectorAll('[href*="/how-to-buy/"]'), function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if ($(event.target).parents('.nav--secondary').length > 0) {
        dataLayer.push({
          event: 'km_record',
          km_event: 'How To Buy Clicked',
          km_property: {
            Link_Location: 'Top Nav',
            Page: window.location.pathname,
          },
        });
      } else if ($(event.target).parents('.nav--primary').length > 0) {
        dataLayer.push({
          event: 'km_record',
          km_event: 'How To Buy Clicked',
          km_property: {
            Link_Location: 'Primary Nav',
            Page: window.location.pathname,
          },
        });
      } else {
        dataLayer.push({
          event: 'km_record',
          km_event: 'How To Buy Clicked',
          km_property: {
            Link_Location: 'Main Content Area',
            Page: window.location.pathname,
          },
        });
      }
    });
  });
}());

// Free Swatches Link tracking
(function () {
  'use strict';

  Array.prototype.map.call(document.querySelectorAll('[href*="/free-swatches/"]'), function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if ($(event.target).parents('.nav--primary').length > 0) {
        dataLayer.push({
          event: 'km_record',
          km_event: 'Free Swatches Clicked',
          km_property: {
            Link_Location: 'Primary Nav',
            Page: window.location.pathname,
          },
        });
      } else {
        dataLayer.push({
          event: 'km_record',
          km_event: 'Free Swatches Clicked',
          km_property: {
            Link_Location: 'Main Content Area',
            Page: window.location.pathname,
          },
        });
      }
    });
  });
}());
