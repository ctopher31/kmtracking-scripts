// Product Category
import { connect } from 'react-redux';
import * as FilterActions from '../../actions/filter-actions';
import * as ModalActions from '../../actions/modal-actions';
import MediaGallery from './MediaGallery';

const mapStateToProps = state => ({
  filters: state.filters,
  mediaItems: state.mediaItems,
  selectedFilters: state.selectedFilters,
  modal: state.modal,
});

const mapDispatchToProps = dispatch => ({
  buttonClick: (event, filterName) => dispatch(FilterActions.buttonClick(event, filterName)),
  closeAllDropdowns: event => dispatch(FilterActions.closeAllDropdowns(event)),
  filterClick: (event, filter, option) => dispatch(FilterActions.filterClick(event, filter, option)),
  removeFilter: (event, filterName) => dispatch(FilterActions.removeFilter(event, filterName)),
  clearFilters: () => dispatch(FilterActions.clearFilters()),
  openModal: (event, item) => dispatch(ModalActions.openModal(event, item)),
  closeModal: (event, item) => dispatch(ModalActions.closeModal(event, item)),
});

const MediaGalleryContainer = connect(mapStateToProps, mapDispatchToProps)(MediaGallery);

export default MediaGalleryContainer;
