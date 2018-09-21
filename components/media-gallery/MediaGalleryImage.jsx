// MediaGalleryImage
import React from 'react';
import PropTypes from 'prop-types';

const MediaGalleryImage = ({ image, handleMediaClick }) => (
  <div id={`image-${image.id}`} className="image-wrapper" data-props={`Image,${image.productLineName},${image.colorRange},${image.designStyle},${image.roomType}`} data-description={image.description} data-product-url={image.productLineUrl} data-image-url={image.imageUrl}>
    <button type="button" className="gallery-modal-toggle" aria-expanded={image.active} aria-controls={`${image.title.toLowerCase().replace(/[\s]+/g, '-')}-modal`} onClick={event => handleMediaClick(event, image)}>
      <img className="poster-image" src={`${image.imageUrl}`} alt={image.description} />
    </button>
  </div>
);

MediaGalleryImage.propTypes = {
  handleMediaClick: PropTypes.func.isRequired,
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string,
  }),
};

export default MediaGalleryImage;
