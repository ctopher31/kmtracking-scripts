// Modal
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.modalClickHandler = this.modalClickHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.modalClickHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.modalClickHandler);
  }

  modalClickHandler(event) {
    if (event.target.classList.contains('modal') && event.target.classList.contains('in')) {
      this.props.handleModalClick(event, this.props.modal.item);
    }
  }

  render() {
    const {
      active,
      item,
    } = this.props.modal;

    return (
      <div className="modal-container">
        {(item !== '' && item !== undefined)
        ? (
          <div className={`modal fade ${active ? 'in' : ''}`} id={`modal-${item.id}`} tabIndex="-1" role="dialog" aria-labelledby={`modal-label-${item.id}`}>
            <div className="container">
              <button type="button" className="btn-close" data-dismiss="modal" />
              <div className="modal-dialog" role="document">

                {item.type === 'video'
                ? (
                  <div className="modal-content">
                    <div className="row row-eq-height">
                      <div className="col-xs-12 col-sm-12 col-md-9">
                        <div className="modal-video">
                          <iframe id="modal-iframe" className="modal-iframe" src={`${item.videoUrl}/?rel=0`} title={item.title} allowFullScreen />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-3">
                        <div className="modal-description">
                          <h4 className="modal-title" id={`modal-label-${item.id}`}>{item.title}</h4>
                          <div className="video-description">
                            <p>{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="modal-content">
                    <div className="row row-eq-height">
                      <div className="col-xs-12 col-sm-12 col-md-9">
                        <div className="modal-image">
                          <img src={item.imageUrl} alt={item.imageAlt} />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-3">
                        <div className="modal-description">
                          <h4 className="modal-title" id={`modal-label-${item.newId}`}>{item.productLineName}</h4>
                          <div className="image-caption">
                            <p>{item.description}</p>
                          </div>
                          <a className="action-link black" href={item.productLineUrl}>Learn More</a>
                          <a className="action-link white border-black" href={`/swatches?product-line-id=${item.productLineId}`}>Order Swatches</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        ) : ''}
      </div>
    );
  }
}

Modal.propTypes = {
  handleModalClick: PropTypes.func.isRequired,
  modal: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    item: PropTypes.shape(PropTypes.object.isRequired),
  }),
};

export default Modal;
