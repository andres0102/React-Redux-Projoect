import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { renderImage } from '../../../helpers/render_image';
import sendHeart from '../../../services/send_heart';
import { alertError } from '../../../redux/actions/alerts';
import { blockUser } from '../../../redux/actions/users';
import ReportModal from './report_modal';
import MessageModal from '../message_modal';
import SweetAlert from 'sweetalert2-react';
import Lightbox from 'react-image-lightbox';
import Modal from 'react-awesome-modal';

class ProfilePicPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      heartIcon: null,
      visibleBlockedSwal: false,
      visibleReportModal: false,
      visibleMessageModal: false,
      lightboxIsOpen: false
    }
  }

  renderCurrentUserSettings = () => {
    return (
      <Link
        className="btn btn-sm btn-primary btn-round-lg"
        to={'/settings'}
      >
        <i className="fa fa-gears mr-1" />
        Επεξεργασία προφίλ
      </Link>
    )
  }

  renderUserSettings = () => {
    return (
      <div>
        <p>
          <button
            onClick={this.openMessageModal}
            className="btn btn-sm nice-blue-bg btn-round-lg"
          >
            <i className="fa fa-comment-o mr-1" />
            Αποστολή μηνύματος
          </button>
        </p>
        <p>
          <button
            className="btn btn-sm btn-danger btn-round-lg"
            onClick={ this.like }
          >
            { this.renderHeartIcon() }
            Αποστολή καρδιάς
          </button>
        </p>
        <hr />
        <div className='row'>
          <div className='col-6'>
            <button
              title="Αναφορά χρήστη"
              onClick={this.openReportModal}
              className="btn btn-sm btn-outline-danger pull-left"
            >
              <i className="fa fa-flag" />
            </button>
          </div>
          <div className='col-6'>
            <button
              title="Μπλοκάρισμα χρήστη"
              onClick={this.openBlockedUserSwal}
              className="btn btn-outline-danger btn-sm pull-right"
            >
              <i className="fa fa-ban" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  like = () => {
    const username = this.props.user.username;

    sendHeart(username)
      .then(res => {
        this.setState({heartIcon: res.heart})
      }, error => {
        this.props.dispatch(alertError(error.toString()))
      })
      .catch(error => { this.props.dispatch(alertError('Κάτι πήγε στραβά')) })
  }

  renderHeartIcon = () => {
    if(this.state.heartIcon !== null) {
      return <i className={`fa ${this.state.heartIcon} mr-1`} />
    }

    if(this.props.user.like === true) {
      return <i className="fa fa-heart mr-1" />
    } else {
      return <i className="fa fa-heart-o mr-1" />
    }
  }

  closeModal = () => {
    this.setState({
      visibleReportModal: false,
      visibleGalleryModal: false,
      visibleMessageModal: false
    });
  }

  openReportModal = (e) => {
    e.preventDefault();

    this.setState({ visibleReportModal: true });
  }

  openMessageModal = (e) => {
    e.preventDefault();

    this.setState({ visibleMessageModal: true });
  }

  openGalleryModal = (e) => {
    e.preventDefault();

    this.setState({ lightboxIsOpen: true });
  }

  openBlockedUserSwal = () => {
    this.setState({ visibleBlockedSwal: true });
  }

  renderPictureModal = () => {
    return (
      <Modal
        visible={this.state.visibleGalleryModal}
        max-width="600"
        max-height="600"
        effect="fadeInUp"
        onClickAway={() => this.closeModal()}
      >
        <div>
          <img
            className="square-picture-modal"
            alt='profile'
            src={renderImage(this.props.user.profile_picture)}
          />
        </div>
      </Modal>
    )
  }

  renderReportModal = () => {
    return (
      <ReportModal
        reportIsOpen={this.state.visibleReportModal}
        username={this.props.user.username}
        closeModal={this.closeModal}
      />
    )
  }

  renderMessageModal = () => {
    return (
      <MessageModal
        modalIsOpen={this.state.visibleMessageModal}
        username={this.props.user.username}
        profilePicture={this.props.user.profile_picture}
        closeModal={this.closeModal}
      />
    )
  }

  blockUser = () => {
    const payload = {
      username: this.props.user.username
    };

    this.props.blockUser(payload);
    this.setState({visibleBlockedSwal: false})
  }

  renderBlockedSwal = () => {
    return (
      <SweetAlert
        show={this.state.visibleBlockedSwal}
        type="warning"
        title="Αποκλεισμός χρήστη"
        text='Είστε σίγουρος/η?'
        showCancelButton={true}
        confirmButtonText="Ναί"
        cancelButtonText="Όχι"
        onConfirm={ this.blockUser }
      />
    )
  }

  render() {
    const user = this.props.user;
    const lightboxIsOpen = this.state.lightboxIsOpen;

    return(
      <div className="col-lg-3 p-4 text-center bg-white">
        { this.renderMessageModal() }
        { this.renderBlockedSwal() }
        <div className="row justify-content-center">
          <div className="gallery mt-2">
            <a href='' onClick={this.openGalleryModal} >
              <div
                className="profile-pic"
                style={{ backgroundImage: `url(${renderImage(user.profile_picture_medium)})`}}
              />
            </a>
            {lightboxIsOpen && (
              <Lightbox
                mainSrc={user.profile_picture}
                nextSrc={user.profile_picture}
                prevSrc={user.profile_picture}
                onCloseRequest={() => this.setState({ lightboxIsOpen: false })}
              />
            )}
          </div>
        </div>
        <h3 className="mt-2">
          <strong className="narrow">
            { user.username } - { user.user_detail ? user.user_detail.age : '' }
          </strong>
          { user.is_signed_in && <span className="online-now" /> }
        </h3>
        <p>
          { user.state }
        </p>
        { (this.props.currentUser.username === user.username) ?
            this.renderCurrentUserSettings() : this.renderUserSettings() }
        { this.renderPictureModal() }
        { this.renderReportModal() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.result
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ blockUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePicPanel)
