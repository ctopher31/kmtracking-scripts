// MediaGalleryListItem
import React from 'react';
import PropTypes from 'prop-types';
import MediaGalleryImage from './MediaGalleryImage';
import MediaGalleryVideo from './MediaGalleryVideo';

const MediaGalleryListItem = ({ item, handleMediaClick }) => (
  <div className={`Grid-cell ${item.columnSize}`}>
    {item.type === 'video'
      ? <MediaGalleryVideo key={`video-${item.id}`} video={item} handleMediaClick={handleMediaClick} />
      : <MediaGalleryImage key={`image-${item.id}`} image={item} handleMediaClick={handleMediaClick} />
    }
  </div>
);

MediaGalleryListItem.propTypes = {
  handleMediaClick: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    columnSize: PropTypes.string.isRequired,
  }),
};

export default MediaGalleryListItem;
