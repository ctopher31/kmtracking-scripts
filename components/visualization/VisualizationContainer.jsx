// Visualization Container
import { connect } from 'react-redux';
import * as VisualizationActions from '../../actions/visualization-actions';
import Visualization from './Visualization';

const mapStateToProps = state => ({
  productLines: state.productLines,
  selectedProductLine: state.selectedProductLine,
});

const mapDispatchToProps = dispatch => ({
  loadProductLine: productLineId => dispatch(VisualizationActions.loadProductLine(productLineId)),
  log: item => dispatch(VisualizationActions.log(item)),
});

const VisualizationContainer = connect(mapStateToProps, mapDispatchToProps)(Visualization);

export default VisualizationContainer;
