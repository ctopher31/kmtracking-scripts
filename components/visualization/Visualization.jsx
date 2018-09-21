// Visualization
import React from 'react';
import PropTypes from 'prop-types';
import VisualizationFilter from './VisualizationFilter';
import VisualizationCellularShades from './VisualizationCellularShades';
import VisualizationPleatedShades from './VisualizationPleatedShades';
import VisualizationRollerShades from './VisualizationRollerShades';
import VisualizationSolarShades from './VisualizationSolarShades';
import VisualizationWoodBlinds from './VisualizationWoodBlinds';
import VisualizationFauxWoodBlinds from './VisualizationFauxWoodBlinds';

const Visualization = (props) => {
  switch (props.selectedProductLine.Id) {
    case 200:
      return <VisualizationCellularShades productLines={props.productLines} selectedProductLine={props.selectedProductLine} loadProductLine={props.loadProductLine} log={props.log} />;

    case 204:
      return <VisualizationPleatedShades productLines={props.productLines} selectedProductLine={props.selectedProductLine} loadProductLine={props.loadProductLine} log={props.log} />;

    case 205:
      return <VisualizationRollerShades productLines={props.productLines} selectedProductLine={props.selectedProductLine} loadProductLine={props.loadProductLine} log={props.log} />;

    case 206:
      return <VisualizationSolarShades productLines={props.productLines} selectedProductLine={props.selectedProductLine} loadProductLine={props.loadProductLine} log={props.log} />;

    case 217:
      return <VisualizationWoodBlinds productLines={props.productLines} selectedProductLine={props.selectedProductLine} loadProductLine={props.loadProductLine} log={props.log} />;

    case 220:
      return <VisualizationFauxWoodBlinds productLines={props.productLines} selectedProductLine={props.selectedProductLine} loadProductLine={props.loadProductLine} log={props.log} />;

    default:
      return <VisualizationFilter productLines={props.productLines} selectedProductLine={props.selectedProductLine} loadProductLine={props.loadProductLine} log={props.log} />;
  }
};

Visualization.propTypes = {
  loadProductLine: PropTypes.func.isRequired,
  log: PropTypes.func,
  productLines: PropTypes.arrayOf(PropTypes.shape({
    Id: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
  })),
  selectedProductLine: PropTypes.shape({
    Id: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
  }),
};

export default Visualization;
