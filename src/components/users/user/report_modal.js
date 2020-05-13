import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-awesome-modal';
import { reportUser } from '../../../redux/actions/users';

class ReportModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reason: '',
      description: ''
    }
  }

  closeModal = () => {
    if (typeof this.props.closeModal === 'function') {
      this.props.closeModal()
    }
  }

  handleChange = (e) => {
    const field = e.target.name;

    this.setState({ [field]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const formPayload = {
      username: this.props.username,
      reason: this.state.reason,
      description: this.state.description
    };

    this.props.reportUser(formPayload);

    this.props.closeModal();
  }

  render() {
    return (
      <Modal
        visible={this.props.reportIsOpen}
        max-width="600"
        height="400"
        effect="fadeInUp"
        onClickAway={() => this.closeModal()}
      >
        <div className="modal-title" id="reportModal">
          <h5 className="d-inline-block">
            Αναφορά: {this.props.username}
          </h5>
          <button
            className="d-inline-block close pull-right"
            onClick={this.closeModal}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>
            Υπάρχει ακατάλληλη φωτογραφία? Ψεύτικο προφίλ? Προσβλητικά μηνύματα?
          </p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                name="reason"
                value={this.state.reason}
                className="form-control form-control-lg"
                onChange={this.handleChange}
                placeholder="Αιτία"
                type="text"
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                cols="5"
                className="form-control form-control-lg"
                placeholder="Λεπτομέρειες"
              />
            </div>
            <hr />
            <div className="form-group col-md-4 offset-md-4">
              <button
                className="btn btn-outline-secondary btn-block"
                type="submit"
              >
                <i className="fa fa-send" />
              </button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ reportUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(ReportModal);
