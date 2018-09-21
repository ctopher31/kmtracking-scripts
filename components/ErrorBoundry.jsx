// Error Boundry Component
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });

    // You can also log the error to an error reporting service
    /* eslint-disable no-console */
    console.log(error, info);
    /* eslint-enable no-console */
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

ErrorBoundry.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ErrorBoundry;
