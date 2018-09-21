// Visualization Filter
import React from 'react';
import PropTypes from 'prop-types';

// Filter List Item
const VisualizationFilterListItem = ({ name, selectionList, selected, selectOption }) => (
  <li className="filter-list-item">
    <h4>{name}</h4>
    <select className="list-unstyled filter-selection-list" value={selected.Id || 0} onChange={event => selectOption(event)}>
      {selectionList.map(option => <option key={option.Id} className="filter-list-item" value={option.Id}>{option.Id} : {option.Name || option.ColorName}</option>)}
    </select>
  </li>
);

VisualizationFilterListItem.propTypes = {
  selectOption: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selectionList: PropTypes.shape({
    Name: PropTypes.string.isRequired,
  }),
  selected: PropTypes.shape({
    Id: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
  }),
};

export default VisualizationFilterListItem;
