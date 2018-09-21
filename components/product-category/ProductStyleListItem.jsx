// Product Style List Item
import React from 'react';
import PropTypes from 'prop-types';

const ProductStyleListItem = ({ productstyle }) => (
  <div className="col-xs-12 col-sm-4 productstyle-list-item">
    <div className={`product-link-block microsite-product-style-content ${productstyle.className} border-${productstyle.color}`}>
      <a className="full-cover" href={productstyle.pageUrl}><span className="hidden">{productstyle.name}</span></a>
      <div className="product-link-block-image"><img src={productstyle.imageUrl} alt={productstyle.name} /></div>
      <h4 className="product-style-link-title"><span className="title-link-text">{productstyle.name}</span></h4>
      <ul className="bullet-points">
        {productstyle.bulletPoints.map(item => <li key={`key-${item.split(' ')[0]}`}>{item}</li>)}
      </ul>

      <div className="ratings-and-price">
        <div className="pricing">
          <p className="pricing-text">
            {productstyle.isOnPromotion
              ? <span notranslate className="price onsaleprice">{productstyle.startingPrice}</span>
              : <span notranslate className="price">{productstyle.startingPrice}</span>}
            <br />
            <span className="caption">for 24{'"'} x 36{'"'}</span>
            <br />
            {productstyle.isOnPromotion
              ? <span isolate className="onsale">{productstyle.promotionComment}</span>
              : ''}
          </p>
        </div>
      </div>

    </div>
  </div>
);

ProductStyleListItem.propTypes = {
  productstyle: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export default ProductStyleListItem;
