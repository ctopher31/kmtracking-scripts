// Product Styles
import React from 'react';
import PropTypes from 'prop-types';
import Filter from '../filter/Filter';
import ProductStyleList from './ProductStyleList';

const ProductStyles = ({
  filters,
  selectedFilters,
  productStyles,
  buttonClick,
  closeAllDropdowns,
  filterClick,
  removeFilter,
  clearFilters,
}) => (
  <div className="product-category-container">
    <section className="filter product-category-filter">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-2">
            <h5>Filter Products</h5>
          </div>
          <div className="col-xs-12 col-sm-10">
            <Filter
              filters={filters}
              selectedFilters={selectedFilters}
              buttonClick={buttonClick}
              closeAllDropdowns={closeAllDropdowns}
              filterClick={filterClick}
              removeFilter={removeFilter}
              clearFilters={clearFilters}
            />
          </div>
        </div>
      </div>
    </section>
    <section className="product-links product-styles-content">
      <div className="container">
        <h3 id="product-style-expand" className="product-link-title product-styles-title">
          Product Styles<span className="plus-minus" id="product-plus-minus" />
        </h3>
        <ProductStyleList productStyles={productStyles} />
      </div>
    </section>
  </div>
);

ProductStyles.propTypes = {
  buttonClick: PropTypes.func.isRequired,
  closeAllDropdowns: PropTypes.func.isRequired,
  filterClick: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  filters: PropTypes.shape(PropTypes.object),
  selectedFilters: PropTypes.arrayOf(PropTypes.string),
  productStyles: PropTypes.arrayOf(PropTypes.object),
};

export default ProductStyles;
