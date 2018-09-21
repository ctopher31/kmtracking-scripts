// All JavaScript in here will be loaded client-side

// Expose components globally so ReactJS.NET can use them
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { logger, crashReporter } from './middleware/general-middleware';
import visualizationReducers from './reducers/visualization-reducers';
import Components from './components';
import ErrorBoundry from './components/ErrorBoundry';
import VisualizationContainer from './components/visualization/VisualizationContainer';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

fetch('http://dev.webservices.graberblinds.springswf.com/VisualizationService/api/ProductLines')
  .then(response => response.json())
  .then((productLines) => {
    window.VisualizationInitialState = {
      productLines,
      selectedProductLine: productLines[0],
    };

    window.VisualizationStore = createStore(visualizationReducers, window.VisualizationInitialState, composeEnhancers(applyMiddleware(logger, crashReporter)));

    ReactDom.render(
      React.createElement(ErrorBoundry, null, React.createElement(Provider, {
        store: window.VisualizationStore,
      }, React.createElement(VisualizationContainer))),
      document.getElementById('visualization-root'),
    );
  });

export default Components;
