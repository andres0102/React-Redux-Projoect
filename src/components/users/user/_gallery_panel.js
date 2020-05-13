import React, { Component } from 'react';
import { renderImage } from '../../../helpers/render_image';
import Lightbox from 'react-image-lightbox';

export default class GalleryPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lightboxIsOpen: false,
      photoIndex: 0
    }
  }

  renderPicture = (picture) => {
    return (
      <img
        key={picture.picture}
        alt="profile"
        className="img-fluid img-thumbnail square-picture"
        onClick={() => this.setState({lightboxIsOpen: true}) }
        src={renderImage(picture.picture_medium)}
      />
    )
  }

  renderImages = () => {
    const user = this.props.user;
    const { photoIndex, lightboxIsOpen } = this.state;

    if(Object.keys(user).length === 0 && user.constructor === Object) {
      return null
    } else {
      const images = user.pictures.map(pic => pic.picture);

      if(user.pictures.length > 0) {
        return (
          <picture>
            { user.pictures.map(this.renderPicture) }
            {lightboxIsOpen && (
              <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => this.setState({ lightboxIsOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + images.length - 1) % images.length,
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % images.length,
                  })
                }
              />
            )}
          </picture>
        )
      } else {
        return (
          <h4 className="white-text-bs"> Δεν υπάρχουν φωτογραφίες :( </h4>
        )
      }
    }
  }

  render() {
    return(
      <div className="col-12 p-4 mb-2 effect2 text-center bg-purple">
        { this.renderImages() }
      </div>
    );
  }
}
