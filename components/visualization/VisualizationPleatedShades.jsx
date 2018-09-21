// Visualization Filter
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisualizationFilterListItem from './VisualizationFilterListItem';
import VisualizationImage from './VisualizationImage';
import VisualizationSunUpSunDownSwatchListItem from './VisualizationSunUpSunDownSwatchListItem';

class VisualizationPleatedShades extends Component {
  static configureUrl(style, shadeType, linerType, swatch1, swatch2) {
    const vignette = 'http://s7d4.scene7.com/is/image/SpringsWindowFashions?src=ir{SpringsWindowFashionsRender/pleated-vignette?';
    let linerTypeOption = '';
    const pleatSize = (style.Name.includes('1')) ? '1in' : '2in';
    const swatchOption1 = swatch1.ImageFileName;
    const swatchOption2 = swatch2.ImageFileName;

    switch (shadeType.Name) {
      case 'Sun Up/Sun Down':
        if (linerType.Name !== 'No Liner') {
          linerTypeOption = `&obj=liners/${linerType.Name.toLowerCase().replace(' ', '-')}/susd$show`;
        }
        // return `${vignette}&obj=${pleatSize}-pleated-shades-controls/${pleatSize}-susd-cordless/${pleatSize}-susd-cordless-top-shade&show&src=05G5313&obj=${pleatSize}-pleated-shades-controls/${pleatSize}-susd-cordless/${pleatSize}-susd-cordless-bottom-shade&show&src=05G5314${linerTypeOption}}&wid=2400&hei=2400`;
        return `${vignette}&obj=${pleatSize}-pleated-shades-controls/${pleatSize}-susd-cordless/${pleatSize}-susd-cordless-top-shade&show&src=${swatchOption1}&obj=${pleatSize}-pleated-shades-controls/${pleatSize}-susd-cordless/${pleatSize}-susd-cordless-bottom-shade&show&src=${swatchOption2}${linerTypeOption}}&wid=2400&hei=2400`;

      case 'Bottom Up/Top Down':
        if (linerType.Name !== 'No Liner') {
          linerTypeOption = `&obj=liners/${linerType.Name.toLowerCase().replace(' ', '-')}/butd$show`;
        }
        return `${vignette}&obj=${pleatSize}-pleated-shades-controls/${pleatSize}-butd-cordless&show&src=${swatchOption1}${linerTypeOption}}&wid=2400&hei=2400`;

      default:
        if (linerType.Name !== 'No Liner') {
          linerTypeOption = `&obj=liners/${linerType.Name.toLowerCase().replace(' ', '-')}/standard$show`;
        }
        return `${vignette}&obj=${pleatSize}-pleated-shades-controls/${pleatSize}-standard-cordless&show&src=${swatchOption1}${linerTypeOption}}&wid=2400&hei=2400`;
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
        shadesTypes: [],
        linerTypes: [],
        lightControls: [],
        swatches: [],
      },
      selected: {
        productLine: this.props.selectedProductLine,
        productStyle: {},
        shadeType: {},
        linerType: {},
        lightControl: {},
        swatch1: {},
        swatch2: {},
      },
    };
    this.setProductStyles = this.setProductStyles.bind(this);
    this.selectProductLine = this.selectProductLine.bind(this);
    this.selectProductStyle = this.selectProductStyle.bind(this);
    this.selectShadeType = this.selectShadeType.bind(this);
    this.selectLightControl = this.selectLightControl.bind(this);
    this.selectLinerType = this.selectLinerType.bind(this);
    this.selectSwatch1 = this.selectSwatch1.bind(this);
    this.selectSwatch2 = this.selectSwatch2.bind(this);
  }

  componentWillMount() {
    fetch(`http://dev.webservices.graberblinds.springswf.com/VisualizationService/api/ProductStyles/GetStylesForProductLineAsync/${this.state.selected.productLine.Id}`)
      .then(response => response.json())
      .then(data => this.setProductStyles(data))
      .catch(reason => this.props.log(reason));
  }

  setProductStyles(data) {
    this.setState((prevState) => {
      const shadeTypes = data[0].Options.filter(option => option.Name === 'Shade Type')[0].OptionChoices;
      const linerTypes = data[0].Options.filter(option => option.Name === 'Liner Type')[0].OptionChoices;
      const lightControls = data[0].Options.filter(option => option.Name === 'Opacity Level')[0].OptionChoices;
      const swatches = data[0].Swatches.filter(swatch => swatch.OptionChoiceIds.indexOf(lightControls[0].Id) > -1);

      return ({
        isLoaded: true,
        imagePath: VisualizationPleatedShades.configureUrl(data[0], shadeTypes[0], linerTypes[0], swatches[0], swatches[0]),
        imageDescription: `${this.state.selected.productLine.Name} Visualization`,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: data,
          shadeTypes,
          linerTypes,
          lightControls,
          swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle: data[0],
          shadeType: shadeTypes[0],
          linerType: linerTypes[0],
          lightControl: lightControls[0],
          swatch1: swatches[0],
          swatch2: swatches[0],
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

      return {
        isLoaded: prevState.isLoaded,
        imagePath: VisualizationPleatedShades.configureUrl(productStyle, prevState.selected.shadeType, prevState.selected.linerType, swatches[0], swatches[0]),
        imageDescription: prevState.imageDescription,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: prevState.filters.productStyles,
          shadeTypes: prevState.filters.shadeTypes,
          linerTypes: prevState.filters.linerTypes,
          lightControls,
          swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle,
          shadeType: prevState.selected.shadeType,
          linerType: prevState.selected.linerType,
          lightControl: lightControls[0],
          swatch1: swatches[0],
          swatch2: swatches[0],
        },
      };
    });
  }

  selectShadeType(event) {
    event.persist();
    this.setState((prevState) => {
      const shadeType = prevState.filters.shadeTypes.filter(choice => choice.Id === parseInt(event.target.value, 10))[0];

      return ({
        isLoaded: prevState.isLoaded,
        imagePath: VisualizationPleatedShades.configureUrl(prevState.selected.productStyle, shadeType, prevState.selected.linerType, prevState.selected.swatch1, prevState.selected.swatch2),
        imageDescription: prevState.imageDescription,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: prevState.filters.productStyles,
          shadeTypes: prevState.filters.shadeTypes,
          linerTypes: prevState.filters.linerTypes,
          lightControls: prevState.filters.lightControls,
          swatches: prevState.filters.swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle: prevState.selected.productStyle,
          shadeType,
          linerType: prevState.selected.linerType,
          lightControl: prevState.selected.lightControl,
          swatch1: prevState.selected.swatch1,
          swatch2: prevState.selected.swatch2,
        },
      });
    });
  }

  selectLinerType(event) {
    event.persist();
    this.setState((prevState) => {
      const linerType = prevState.filters.linerTypes.filter(choice => choice.Id === parseInt(event.target.value, 10))[0];

      return ({
        isLoaded: prevState.isLoaded,
        imagePath: VisualizationPleatedShades.configureUrl(prevState.selected.productStyle, prevState.selected.shadeType, linerType, prevState.selected.swatch1, prevState.selected.swatch2),
        imageDescription: prevState.imageDescription,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: prevState.filters.productStyles,
          shadeTypes: prevState.filters.shadeTypes,
          linerTypes: prevState.filters.linerTypes,
          lightControls: prevState.filters.lightControls,
          swatches: prevState.filters.swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle: prevState.selected.productStyle,
          shadeType: prevState.selected.shadeType,
          linerType,
          lightControl: prevState.selected.lightControl,
          swatch1: prevState.selected.swatch1,
          swatch2: prevState.selected.swatch2,
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
        imagePath: VisualizationPleatedShades.configureUrl(prevState.selected.productStyle, prevState.selected.shadeType, prevState.selected.linerType, swatches[0], swatches[0]),
        imageDescription: prevState.imageDescription,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: prevState.filters.productStyles,
          shadeTypes: prevState.filters.shadeTypes,
          linerTypes: prevState.filters.linerTypes,
          lightControls: prevState.filters.lightControls,
          swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle: prevState.selected.productStyle,
          shadeType: prevState.selected.shadeType,
          linerType: prevState.selected.linerType,
          lightControl,
          swatch1: swatches[0],
          swatch2: swatches[0],
        },
      });
    });
  }

  selectSwatch1(event) {
    event.persist();
    this.setState((prevState) => {
      const swatch1 = prevState.filters.swatches.filter(swatch => swatch.Id === event.target.value)[0];

      return ({
        isLoaded: prevState.isLoaded,
        imagePath: VisualizationPleatedShades.configureUrl(prevState.selected.productStyle, prevState.selected.shadeType, prevState.selected.linerType, swatch1, prevState.selected.swatch2),
        imageDescription: prevState.imageDescription,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: prevState.filters.productStyles,
          shadeTypes: prevState.filters.shadeTypes,
          linerTypes: prevState.filters.linerTypes,
          lightControls: prevState.filters.lightControls,
          swatches: prevState.filters.swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle: prevState.selected.productStyle,
          shadeType: prevState.selected.shadeType,
          linerType: prevState.selected.linerType,
          lightControl: prevState.selected.lightControl,
          swatch1,
          swatch2: prevState.selected.swatch2,
        },
      });
    });
  }

  selectSwatch2(event) {
    event.persist();
    this.setState((prevState) => {
      const swatch2 = prevState.filters.swatches.filter(swatch => swatch.Id === event.target.value)[0];

      return ({
        isLoaded: prevState.isLoaded,
        imagePath: VisualizationPleatedShades.configureUrl(prevState.selected.productStyle, prevState.selected.shadeType, prevState.selected.linerType, prevState.selected.swatch1, swatch2),
        imageDescription: prevState.imageDescription,
        filters: {
          productLines: prevState.filters.productLines,
          productStyles: prevState.filters.productStyles,
          shadeTypes: prevState.filters.shadeTypes,
          linerTypes: prevState.filters.linerTypes,
          lightControls: prevState.filters.lightControls,
          swatches: prevState.filters.swatches,
        },
        selected: {
          productLine: prevState.selected.productLine,
          productStyle: prevState.selected.productStyle,
          shadeType: prevState.selected.shadeType,
          linerType: prevState.selected.linerType,
          lightControl: prevState.selected.lightControl,
          swatch1: prevState.selected.swatch1,
          swatch2,
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
                    <VisualizationFilterListItem selectionList={this.state.filters.shadeTypes} selected={this.state.selected.shadeType} name="Shade Type" selectOption={this.selectShadeType} />
                    <VisualizationFilterListItem selectionList={this.state.filters.linerTypes} selected={this.state.selected.linerType} name="Liner Type" selectOption={this.selectLinerType} />
                    {(this.state.selected.shadeType.Name.includes('Sun Up/Sun Down'))
                      ? (<VisualizationSunUpSunDownSwatchListItem selectionList={this.state.filters.swatches} selected1={this.state.selected.swatch1} selected2={this.state.selected.swatch2} name="Swatches" selectSwatch1={this.selectSwatch1} selectSwatch2={this.selectSwatch2} />)
                      : (<VisualizationFilterListItem selectionList={this.state.filters.swatches} selected={this.state.selected.swatch1} name="Swatches" selectOption={this.selectSwatch1} />)
                    }
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

VisualizationPleatedShades.propTypes = {
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

export default VisualizationPleatedShades;
