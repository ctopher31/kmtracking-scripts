// Product Style List
import React from 'react';
import PropTypes from 'prop-types';
import ProductStyleListItem from './ProductStyleListItem';

const ProductStyleList = ({ productStyles }) => (
  <div className="productstyle-list product-styles row-collapse">
    <div className="row row-eq-height">
      {productStyles.map(item => <ProductStyleListItem key={item.id} productstyle={item} />)}
    </div>
  </div>
);

ProductStyleList.propTypes = {
  productStyles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
};

export default ProductStyleList;
