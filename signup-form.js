// Lead Form - Mailchimp
export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export const runForm = (template, delay = 6) => {
  const compiled = template();
  const d = document.createElement('div');
  d.innerHTML = compiled;
  document.body.appendChild(d.firstChild);

  const signUpFormContainerElem = document.getElementById('signup-form-container');
  const closeFormElem = document.getElementById('close-form');
  const signUpFormWrapperElem = document.getElementById('signup-form-wrapper');
  const submit = document.getElementById('submit-form');
  const signUpForm = document.getElementById('signup-form');
  const signUpResponse = document.getElementById('signup-response');

  setTimeout(() => (signUpFormContainerElem.classList.remove('hide')), (delay * 1000));

  signUpFormContainerElem.addEventListener('click', (event) => {
    event.stopPropagation();
    event.currentTarget.classList.add('hide');
    setCookie('signUpFormSession', true);
  }, false);

  closeFormElem.addEventListener('click', (event) => {
    event.stopPropagation();
    event.currentTarget.parentElement.parentElement.classList.add('hide');
    setCookie('signUpFormSession', true);
  }, false);

  signUpFormWrapperElem.addEventListener('click', event => (event.stopPropagation()), false);

  submit.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const data = {
      EmailAddress: document.getElementById('email-address').value,
      FirstName: document.getElementById('first-name').value,
      LastName: document.getElementById('last-name').value,
    };

    const headers = new Headers({ 'Content-Type': 'application/json' });
    fetch('/api/signupform/signup', { method: 'POST', headers, body: JSON.stringify(data) })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error({ status: 'error', message: 'There was an error. Please try again later.' });
      })
      .then((json) => {
        if (json.status === 'success') {
          document.querySelector('.email-validation-error').classList.add('hide');
          signUpForm.classList.add('hide');
          signUpResponse.classList.remove('hide');
          signUpResponse.firstElementChild.classList.remove('hide');
          setCookie('BaliListMember', true, 180);
          setTimeout(() => (document.body.removeChild(signUpFormContainerElem)), 5000);
        } else if (json.status === 'validation error') {
          document.querySelector('.email-validation-error').classList.remove('hide');
        } else {
          throw new Error(json);
        }
      })
      .catch(() => {
        signUpForm.classList.add('hide');
        signUpResponse.classList.remove('hide');
        signUpResponse.lastElementChild.classList.remove('hide');
        setCookie('signUpFormSession', true);
        setTimeout(() => (document.body.removeChild(signUpFormContainerElem)), 5000);
      });
  }, false);
};
