// Product Category Container
import { connect } from 'react-redux';
import * as FilterActions from '../../actions/filter-actions';
import ProductStyles from './ProductStyles';

const mapStateToProps = state => ({
  filters: state.filters,
  selectedFilters: state.selectedFilters,
  productStyles: state.productStyles,
});

const mapDispatchToProps = dispatch => ({
  buttonClick: (event, filterName) => dispatch(FilterActions.buttonClick(event, filterName)),
  closeAllDropdowns: event => dispatch(FilterActions.closeAllDropdowns(event)),
  filterClick: (event, filter, option) => dispatch(FilterActions.filterClick(event, filter, option)),
  removeFilter: (event, filterName) => dispatch(FilterActions.removeFilter(event, filterName)),
  clearFilters: () => dispatch(FilterActions.clearFilters()),
});

const ProductStylesContainer = connect(mapStateToProps, mapDispatchToProps)(ProductStyles);

export default ProductStylesContainer;
