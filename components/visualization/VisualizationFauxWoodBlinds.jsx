// Visualization Solar SHades Filter
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisualizationFilterListItem from './VisualizationFilterListItem';
import VisualizationImage from './VisualizationImage';

class VisualizationFauxWoodBlinds extends Component {
  static configureUrl(style, routeType, clothTape, swatch) {
    switch (routeType.Name) {
      case '1" Cloth Tapes':
        return `http://s7d4.scene7.com/is/image/SpringsWindowFashions?src=ir{SpringsWindowFashionsRender/${style.Name.toLowerCase().replace(' ', '-')}-1in-cloth-tapes-vignette?&obj=controls/cordless&show&src=${swatch.ImageFileName}&obj=cloth-tapes&show&src=clothTape}&wid=2400&hei=2400`;

      case '1 1/2" Cloth Tapes':
        return `http://s7d4.scene7.com/is/image/SpringsWindowFashions?src=ir{SpringsWindowFashionsRender/${style.Name.toLowerCase().replace(' ', '-')}-1-1-2in-cloth-tapes-vignette?&obj=controls/cordless&show&src=${swatch.ImageFileName}&obj=cloth-tapes&show&src=clothTape}&wid=2400&hei=2400`;

      default:
        return `http://s7d4.scene7.com/is/image/SpringsWindowFashions?src=ir{SpringsWindowFashionsRender/${style.Name.toLowerCase().replace(' ', '-')}-${routeType.Name.toLowerCase().replace(' ', '-')}-vignette?&obj=controls/cordless&show&src=${swatch.ImageFileName}}&wid=2400&hei=2400`;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      imagePath: '',
      imageDescription: '',
      filters: {
        productLines: this.props.productLines,
        productStyles: [],
        routeTypes: [],
        clothTapes: [],
        swatches: [],
      },
      selected: {
        productLine: this.props.selectedProductLine,
        productStyle: {},
        routeType: {},
        clothTape: {},
        swatch: {},
      },
    };
    this.setProductStyles = this.setProductStyles.bind(this);
    this.selectProductLine = this.selectProductLine.bind(this);
    this.selectProductStyle = this.selectProductStyle.bind(this);
    this.selectRouteType = this.selectRouteType.bind(this);
    this.selectClothTape = this.selectClothTape.bind(this);
    this.selectSwatch = this.selectSwatch.bind(this);
  }

  componentWillMount() {
    fetch(`http://dev.webservices.graberblinds.springswf.com/VisualizationService/api/ProductStyles/GetStylesForProductLineAsync/${this.state.selected.productLine.Id}`)
      .then(response => response.json())
      .then(data => this.setProductStyles(data))
      .catch(reason => this.props.log(reason));
  }

