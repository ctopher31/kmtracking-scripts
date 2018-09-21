// Filter Actions
export const buttonClick = (event, filterName) => ({
  type: 'FILTER_BUTTON_CLICK',
  event,
  filterName,
});

export const closeAllDropdowns = event => ({
  type: 'CLOSE_ALL_DROPDOWNS',
  event,
});

export const filterClick = (event, filter, option) => ({
  type: 'SELECT_FILTER',
  event,
  filter,
  option,
});

export const removeFilter = (event, filterName) => ({
  type: 'REMOVE_FILTER',
  event,
  filterName,
});

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS',
});
