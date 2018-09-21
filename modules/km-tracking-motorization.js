/* eslint-disable prefer-arrow-callback, func-names, no-var, strict, vars-on-top, prefer-template */
// Motorization tracking
(function () {
  'use strict';

  // Viewed page
  dataLayer.push({
    event: 'km_record',
    km_event: 'Viewed Motorized Blinds and Shades',
  });

  // Request more information tracking
  var formSubmitButton = document.getElementById('2fc885d1-86c9-4730-8560-76246fd3e9b6');
  formSubmitButton.addEventListener('click', function () {
    var validForm = epiHelpers.validateForm();
    var validPhone = epiHelpers.validatePhoneIfExists();

    if (validForm && validPhone) {
      dataLayer.push({
        event: 'km_record',
        km_event: 'Motorized Blinds and Shades - Request More Information Form Submitted',
        km_property: {
          Form_Status: 'Submitted',
          First_Name: document.getElementById('84521413-91da-4177-8eae-80095bb56629').value,
          Last_Name: document.getElementById('cdbfd4f7-8170-442c-9dee-0bd1b810ded0').value,
          Zip_Code: document.getElementById('08c4f465-8910-4074-854d-6cb4391594a0').value,
          Phone_Number: document.getElementById('20917fbe-fe6c-4f83-9730-487aea6bad3f').value,
          Email_Address: document.getElementById('1bde3745-cd8b-4cca-a977-131460b69713').value,
        },
      });
    }
  });
  // End Request a consultation tracking
}());
