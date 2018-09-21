// Reducer Functions
export const buttonClick = (state, action) => {
  action.event.persist();
  action.event.stopPropagation();
  action.event.nativeEvent.stopImmediatePropagation();
  const newFilters = Object.assign({}, state.filters);

  Object.keys(newFilters).map((key) => {
    if (typeof newFilters[key] !== 'string') {
      if (newFilters[key].name === action.filterName) {
        if (newFilters[key].active === false) {
          newFilters[key].active = true;
        } else {
          newFilters[key].active = false;
        }
      }
      if (newFilters[key].name !== action.filterName) {
        newFilters[key].active = false;
      }
    }
    return false;
  });

  return {
    filters: newFilters,
  };
};

export const closeAllDropdowns = (state) => {
  const newFilters = Object.assign({}, state.filters);

  Object.keys(newFilters).map((key) => {
    if (typeof newFilters[key] !== 'string') {
      newFilters[key].active = false;
    }
    return false;
  });

  return {
    filters: newFilters,
  };
};

export const filterClick = (state, action) => {
  const newFilters = Object.assign({}, state.filters);
  const newSelectedFilters = Object.assign({}, state.selectedFilters);
  let newSelectedFilterArray = [];

  Object.keys(newFilters).map((filterKey) => {
    if (typeof newFilters[filterKey] !== 'string') {
      newFilters[filterKey].options.map((optionItem) => {
        if (action.option.type === 'radio') {
          if (action.option.value === optionItem.value) {
            optionItem.isChecked = true;
            newSelectedFilters[filterKey] = (action.option.value === 'All' ? [] : [action.option.value]);
          } else {
            optionItem.isChecked = false;
          }
        }

        if (optionItem.type === 'checkbox') {
          if (action.option.isChecked === false && action.option.value === optionItem.value) {
            optionItem.isChecked = true;
            newSelectedFilterArray = newSelectedFilters[filterKey].concat(action.option.value);
            newSelectedFilters[filterKey] = newSelectedFilterArray;
          } else if (action.option.isChecked === true && action.option.value === optionItem.value) {
            optionItem.isChecked = false;
            newSelectedFilterArray = newSelectedFilters[filterKey].filter(key => key !== action.option.value);
            newSelectedFilters[filterKey] = newSelectedFilterArray;
          } else {
            return false;
          }
        }
        return false;
      });
    }
    return false;
  });

  return {
    filters: newFilters,
    selectedFilters: newSelectedFilters,
  };
};

export const removeFilter = (state, action) => {
  const newFilters = Object.assign({}, state.filters);
  const newSelectedFilters = Object.assign({}, state.selectedFilters);
  let newSelectedFilterArray = [];

  Object.keys(newFilters).map((filterKey) => {
    if (typeof newFilters[filterKey] !== 'string') {
      newFilters[filterKey].options.map((optionItem) => {
        if (action.filterName === optionItem.name) {
          optionItem.isChecked = false;
          newSelectedFilterArray = newSelectedFilters[filterKey].filter(key => key !== action.filterName);
          newSelectedFilters[filterKey] = newSelectedFilterArray;
        }
        return false;
      });
    }
    return false;
  });

  return {
    filters: newFilters,
    selectedFilters: newSelectedFilters,
  };
};

export const clearFilters = (state) => {
  const newFilters = Object.assign({}, state.filters);
  const newSelectedFilters = Object.assign({}, state.selectedFilters);

  Object.keys(newFilters).map((filterKey) => {
    if (typeof newFilters[filterKey] !== 'string') {
      newFilters[filterKey].options.map((optionItem) => {
        if (optionItem.type === 'radio' && optionItem.value === 'All') {
          optionItem.isChecked = true;
        } else {
          optionItem.isChecked = false;
        }
        return false;
      });
    }
    return false;
  });

  Object.keys(newSelectedFilters).map((filterKey) => {
    newSelectedFilters[filterKey] = [];
    return false;
  });

  return {
    filters: newFilters,
    selectedFilters: newSelectedFilters,
  };
};

export const filterProductStyles = (productStyles, state) => {
  const newProductStyles = productStyles.filter(style => (
    (state.selectedFilters.productLineFilter.length === 0 || state.selectedFilters.productLineFilter.some(filter => style.productLineName.indexOf(filter) > -1)) &&
    (state.selectedFilters.colorRangeFilter.length === 0 || state.selectedFilters.colorRangeFilter.some(filter => style.colorRanges.some(range => range.name.indexOf(filter) > -1))) &&
    (state.selectedFilters.priceFilter.length === 0 || state.selectedFilters.priceFilter.some(filter => style.priceRatings.some(rating => rating.name.indexOf(filter) > -1))) &&
    (state.selectedFilters.opacityFilter.length === 0 || state.selectedFilters.opacityFilter.some(filter => style.opacityRatings.some(rating => rating.name.indexOf(filter) > -1))) &&
    (state.selectedFilters.energyEfficiencyFilter.length === 0 || state.selectedFilters.energyEfficiencyFilter.some(filter => style.energyEfficiencyRatings.some(rating => rating.name.indexOf(filter) > -1))) &&
    (state.selectedFilters.choiceFilter.length === 0 || state.selectedFilters.choiceFilter.some(filter => style.popularChoicesForStyle.some(rating => rating.name.indexOf(filter) > -1)))
  ));

  return {
    filters: state.filters,
    selectedFilters: state.selectedFilters,
    productStyles: newProductStyles,
  };
};

export const filterMediaItems = (mediaItems, state) => {
  const newMediaItems = mediaItems.filter(item => (
    (state.selectedFilters.imagesVideosFilter.length === 0 || state.selectedFilters.imagesVideosFilter.some(filter => item.type.indexOf(filter) > -1)) &&
    (state.selectedFilters.productLineFilter.length === 0 || state.selectedFilters.productLineFilter.some(filter => item.productLineName.indexOf(filter) > -1)) &&
    (state.selectedFilters.colorRangeFilter.length === 0 || state.selectedFilters.colorRangeFilter.some(filter => item.colorRange.indexOf(filter) > -1)) &&
    (state.selectedFilters.designStyleFilter.length === 0 || state.selectedFilters.designStyleFilter.some(filter => item.designStyle.indexOf(filter) > -1)) &&
    (state.selectedFilters.roomTypeFilter.length === 0 || state.selectedFilters.roomTypeFilter.some(filter => item.roomType.indexOf(filter) > -1))
  ));

  return {
    filters: state.filters,
    selectedFilters: state.selectedFilters,
    mediaItems: newMediaItems,
  };
};

export const openModal = (state, action) => {
  const newMediaItems = [].concat(state.mediaItems);
  const newModal = Object.assign({}, state.modal);

  newMediaItems.map((mediaItem) => {
    if (mediaItem.id === action.item.id) {
      mediaItem.active = true;
      newModal.active = true;
      newModal.item = action.item;
    }
    return false;
  });

  return {
    mediaItems: newMediaItems,
    modal: newModal,
  };
};

export const closeModal = (state, action) => {
  const newMediaItems = [].concat(state.mediaItems);
  const newModal = Object.assign({}, state.modal);

  newMediaItems.map((mediaItem) => {
    if (mediaItem.id === action.item.id) {
      mediaItem.active = false;
      newModal.active = false;
      newModal.item = state.initialState.modal.item;
    }
    return mediaItem;
  });

  return {
    mediaItems: newMediaItems,
    modal: newModal,
  };
};
