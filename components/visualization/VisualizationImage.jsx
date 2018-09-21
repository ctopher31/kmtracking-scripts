// Visualization Image
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { zoomFunctions } from '../../reducers/visualization-reducer-functions';

class VisualizationImage extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.imagePath !== prevState.imagePath) {
      return {
        loaded: false,
        imagePath: nextProps.imagePath,
        imageDescription: nextProps.imageDescription,
      };
    }
    return prevState;
  }

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      imagePath: this.props.imagePath,
      imageDescription: this.props.imageDescription,
    };
  }

  componentDidMount() {
    zoomFunctions();
  }

  render() {
    return (
      <div className="visualization-image-container">
        <div className={`loader${this.state.loaded ? ' hide' : ''}`} />
        <img id="viz-image" className={`visualization-image${this.state.loaded ? '' : 'hide'}`} src={this.state.imagePath} alt={this.state.imageDescription} onLoad={() => this.setState({ loaded: true })} draggable="false" />
      </div>
    );
  }
}

VisualizationImage.propTypes = {
  imagePath: PropTypes.string.isRequired,
  imageDescription: PropTypes.string.isRequired,
};

export default VisualizationImage;
