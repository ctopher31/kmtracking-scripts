// Visualization Reducer
import * as VisApp from './visualization-reducer-functions';

const visualizationReducer = (state = window.VisualizationInitialState, action) => {
  switch (action.type) {
    case 'LOAD_PRODUCTLINE':
      return VisApp.loadProductLine(state, action.Id);

    case 'LOG':
      return VisApp.log(state, action);

    default:
      return state;
  }
};

export default visualizationReducer;
