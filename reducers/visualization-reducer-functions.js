// Visualization Reducer Functions
export const getSwatchOptions = productStyle => productStyle.Options.filter(option => option.OptionChoices.filter(optionChoice => productStyle.Swatches.filter(swatch => swatch.OptionChoiceIds.indexOf(optionChoice.Id) > -1).length > 0).length > 0);

export const getProductLineOptions = productStyle => productStyle.Options.filter(option => option.OptionChoices.filter(optionChoice => productStyle.Swatches.filter(swatch => swatch.OptionChoiceIds.indexOf(optionChoice.Id) > -1).length < 1).length > 0);

export const filterSwatches = (swatches, selectedOptions) => swatches.filter(swatch => selectedOptions.filter(option => swatch.OptionChoiceIds.indexOf(option.Id) > -1).length > 0);

// Visualization functions
export const zoomFunctions = () => {
  // Visualization - Add zoom and pan functions for desktop
  if (!navigator.userAgent.match(/(iPad|iPhone|Android)/i)) {
    // Drag framed Element
    const vizImage = document.getElementById('viz-image');

    const dragFramedElement = (elem) => {
      let startX = 0;
      let startY = 0;

      const mouseMoveHandler = (event) => {
        event.preventDefault();
        if (event.clientX > 0 && event.clientY > 0) {
          elem.parentElement.scrollLeft += -(event.clientX - startX);
          elem.parentElement.scrollTop += -(event.clientY - startY);
          startX = event.clientX;
          startY = event.clientY;
        }
      };

      elem.addEventListener('mousedown', (event) => {
        startX = event.clientX;
        startY = event.clientY;

        document.addEventListener('mousemove', mouseMoveHandler);
      });

      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
      });
    };

    dragFramedElement(vizImage);

    // Zoom framed Element
    const zoomFramedElement = (zoomedImage) => {
      const maxImageSize = 2400;
      const zoomSlider = document.getElementById('zoom-range-slider');
      const originalHeight = zoomedImage.style.height;
      let computedValue;

      const zoomHandler = () => {
        if (parseFloat(zoomSlider.value) === 1) {
          zoomedImage.style.height = originalHeight;
          zoomedImage.parentElement.style.overflow = 'hidden';
        } else {
          computedValue = `${zoomedImage.parentElement.clientHeight * parseFloat(zoomSlider.value)}`;
          if (computedValue >= maxImageSize) {
            zoomedImage.style.height = '2400px';
            zoomedImage.parentElement.scrollLeft = `${(1200 - zoomedImage.parentElement.clientWidth) / 2}px`;
          } else {
            zoomedImage.style.height = `${computedValue}px`;
            zoomedImage.parentElement.scrollLeft = (computedValue - zoomedImage.parentElement.clientWidth) / 2;
          }
          zoomedImage.parentElement.style.overflow = 'auto';
        }
      };

      zoomSlider.addEventListener('input', zoomHandler);
      zoomSlider.addEventListener('change', zoomHandler);
    };

    zoomFramedElement(vizImage);
  } else {
    // Hide zoom control on mobile
    const zoomControls = document.getElementById('zoom-controls');
    zoomControls.classList.add('hide');
  }
};

export const loadProductLine = (state, id) => (Object.assign({}, {
  productLines: state.productLines,
  selectedProductLine: state.productLines.filter(productLine => productLine.Id === id)[0],
  imagePath: '',
  imageDescription: '',
}));

export const log = (state, action) => console.log('Click Log', state, action);
