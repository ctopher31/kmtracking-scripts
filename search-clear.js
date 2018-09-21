// Search

export default function searchClear(inputName, clearName) {
  const inputElem = document.querySelector(inputName);
  const clearElem = document.querySelector(clearName);
  inputElem.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.currentTarget.value.length > 0) {
      clearElem.classList.remove('hide');
    } else {
      clearElem.classList.add('hide');
    }
  });

  // Clear text and hide button.
  clearElem.addEventListener('click', (event) => {
    event.preventDefault();
    event.currentTarget.classList.add('hide');
    inputElem.value = '';
  });
}
