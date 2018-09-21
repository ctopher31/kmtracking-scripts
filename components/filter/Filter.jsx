// Filter
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FilterList } from './FilterList';
import SelectedFilters from './SelectedFilters';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.dropDownClickHandler = this.dropDownClickHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.dropDownClickHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.dropDownClickHandler);
  }

  dropDownClickHandler(event) {
    if (!event.target.classList.contains('filter-checkbox') && !event.target.classList.contains('filter-label') && !event.target.classList.contains('filter-selection-item') && !event.target.classList.contains('filter-selection-list')) {
      this.props.closeAllDropdowns(event);
    }
  }

  render() {
    const {
      filters,
      selectedFilters,
      buttonClick,
      filterClick,
      removeFilter,
      clearFilters,
    } = this.props;

    return (
      <div className="filter-container">
        <FilterList filters={filters} filterClick={filterClick} buttonClick={buttonClick} />
        <SelectedFilters selectedFilters={selectedFilters} clearFilters={clearFilters} removeFilter={removeFilter} />
      </div>
    );
  }
}

Filter.propTypes = {
  buttonClick: PropTypes.func.isRequired,
  closeAllDropdowns: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  filterClick: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  filters: PropTypes.shape(PropTypes.object),
  selectedFilters: PropTypes.arrayOf(PropTypes.string),
};

export default Filter;