  setProductStyles(productStyles) {
    this.setState((prevState) => {
      const routeTypes = productStyles[0].Options.filter(option => option.Name === 'Route Type')[0].OptionChoices;
      const clothTapes = (productStyles[0].Options.filter(option => option.Name === 'Cloth Tapes').length > 0)
        ? productStyles[0].Options.filter(option => option.Name === 'Cloth Tapes')[0].OptionChoices.map(choice => ({
          Id: choice.Id,
          Type: choice.Name.split('-')[1],
          Name: choice.Name,
          ColorNumber: choice.Name.split('-')[0],
          OptionId: choice.OptionId,
        }))
        : [];
      const swatches = productStyles[0].Swatches;

      return ({
        isLoaded: true,
        imagePath: VisualizationFauxWoodBlinds.configureUrl(productStyles[0], routeTypes[0], clothTapes[0], swatches[0]),
        imageDescription: `${this.state.selected.productLine.Name} Visualization`,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles,
          routeTypes,
          clothTapes,
          swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle: productStyles[0],
          routeType: routeTypes[0],
          clothTape: clothTapes[0],
          swatch: swatches[0],
        },
      });
    });
  }

  selectProductLine(event) {
    event.persist();
    if (this.state.selected.productLine.Id !== parseInt(event.target.value, 10)) {
      this.props.loadProductLine(parseInt(event.target.value, 10));
    }
  }

  selectProductStyle(event) {
    event.persist();
    this.setState((prevState) => {
      const productStyle = prevState.filters.productStyles.filter(style => style.Id === parseInt(event.target.value, 10))[0];
      const routeTypes = productStyle.Options.filter(option => option.Name === 'Route Type')[0].OptionChoices;
      const clothTapes = (productStyle.Options.filter(option => option.Name === 'Cloth Tapes').length > 0)
        ? productStyle.Options.filter(option => option.Name === 'Cloth Tapes')[0].OptionChoices.map(choice => ({
          Id: choice.Id,
          Type: choice.Name.split('-')[1],
          Name: choice.Name,
          ColorNumber: choice.Name.split('-')[0],
          OptionId: choice.OptionId,
        }))
        : [];
      const swatches = productStyle.Swatches;

      return ({
        isLoaded: prevState.isLoaded,
        imagePath: VisualizationFauxWoodBlinds.configureUrl(productStyle, prevState.selected.routeType, prevState.selected.clothTape, swatches[0]),
        imageDescription: prevState.imageDescription,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: prevState.filters.productStyles,
          routeTypes,
          clothTapes,
          swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle,
          routeType: routeTypes[0],
          clothTape: clothTapes[0],
          swatch: swatches[0],
        },
      });
    });
  }

  selectRouteType(event) {
    event.persist();
    this.setState((prevState) => {
      const routeType = prevState.filters.routeTypes.filter(choice => choice.Id === parseInt(event.target.value, 10))[0];

      return ({
        isLoaded: prevState.isLoaded,
        imagePath: VisualizationFauxWoodBlinds.configureUrl(prevState.selected.productStyle, routeType, prevState.selected.clothTape, prevState.selected.swatch),
        imageDescription: prevState.imageDescription,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: prevState.filters.productStyles,
          lightControls: prevState.filters.lightControls,
          routeTypes: prevState.filters.routeTypes,
          clothTapes: prevState.filters.clothTapes,
          swatches: prevState.filters.swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle: prevState.selected.productStyle,
          lightControl: prevState.selected.lightControl,
          routeType,
          clothTape: prevState.selected.clothTape,
          swatch: prevState.selected.swatch,
        },
      });
    });
  }

  selectClothTape(event) {
    event.persist();
    this.setState((prevState) => {
      const clothTape = prevState.filters.clothTapes.filter(choice => choice.Id === parseInt(event.target.value, 10))[0];

      return ({
        isLoaded: prevState.isLoaded,
        imagePath: VisualizationFauxWoodBlinds.configureUrl(prevState.selected.productStyle, prevState.selected.routeType, clothTape, prevState.selected.swatch),
        imageDescription: prevState.imageDescription,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: prevState.filters.productStyles,
          lightControls: prevState.filters.lightControls,
          routeTypes: prevState.filters.routeTypes,
          clothTapes: prevState.filters.clothTapes,
          swatches: prevState.filters.swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle: prevState.selected.productStyle,
          lightControl: prevState.selected.lightControl,
          routeType: prevState.selected.routeType,
          clothTape,
          swatch: prevState.selected.swatch,
        },
      });
    });
  }

  selectSwatch(event) {
    event.persist();
    this.setState((prevState) => {
      const swatch = prevState.filters.swatches.filter(_swatch => _swatch.Id === event.target.value)[0];

      return ({
        isLoaded: prevState.isLoaded,
        imagePath: VisualizationFauxWoodBlinds.configureUrl(prevState.selected.productStyle, prevState.selected.routeType, prevState.selected.clothTape, swatch),
        imageDescription: prevState.imageDescription,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: prevState.filters.productStyles,
          routeTypes: prevState.filters.routeTypes,
          clothTapes: prevState.filters.clothTapes,
          swatches: prevState.filters.swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle: prevState.selected.productStyle,
          routeType: prevState.selected.routeType,
          clothTape: prevState.selected.clothTape,
          swatch,
        },
      });
    });
  }

  render() {
    return ((!this.state.isLoaded)
      ? (<div className="loader" />)
      : (
        <div className="visualization-container">
          <div className="container">
            <h2>Visualization</h2>
            <h4>Wood Blinds</h4>
            <div className="row">
              <div className="col-xs-12 col-md-8">
                <VisualizationImage
                  imagePath={this.state.imagePath}
                  imageDescription={this.state.imageDescription}
                />
                <div className="zoom-control-container" id="zoom-controls">
                  {/* <ul class="list-unstyled zoom-control-list">
                    <li class="zoom-control-list-item zoom-in-list-item">
                      <button type="button" class="zoom-button zoom-in-button"><span class="zoom-control-text zoom-in-text">Zoom In</span><span class="zoom-control-icon zoom-plus-icon"></span></button>
                    </li>
                    <li class="zoom-control-list-item zoom-out-list-item">
                      <button type="button" class="zoom-button zoom-out-button"><span class="zoom-control-text zoom-out-text">Zoom Out</span><span class="zoom-control-icon zoom-minus-icon"></span></button>
                    </li>
                    <li class="zoom-control-list-item reset-list-item">
                      <button type="button" class="zoom-button reset-button"><span class="zoom-control-text zoom-reset-text">Reset</span><span class="zoom-control-icon zoom-reset-icon"></span></button>
                    </li>
                  </ul> */}
                  <div className="zoom-range-container">
                    <input id="zoom-range-slider" className="zoom-range-slider" type="range" min="1" max="4" value="1" step=".01" />
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-md-4">
                <div className="visualization-filter">
                  <ul className="list-unstyled filter-list celluar-shades-list">
                    <VisualizationFilterListItem selectionList={this.state.filters.productLines} selected={this.state.selected.productLine} name="Productline" selectOption={this.selectProductLine} />
                    <VisualizationFilterListItem selectionList={this.state.filters.productStyles} selected={this.state.selected.productStyle} name="Product Style" selectOption={this.selectProductStyle} />
                    <VisualizationFilterListItem selectionList={this.state.filters.routeTypes} selected={this.state.selected.routeType} name="Cord Route Type" selectOption={this.selectRouteType} />
                    {(this.state.selected.routeType.Name.includes('Cloth Tapes'))
                      ? <VisualizationFilterListItem selectionList={this.state.filters.clothTapes} selected={this.state.selected.clothTape} name="Cloth Tapes" selectOption={this.selectClothTape} />
                      : ''}
                    <VisualizationFilterListItem selectionList={this.state.filters.swatches} selected={this.state.selected.swatch} name="Swatches" selectOption={this.selectSwatch} />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

VisualizationFauxWoodBlinds.propTypes = {
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

export default VisualizationFauxWoodBlinds;
