import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-awesome-modal';
import { renderImage } from '../../helpers/render_image';
import { sendMessage } from '../../redux/actions/messages';

class MessageModal extends Component {
  closeModal = () => {
    if (typeof this.props.closeModal === 'function') {
      this.props.closeModal()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let formPayload = new FormData(e.target)
    this.props.sendMessage(formPayload);

    this.props.closeModal();
  }

  render() {
    return (
      <Modal
        visible={this.props.modalIsOpen}
        width="400"
        height="300"
        effect="fadeInUp"
        onClickAway={() => this.closeModal()}
      >
        <div className="modal-title white-text-bs">
          <button
            aria-label="Close"
            className="close pull-right"
            onClick={this.closeModal}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
          <img
            src={renderImage(this.props.profilePicture)}
            alt='Profile'
            className="d-inline-block mr-2 pic-round-xs"
          />
          {this.props.username}
        </div>
        <div className="modal-body">
          <div className="form-group">
            <form onSubmit={this.handleSubmit}>
              <input
                name="recipient"
                value={this.props.username}
                type="hidden"
                />
              <textarea
                name="body"
                cols="5"
                className="form-control"
                placeholder="Γράψτε το μήνυμά σας"
                />
              <hr />
              <input
                name="commit"
                value="Αποστολή"
                className="btn btn-outline-primary float-right mb-2"
                type="submit"
              />
            </form>
          </div>
        </div>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    isSendingMessage: state.messages.isSedingMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sendMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageModal);
