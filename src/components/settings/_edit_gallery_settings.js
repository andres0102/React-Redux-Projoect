import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editGallerySettings, deletePicture } from '../../redux/actions/settings';
import { renderImage } from '../../helpers/render_image';
import ImageUploader from 'react-images-upload';
import SweetAlert from 'sweetalert2-react';
import PageLoader from '../page_loader';

class EditGallerySettings extends Component {
  constructor(props) {
    super(props)

    this.state = { picture: '', isOpen: false, selectedPicture: null }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let formPayload = new FormData(event.target);
    formPayload.append('picture', this.state.picture);

    this.props.editGallerySettings(formPayload)

    this.setState({selectedPicture: null, picture: ''})
  }

  onDrop = (picture) => {
    this.setState({picture: picture[0]});
  }

  handleClick = (picture_id) => (e) => {
    e.preventDefault();

    this.setState({isOpen: true, selectedPicture: picture_id})
  }

  renderPicture = (picture) => {
    return (
      <a
        key={picture.picture_medium}
        href=''
        onClick={this.handleClick(picture.id)}
      >
        <div
          className="d-inline-block profile-pic-round-sm m-2"
          style={{
            border: '1px solid black',
            backgroundImage: `url(${renderImage(picture.picture_medium)})`
          }}
        />
      </a>
    )
  }

  renderPictures = () => {
    const currentUser = this.props.currentUser;
    if(currentUser.pictures) {
      return currentUser.pictures.map(this.renderPicture)
    } else {
      return null
    }
  }

  deletePictureSubmit = () => {
    this.setState({ isOpen: false })

    this.props.deletePicture(this.state.selectedPicture)
    this.setState({selectedPicture: null, picture: ''})
  }

  renderSwal = () => {
    return (
      <SweetAlert
        show={this.state.isOpen}
        type="warning"
        title="Διαγραφή φωτογραφίας"
        text='Είστε σίγουρος/η?'
        showCancelButton={true}
        confirmButtonText="Ναί"
        cancelButtonText="Όχι"
        onConfirm={this.deletePictureSubmit}
      />
    )
  }

  render() {
    const warningString = "Έως 5 ΜΒ. Επιτρεπόμενα αρχεία: (.jpg | .png | .gif)"

    return(
      <div className="col-12 p-4">
        { this.props.isEditingSettings ? <PageLoader /> : null }
        <div className="dark-gray-text">
          <h2 className="mb-4 pull-left">Άλμπουμ φωτογραφιών</h2>
        </div>
        <div className="clearfix" />
        <hr className="colorgraph" />
        { this.renderSwal() }
        { this.renderPictures() }

        <hr />
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <ImageUploader
                  withIcon={true}
                  withPreview={true}
                  singleImage={true}
                  label={warningString}
                  buttonText='Ανεβάστε φωτογραφία'
                  buttonType='button'
                  onChange={this.onDrop}
                  name='gallery[picture]'
                  imgExtension={['.jpg', '.gif', '.png']}
                  maxFileSize={5242880}
                />
              </div>
            </div>
          </div>

          <input
            value="Αποθήκευση"
            className="btn btn-primary btn-block"
            type="submit"
          />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      editGallerySettings,
      deletePicture
    }, dispatch)
  };
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.result,
    isEditingSettings: state.settings.isEditingSettings
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGallerySettings);
