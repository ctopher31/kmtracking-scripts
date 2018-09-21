// Visualization Roller Shades Filter
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisualizationFilterListItem from './VisualizationFilterListItem';
import VisualizationImage from './VisualizationImage';

class VisualizationRollerShades extends Component {
  static configureUrl(style, hemStyle, gimp, swatch) {
    const swatchOption = swatch.ImageFileName;
    const hemOption = (!hemStyle.Name.includes('Standard')) ? `&obj=decorative-options/hems/${hemStyle.Name.toLowerCase().split(' ')[0]}-hem&show&src=${swatch.ImageFileName}` : '';
    const gimpOption = (!hemStyle.Name.includes('Standard')) ? `&obj=decorative-options/trims/${hemStyle.Name.toLowerCase().split(' ')[0]}-trim&show&src=${gimp.ColorNumber}` : '';
    return `http://s7d4.scene7.com/is/image/SpringsWindowFashions?src=ir{SpringsWindowFashionsRender/roller-solar-vignette?&obj=controls/cordless&show&src=${swatchOption}${hemOption}${gimpOption}}&wid=2400&hei=2400`;
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
        lightControls: [],
        hemStyles: [],
        gimps: [],
        swatches: [],
      },
      selected: {
        productLine: this.props.selectedProductLine,
        productStyle: {},
        lightControl: {},
        hemStyle: {},
        gimp: {},
        swatch: {},
      },
    };
    this.setProductStyles = this.setProductStyles.bind(this);
    this.selectProductLine = this.selectProductLine.bind(this);
    this.selectProductStyle = this.selectProductStyle.bind(this);
    this.selectLightControl = this.selectLightControl.bind(this);
    this.selectHemStyle = this.selectHemStyle.bind(this);
    this.selectGimp = this.selectGimp.bind(this);
    this.selectSwatch = this.selectSwatch.bind(this);
  }

  componentWillMount() {
    fetch(`http://dev.webservices.graberblinds.springswf.com/VisualizationService/api/ProductStyles/GetStylesForProductLineAsync/${this.state.selected.productLine.Id}`)
      .then(response => response.json())
      .then(data => this.setProductStyles(data))
      .catch(reason => this.props.log(reason));
  }

  setProductStyles(data) {
    this.setState((prevState) => {
      const lightControls = data[0].Options.filter(option => option.Name === 'Opacity Level')[0].OptionChoices;
      const hemStyles = data[0].Options.filter(option => option.Name === 'Hem Type')[0].OptionChoices;
      const gimps = data[0].Options.filter(option => option.Name === '7/16" Gimp Trim')[0].OptionChoices.map(choice => ({
        Id: choice.Id,
        Name: choice.Name.split('-')[1],
        ColorNumber: choice.Name.split('-')[0],
        OptionId: choice.OptionId,
      }));
      const swatches = data[0].Swatches.filter(swatch => swatch.OptionChoiceIds.indexOf(lightControls[0].Id) > -1);

      return ({
        isLoaded: true,
        imagePath: VisualizationRollerShades.configureUrl(data[0], hemStyles[0], gimps[0], swatches[0]),
        imageDescription: `${this.state.selected.productLine.Name} Visualization`,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: data,
          lightControls,
          hemStyles,
          gimps,
          swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle: data[0],
          lightControl: lightControls[0],
          hemStyle: hemStyles[0],
          gimp: gimps[0],
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
      const lightControls = productStyle.Options.filter(option => option.Name === 'Opacity Level')[0].OptionChoices;
      const swatches = productStyle.Swatches.filter(swatch => swatch.OptionChoiceIds.indexOf(lightControls[0].Id) > -1);

      return ({
        isLoaded: prevState.isLoaded,
        imagePath: VisualizationRollerShades.configureUrl(productStyle, prevState.selected.hemStyle, prevState.selected.gimp, swatches[0]),
        imageDescription: prevState.imageDescription,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: prevState.filters.productStyles,
          lightControls,
          hemStyles: prevState.filters.hemStyles,
          gimps: prevState.filters.gimps,
          swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle,
          lightControl: lightControls[0],
          hemStyle: prevState.selected.hemStyle,
          gimp: prevState.selected.gimp,
          swatch: swatches[0],
        },
      });
    });
  }

  selectLightControl(event) {
    event.persist();
    this.setState((prevState) => {
      const swatches = prevState.selected.productStyle.Swatches.filter(swatch => swatch.OptionChoiceIds.indexOf(parseInt(event.target.value, 10)) > -1);
      const lightControl = prevState.filters.lightControls.filter(choice => choice.Id === parseInt(event.target.value, 10))[0];

      return ({
        isLoaded: prevState.isLoaded,
        imagePath: VisualizationRollerShades.configureUrl(prevState.selected.productStyle, prevState.selected.hemStyle, prevState.selected.gimp, swatches[0]),
        imageDescription: prevState.imageDescription,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: prevState.filters.productStyles,
          lightControls: prevState.filters.lightControls,
          hemStyles: prevState.filters.hemStyles,
          gimps: prevState.filters.gimps,
          swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle: prevState.selected.productStyle,
          lightControl,
          hemStyle: prevState.selected.hemStyle,
          gimp: prevState.selected.gimp,
          swatch: swatches[0],
        },
      });
    });
  }

  selectHemStyle(event) {
    event.persist();
    this.setState((prevState) => {
      const hemStyle = prevState.filters.hemStyles.filter(choice => choice.Id === parseInt(event.target.value, 10))[0];

      return ({
        isLoaded: prevState.isLoaded,
        imagePath: VisualizationRollerShades.configureUrl(prevState.selected.productStyle, hemStyle, prevState.selected.gimp, prevState.selected.swatch),
        imageDescription: prevState.imageDescription,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: prevState.filters.productStyles,
          lightControls: prevState.filters.lightControls,
          hemStyles: prevState.filters.hemStyles,
          gimps: prevState.filters.gimps,
          swatches: prevState.filters.swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle: prevState.selected.productStyle,
          lightControl: prevState.selected.lightControl,
          hemStyle,
          gimp: prevState.selected.gimp,
          swatch: prevState.selected.swatch,
        },
      });
    });
  }

  selectGimp(event) {
    event.persist();
    this.setState((prevState) => {
      const gimp = prevState.filters.gimps.filter(choice => choice.Id === parseInt(event.target.value, 10))[0];

      return ({
        isLoaded: prevState.isLoaded,
        imagePath: VisualizationRollerShades.configureUrl(prevState.selected.productStyle, prevState.selected.hemStyle, gimp, prevState.selected.swatch),
        imageDescription: prevState.imageDescription,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: prevState.filters.productStyles,
          lightControls: prevState.filters.lightControls,
          hemStyles: prevState.filters.hemStyles,
          gimps: prevState.filters.gimps,
          swatches: prevState.filters.swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle: prevState.selected.productStyle,
          lightControl: prevState.selected.lightControl,
          hemStyle: prevState.selected.hemStyle,
          gimp,
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
        imagePath: VisualizationRollerShades.configureUrl(prevState.selected.productStyle, prevState.selected.hemStyle, prevState.selected.gimp, swatch),
        imageDescription: prevState.imageDescription,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: prevState.filters.productStyles,
          lightControls: prevState.filters.lightControls,
          hemStyles: prevState.filters.hemStyles,
          gimps: prevState.filters.gimps,
          swatches: prevState.filters.swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle: prevState.selected.productStyle,
          lightControl: prevState.selected.lightControl,
          hemStyle: prevState.selected.hemStyle,
          gimp: prevState.selected.gimp,
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
                    <VisualizationFilterListItem selectionList={this.state.filters.lightControls} selected={this.state.selected.lightControl} name="Light Control" selectOption={this.selectLightControl} />
                    <VisualizationFilterListItem selectionList={this.state.filters.hemStyles} selected={this.state.selected.hemStyle} name="Hem Styles" selectOption={this.selectHemStyle} />
                    {(!this.state.selected.hemStyle.Name.includes('Standard'))
                      ? <VisualizationFilterListItem selectionList={this.state.filters.gimps} selected={this.state.selected.gimp} name="Gimps" selectOption={this.selectGimp} />
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

VisualizationRollerShades.propTypes = {
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

export default VisualizationRollerShades;
