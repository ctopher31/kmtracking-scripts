/* eslint-disable prefer-arrow-callback, func-names, no-var, strict, vars-on-top, prefer-template, newline-per-chained-call, object-shorthand */
// Swatch Ordering tracking
(function () {
  'use strict';

  // Swatch Selection
  if (window.location.pathname === '/free-swatches/choose-swatches/') {
    var swatchSelectionSubmit = document.querySelector('.o-form__submit');
    swatchSelectionSubmit.addEventListener('click', function () {
      var kmProperty = {
        referringPage: document.referrer.split(window.location.origin)[1],
      };

      Array.prototype.map.call(document.querySelectorAll('.c-cart__content'), function (swatchItem, index) {
        var swatchElems = swatchItem.querySelectorAll('.c-cart__description li');
        kmProperty['swatch' + index + 'Image'] = swatchItem.querySelector('.c-cart__image img').src;
        kmProperty['swatch' + index + 'ColorNumber'] = swatchElems[0].textContent.trim();
        kmProperty['swatch' + index + 'ColorName'] = swatchItem.querySelector('.c-cart__description .heading--sm').textContent.trim();
        kmProperty['swatch' + index + 'Collection'] = swatchElems[1].textContent.trim();
        kmProperty['swatch' + index + 'Product'] = swatchElems[2].textContent.trim();
        if (swatchItem.querySelector('.o-form__checkbox input').checked) {
          kmProperty['swatch' + index + 'Selected'] = true;
        } else {
          kmProperty['swatch' + index + 'Selected'] = false;
        }
        return false;
      });

      dataLayer.push({
        event: 'km_record',
        km_event: 'Swatch Ordering - Swatch Selection',
        km_property: kmProperty,
      });
    }, false);
  }

  // Ordering Form Submitted
  if (window.location.pathname === '/free-swatches/place-order/') {
    var formSubmitButton = document.getElementById('08b8deb5-faf2-44b9-89f2-657f7e5d057a');
    formSubmitButton.addEventListener('click', function () {
      var validForm = epiHelpers.validateForm();
      var validPhone = epiHelpers.validatePhoneIfExists();

      if (validForm && validPhone) {
        dataLayer.push({
          event: 'km_record',
          km_event: 'Swatch Ordering - Form Submitted',
          km_property: {
            First_Name: document.getElementById('6ebcc0da-f0aa-4a41-9103-56940e275e7e').value,
            Last_Name: document.getElementById('74916398-d27b-44c1-b507-80c6a89693b1').value,
            Address_Line1: document.getElementById('93e6336e-c6c9-420b-93b7-e30d8c9c6556').value,
            Address_Line2: document.getElementById('cdb34863-0f8f-4c70-9a8d-021a4d1845cd').value,
            City: document.getElementById('04b2e87b-2da2-4f57-9f86-bb167de48952').value,
            State_Province: document.getElementById('30a272a0-526b-47f8-b46f-fdcc55c7184e').value,
            Postal_Code: document.getElementById('f1ac586a-7fa6-4c76-892d-82afad024091').value,
            Country: document.getElementById('66d1925e-7e8f-48cf-ac63-af8d928ac935').value,
            Phone_Number: document.getElementById('05d97fc1-dbb6-4592-8042-9a0ae0ec04b4').value,
            Email_Address: document.getElementById('aa1afe4e-f7c6-4000-801f-7cf4944b3a9d').value,
            Design_Consultation_Request: (document.getElementById('4626b0e1-a0bc-4ab1-98e1-a6e40de71523').firstElementChild.checked || false),
            Email_Subscribe: (document.getElementById('421ca08f-949d-4da5-a538-0a7b129f5410').firstElementChild.checked || false),
          },
        });
      }
    }, false);
  }

  // Swatch Order Confirmation
  if (window.location.pathname === '/free-swatches/order-confirmation/') {
    var kmProperty = {
      orderNumber: document.getElementById('custOrderNumber').textContent.replace('#', ''),
      orderEmail: document.getElementById('custEmail').textContent,
    };

    Array.prototype.map.call(document.querySelectorAll('.c-cart__content'), function (swatchItem, index) {
      var bodySmallElems = swatchItem.querySelectorAll('.c-cart__description .body--small');
      kmProperty['swatch' + index + 'Image'] = swatchItem.querySelector('.c-cart__image img').src;
      kmProperty['swatch' + index + 'ColorNumber'] = bodySmallElems[0].textContent.split(' ')[0].trim();
      kmProperty['swatch' + index + 'ColorName'] = swatchItem.querySelector('.c-cart__description .heading--sm').textContent.trim();
      kmProperty['swatch' + index + 'Collection'] = bodySmallElems[0].lastElementChild.textContent.trim();
      kmProperty['swatch' + index + 'Product'] = bodySmallElems[1].firstElementChild.textContent.trim();
      return false;
    });

    dataLayer.push({
      event: 'km_record',
      km_event: 'Swatch Ordering - Order Confirmation',
      km_property: kmProperty,
    });
  }
}());
