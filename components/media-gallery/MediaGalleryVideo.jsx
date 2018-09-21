// MediaGalleryVideo
import React from 'react';
import PropTypes from 'prop-types';

const MediaGalleryVideo = ({ video, handleMediaClick }) => (
  <div id={`video-${video.id}`} className="video-wrapper" data-props={`Video,${video.productLineName},,,`} data-video-title={video.title} data-video-description={video.description} data-video-iframe={video.videoUrl} data-video-id={video.id}>
    <button type="button" className="gallery-modal-toggle play-video" aria-expanded={video.active} aria-controls={`${video.title.toLowerCase().replace(/[\s]+/g, '-')}-modal`} onClick={event => handleMediaClick(event, video)}>
      <img className="poster-image" src={(video.posterImage === null ? `https://i3.ytimg.com/vi/${video.id}/hqdefault.jpg` : video.posterImage)} alt={video.description} />
      <img className="play-button" src="/Assets/Images/play-button.png" alt="Play Video" />
    </button>
  </div>
);

MediaGalleryVideo.propTypes = {
  handleMediaClick: PropTypes.func.isRequired,
  video: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string,
  }),
};

export default MediaGalleryVideo;
