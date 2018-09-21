// MediaGallery
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from '../filter/Filter';
import { FilterSelectionListItem } from '../filter/FilterList';
import MediaGalleryList from './MediaGalleryList';
import Modal from '../modal/Modal';

class MediaGallery extends Component {
  constructor(props) {
    super(props);
    this.handleMediaClick = this.handleMediaClick.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  handleMediaClick(event, media) {
    return this.props.openModal(event, media);
  }

  handleModalClick(event, media) {
    return this.props.closeModal(event, media);
  }

  render() {
    const {
      filters,
      selectedFilters,
      mediaItems,
      buttonClick,
      closeAllDropdowns,
      filterClick,
      removeFilter,
      clearFilters,
      modal,
    } = this.props;

    const secondaryFilters = Object.assign({}, {
      productLineFilter: filters.productLineFilter,
      colorRangeFilter: filters.colorRangeFilter,
      designStyleFilter: filters.designStyleFilter,
      roomTypeFilter: filters.roomTypeFilter,
    });

    return (
      <div className="media-gallery-container">
        <section className="filter media-gallery-filter">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-2">
                <div className="filter-title">
                  <h5>Filter Gallery</h5>
                </div>
              </div>
              <div className="col-xs-12 col-md-10">
                <ul className="list-unstyled image-video-filter-list filter-list">
                  {filters.imagesVideosFilter.options.map(option => (
                    <FilterSelectionListItem key={option.id} filter={filters.imagesVideosFilter} option={option} filterClick={filterClick} productRatingImagePath={filters.productRatingImagePath} />
                  ))}
                </ul>
                <Filter
                  filters={secondaryFilters}
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
        <section className="media-gallery-content">
          <div className="container">
            <h3 id="media-gallery-expand" className="media-gallery-title">
              Media Gallery<span className="plus-minus" id="media-gallery-plus-minus" />
            </h3>
            <MediaGalleryList mediaItems={mediaItems} handleMediaClick={this.handleMediaClick} />
            <Modal modal={modal} handleModalClick={this.handleModalClick} />
          </div>
        </section>
      </div>
    );
  }
}

MediaGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  buttonClick: PropTypes.func.isRequired,
  closeAllDropdowns: PropTypes.func.isRequired,
  filterClick: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  filters: PropTypes.shape(PropTypes.object),
  selectedFilters: PropTypes.arrayOf(PropTypes.string),
  mediaItems: PropTypes.arrayOf(PropTypes.object),
  modal: PropTypes.shape(PropTypes.object),
};

export default MediaGallery;
