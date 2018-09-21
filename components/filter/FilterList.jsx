// FilterList
import React from 'react';
import PropTypes from 'prop-types';

const FilterSelectionListItem = ({ filter, option, filterClick, productRatingImagePath }) => (
  <li key={option.id} className={`filter-selection-item ${option.name.toLowerCase().replace(/[\s]+/g, '-')}-selection-item`}>
    <input className="filter-checkbox" id={option.id} name={option.inputName} type={option.type} value={option.value} onChange={event => filterClick(event, filter, option)} checked={(option.isChecked === true ? 'checked' : '')} />
    <label className="filter-label" htmlFor={option.id}>
      {option.image !== '' && option.image !== undefined
        ? <img className="option-image" src={`${productRatingImagePath}${option.image}`} alt={option.name} />
        : ''}
      {option.name}
    </label>
  </li>
);

FilterSelectionListItem.propTypes = {
  filterClick: PropTypes.func.isRequired,
  filter: PropTypes.shape(PropTypes.object),
  option: PropTypes.shape(PropTypes.object),
  productRatingImagePath: PropTypes.string,
};

const FilterSelectionList = ({ filter, filterClick, productRatingImagePath }) => (
  <ul role="menu" id={`${filter.name.toLowerCase().replace(/[\s]+/g, '-')}-selection-list`} className={`list-unstyled filter-selection-list ${filter.name.toLowerCase().replace(/[\s]+/g, '-')}-selection-list`}>
    {filter.options.length > 0 ? filter.options.map(option => (
      <FilterSelectionListItem key={option.id} filter={filter} option={option} filterClick={filterClick} productRatingImagePath={productRatingImagePath} />
    )) : ''}
  </ul>
);

FilterSelectionList.propTypes = {
  filterClick: PropTypes.func.isRequired,
  filter: PropTypes.shape(PropTypes.object),
  productRatingImagePath: PropTypes.string,
};

const FilterListItem = ({ filter, buttonClick, filterClick, productRatingImagePath }) => (
  <li className={`filter-list-item ${filter.name.toLowerCase().replace(/[\s]+/g, '-')}-filter-list-item`}>
    <button type="button" className={`filter-button ${filter.name.toLowerCase().replace(/[\s]+/g, '-')}-button dropdown-toggle ${(filter.active === true ? 'active' : '')}`} aria-expanded={filter.active} aria-controls={`${filter.name.toLowerCase().replace(/[\s]+/g, '-')}-selection-list`} onClick={event => buttonClick(event, filter.name)}>
      {filter.name}
    </button>
    <FilterSelectionList filter={filter} filterClick={filterClick} productRatingImagePath={productRatingImagePath} />
  </li>
);

FilterListItem.propTypes = {
  buttonClick: PropTypes.func.isRequired,
  filterClick: PropTypes.func.isRequired,
  filter: PropTypes.shape(PropTypes.object),
  productRatingImagePath: PropTypes.string,
};

const FilterList = ({ filters, buttonClick, filterClick }) => (
  <ul className="list-unstyled filter-list">
    {Object.keys(filters).filter(key => typeof filters[key] !== 'string').sort((keyA, keyB) => filters[keyA].order > filters[keyB].order).map(key => (
      <FilterListItem key={key} filter={filters[key]} filterClick={filterClick} productRatingImagePath={filters.productRatingImagePath} buttonClick={buttonClick} />
    ))}
  </ul>
);

FilterList.propTypes = {
  buttonClick: PropTypes.func.isRequired,
  filterClick: PropTypes.func.isRequired,
  filters: PropTypes.shape(PropTypes.object),
};

export {
  FilterList,
  FilterListItem,
  FilterSelectionList,
  FilterSelectionListItem,
};
