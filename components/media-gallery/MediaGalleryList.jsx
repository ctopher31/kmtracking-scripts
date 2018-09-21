// MediaGalleryList
import React from 'react';
import PropTypes from 'prop-types';
import MediaGalleryListItem from './MediaGalleryListItem';

const MediaGalleryList = ({ mediaItems, handleMediaClick }) => (
  <div className="media-gallery-list media-gallery row-collapse">
    <div className="row row-eq-height">
      {mediaItems.map(item => <MediaGalleryListItem key={item} item={item} handleMediaClick={handleMediaClick} />)}
    </div>
  </div>
);

MediaGalleryList.propTypes = {
  handleMediaClick: PropTypes.func.isRequired,
  mediaItems: PropTypes.arrayOf(PropTypes.object),
};

export default MediaGalleryList;
