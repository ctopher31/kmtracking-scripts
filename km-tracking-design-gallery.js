/* eslint-disable prefer-arrow-callback, func-names, no-var, strict, vars-on-top, prefer-template, newline-per-chained-call */
// Design Gallery tracking
(function () {
  'use strict';

  // Viewed page
  dataLayer.push({
    event: 'km_record',
    km_event: 'Viewed Design Gallery',
  });

  // Gallery Image or Video Shared
  $(document).on('click', '.c-caption__right .link', function () {
    dataLayer.push({
      event: 'km_record',
      km_event: 'Gallery Image or Video Shared',
      km_property: {
        sharedTo: this.textContent.trim(),
        product_image: $(this).parents('.lg').find('.lg-current .lg-image').attr('src'),
        product_description: $(this).parents('.c-caption').find('.c-caption__left > .body--regular').text().trim(),
      },
    });
  });

  function viewdLightBoxImage() {
    dataLayer.push({
      event: 'km_record',
      km_event: 'Viewed Gallery Image or Video',
      km_property: {
        product_image: $('.lg-sub-html').parents('.lg').find('.lg-current .lg-image').attr('src'),
        product_description: $('.lg-sub-html').find('.c-caption__left > .body--regular').text().trim(),
      },
    });
  }

  function addedToSwatchBook() {
    dataLayer.push({
      event: 'km_record',
      km_event: 'Gallery Image or Video Saved to Swatchbook',
      km_property: {
        product_image: $('#add-photo-btn').parents('.lg').find('.lg-current .lg-image').attr('src'),
        product_description: $('#add-photo-btn').parents('.c-caption').find('.c-caption__left > .body--regular').text().trim(),
      },
    });
  }

  function removedFromSwatchBook() {
    dataLayer.push({
      event: 'km_record',
      km_event: 'Gallery Image or Video Removed from Swatchbook',
      km_property: {
        product_image: $('#add-photo-btn').parents('.lg').find('.lg-current .lg-image').attr('src'),
        product_description: $('#add-photo-btn').parents('.c-caption').find('.c-caption__left > .body--regular').text().trim(),
      },
    });
  }

  /* eslint-disable no-undef */
  var observer = new MutationObserver(function (mutations) {
    var lists = mutations.filter(function (mutation) {
      return mutation.type === 'childList' && (mutation.target.tagName === 'BODY' || mutation.target.id === 'add-photo-btn' || mutation.target.classList.contains('lg-loaded') || mutation.target.classList.contains('lg-sub-html'));
    });
    if (lists.filter(function (item) { return item.target.tagName === 'BODY' && item.removedNodes.length > 0 && Array.prototype.filter.call(item.removedNodes, function (node) { return node.classList.contains('lg-outer'); }).length > 0; }).length > 0) {
      return false;
    }
    if (lists.filter(function (item) { return item.target.classList.contains('lg-sub-html'); }).length > 0) {
      viewdLightBoxImage();
      return false;
    }

    if (lists.filter(function (item) { return item.target.id === 'add-photo-btn'; }).length > 0 && lists.filter(function (item) { return item.target.classList.contains('lg-sub-html'); }).length < 1) {
      var swatchbookItem = lists.filter(function (item) { return item.target.id === 'add-photo-btn'; })[0];
      if (swatchbookItem.removedNodes.length > 0 && Array.prototype.filter.call(swatchbookItem.removedNodes, function (node) { return node.classList.contains('icon--plus--white'); }).length > 0) {
        addedToSwatchBook();
        return false;
      }
      if (swatchbookItem.removedNodes.length > 0 && Array.prototype.filter.call(swatchbookItem.removedNodes, function (node) { return node.classList.contains('icon--minus'); }).length > 0) {
        removedFromSwatchBook();
        return false;
      }
    }
    return false;
  });
  /* eslint-enable no-undef */

  observer.observe(document.body, {
    attributes: false,
    childList: true,
    subtree: true,
  });
}());
