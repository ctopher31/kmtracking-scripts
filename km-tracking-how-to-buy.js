/* eslint-disable prefer-arrow-callback, func-names, no-var, strict, vars-on-top, prefer-template */
// How to Buy tracking
(function () {
  'use strict';

  // Viewed page
  dataLayer.push({
    event: 'km_record',
    km_event: 'Viewed How to Buy (Find an Expert)',
  });

  // Track address submitted in Search Experts form (dealer search)
  var input = document.getElementById('address-input');
  var locatorButton = document.querySelector('.c-locatorForm__searchBtn');

  input.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      dataLayer.push({
        event: 'km_record',
        km_event: 'Find An Expert - Search Experts',
        km_property: {
          'Address or ZipCode': this.value,
        },
      });
    }
  }, false);

  locatorButton.addEventListener('click', function () {
    // var inputCurrentValue = document.getElementById('address-input').value;
    dataLayer.push({
      event: 'km_record',
      km_event: 'Find An Expert - Search Experts',
      km_property: {
        'Address or ZipCode': input.value,
      },
    });
  }, false);
  // End dealer search tracking

  // Track the dealer clicked in search results (web link, email link, saved to swatchbook)
  $(document).on('click', '.o-dealerCard', function (event) {
    var dealerData = {
      Dealer_Name: '',
      Dealer_Type: '',
      Dealer_Address: '',
      Contact_Type_Clicked: '',
    };

    Array.prototype.map.call(event.currentTarget.querySelectorAll('.o-dealerCard__content div'), function (item, index) {
      switch (index) {
        case 0:
          dealerData.Dealer_Name = item.textContent;
          break;

        case 1:
          dealerData.Dealer_Type = item.textContent;
          break;

        case 3:
          dealerData.Dealer_Address += (item.textContent !== '' ? item.textContent + ', ' : '');
          break;

        case 4:
          dealerData.Dealer_Address += item.textContent;
          break;

        default:
          break;
      }
    });
    if ((event.target.href && event.target.href.includes('http')) || (event.target.parentElement.href && event.target.parentElement.href.includes('http'))) {
      dealerData.Contact_Type_Clicked = 'Web';
    } else if ((event.target.href && event.target.href.includes('mailto:')) || (event.target.parentElement.href && event.target.parentElement.href.includes('mailto:'))) {
      dealerData.Contact_Type_Clicked = 'Email';
    } else if ((event.target.href && event.target.href.includes('tel:')) || (event.target.parentElement.href && event.target.parentElement.href.includes('tel:'))) {
      dealerData.Contact_Type_Clicked = 'Click To Call';
    } else {
      dealerData.Contact_Type_Clicked = 'Saved to Swatchbook';
    }
    dataLayer.push({
      event: 'km_record',
      km_event: 'Find An Expert - Select an Expert',
      km_property: dealerData,
    });
  });
  // end dealer click tracking

  // Request a consultation tracking
  var requestButton = document.getElementById('consultation-modal-btn');
  requestButton.addEventListener('click', function () {
    dataLayer.push({
      event: 'km_record',
      km_event: 'Find An Expert - Request Consultation Form Opened',
      km_property: {
        Form_Status: 'Opened',
      },
    });

    var formSubmitButton = document.getElementById('0a6f27d1-09da-4863-a2f9-fe60964e6963');
    formSubmitButton.addEventListener('click', function () {
      var validForm = epiHelpers.validateForm();
      var validPhone = epiHelpers.validatePhoneIfExists();

      if (validForm && validPhone) {
        dataLayer.push({
          event: 'km_record',
          km_event: 'Find An Expert - Request Consultation Form Submitted',
          km_property: {
            Form_Status: 'Submitted',
            First_Name: document.getElementById('4549ed0d-adb3-43be-9b2a-85cb54bae043').value,
            Last_Name: document.getElementById('150780ce-4586-46ad-84e3-f3cfacdb1b41').value,
            Zip_Code: document.getElementById('30f46eb7-f138-4589-9b15-2142b3e01deb').value,
            Phone_Number: document.getElementById('8af7fdcf-7d5c-4842-b682-ab8ca2850a39').value,
            Email_Address: document.getElementById('bafe28f7-64c1-4c8d-a501-770d39adbe89').value,
          },
        });
      }
    });
  });
  // End Request a consultation tracking
}());
