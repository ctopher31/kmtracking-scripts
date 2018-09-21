// Media Gallery Reducer
import * as App from './reducer-functions';

const mediaGalleryReducer = (state = window.MediaGalleryData, action) => {
  switch (action.type) {
    case 'FILTER_BUTTON_CLICK':
      return Object.assign({}, state, App.buttonClick(state, action));

    case 'CLOSE_ALL_DROPDOWNS':
      return Object.assign({}, state, App.closeAllDropdowns(state, action));

    case 'SELECT_FILTER':
      return Object.assign({}, state, App.filterMediaItems(state.initialState.mediaItems, App.filterClick(state, action)));

    case 'REMOVE_FILTER':
      return Object.assign({}, state, App.filterMediaItems(state.initialState.mediaItems, App.removeFilter(state, action)));

    case 'CLEAR_FILTERS':
      return Object.assign({}, state, App.filterMediaItems(state.initialState.mediaItems, App.clearFilters(state)));

    case 'OPEN_MODAL':
      return Object.assign({}, state, App.openModal(state, action));

    case 'CLOSE_MODAL':
      return Object.assign({}, state, App.closeModal(state, action));

    default:
      return state;
  }
};

export default mediaGalleryReducer;
