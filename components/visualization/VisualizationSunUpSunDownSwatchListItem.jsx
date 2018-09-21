// VisualizationSunUpSunDownSwatchListItem
import React from 'react';
import PropTypes from 'prop-types';

const VisualizationSunUpSunDownSwatchListItem = ({ name, selectionList, selected1, selected2, selectSwatch1, selectSwatch2 }) => (
  <li className="filter-list-item">
    <h4>{name}</h4>
    <h5>Top Color</h5>
    <select className="list-unstyled filter-selection-list" value={selected1.Id || 0} onChange={event => selectSwatch1(event)}>
      {selectionList.map(option => <option key={option.Id} className="filter-list-item" value={option.Id}>{option.Id} : {option.ColorName}</option>)}
    </select>
    <h5>Bottom Color</h5>
    <select className="list-unstyled filter-selection-list" value={selected2.Id || 0} onChange={event => selectSwatch2(event)}>
      {selectionList.map(option => <option key={option.Id} className="filter-list-item" value={option.Id}>{option.Id} : {option.ColorName}</option>)}
    </select>
  </li>
);

VisualizationSunUpSunDownSwatchListItem.propTypes = {
  selectSwatch1: PropTypes.func.isRequired,
  selectSwatch2: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selectionList: PropTypes.shape({
    Name: PropTypes.string.isRequired,
  }),
  selected1: PropTypes.shape({
    Id: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
  }),
  selected2: PropTypes.shape({
    Id: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
  }),
};

export default VisualizationSunUpSunDownSwatchListItem;
