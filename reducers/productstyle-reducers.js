// ProductStyles Reducer
import * as App from './reducer-functions';

const productStylesReducer = (state = window.ProductCategoryData, action) => {
  switch (action.type) {
    case 'FILTER_BUTTON_CLICK':
      return Object.assign({}, state, App.buttonClick(state, action));

    case 'CLOSE_ALL_DROPDOWNS':
      return Object.assign({}, state, App.closeAllDropdowns(state, action));

    case 'SELECT_FILTER':
      return Object.assign({}, state, App.filterProductStyles(state.initialState.productStyles, App.filterClick(state, action)));

    case 'REMOVE_FILTER':
      return Object.assign({}, state, App.filterProductStyles(state.initialState.productStyles, App.removeFilter(state, action)));

    case 'CLEAR_FILTERS':
      return Object.assign({}, state, App.filterProductStyles(state.initialState.productStyles, App.clearFilters(state)));

    default:
      return state;
  }
};

export default productStylesReducer;
