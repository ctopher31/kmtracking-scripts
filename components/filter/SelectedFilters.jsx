// SelectedFilters
import React from 'react';
import PropTypes from 'prop-types';

const SelectedFilters = ({ selectedFilters, clearFilters, removeFilter }) => (
  <div className="selected-filters clear">
    <ul id="selected-filters-list" className="list-unstyled selected-filters-list">
      {Object.keys(selectedFilters).map(filterKey => (selectedFilters[filterKey].length > 0
        ? selectedFilters[filterKey].map(item => (
          <li key={item}>
            <button type="button" onClick={event => removeFilter(event, item)}>{item}<span className="remove-selection" /></button>
          </li>
        ))
        : false))}
    </ul>
    <button id="clear-filters" className="clear-filters" type="button" onClick={() => clearFilters()}>Clear Filters</button>
    <p id="no-match-text" className="no-match-text" />
  </div>
);

SelectedFilters.propTypes = {
  removeFilter: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  selectedFilters: PropTypes.arrayOf(PropTypes.string),
};

export default SelectedFilters;
