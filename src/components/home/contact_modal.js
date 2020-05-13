import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-awesome-modal';
import ReCAPTCHA from "react-google-recaptcha";
import { contactDetails } from '../../redux/actions/users';

class ContactModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      subject: '',
      description: '',
      recaptcha_value: ''
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

  clearFormValues = () => {
    this.setState({
      name: '',
      email: '',
      subject: '',
      description: ''
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.contactDetails(this.state);
    this.clearFormValues();
    this.props.closeModal();
  }

  onCaptchaChange = (value) => {
    this.setState({recaptcha_value: value})
  }

  render() {
    return (
      <Modal
        visible={this.props.modalIsOpen}
        max-width="600"
        height="580"
        effect="fadeInUp"
        onClickAway={() => this.closeModal()}
      >
        <div className="modal-title" id="contactModal">
          <h5 className="d-inline-block">
            Επικοινωνία
          </h5>
          <button
            className="d-inline-block close pull-right"
            onClick={this.closeModal}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
          <p>
            Για οποιαδήποτε ερώτηση, μην διστάσετε να επικοινωνήσετε μαζί μας.
          </p>
        </div>
        <div className="modal-body">
          <form onSubmit={this.handleSubmit} id="contact-form">
            <div className="form-group">
              <input
                name="name"
                value={this.state.name}
                className="form-control form-control-lg"
                onChange={this.handleChange}
                placeholder="* Όνομα"
                type="text"
              />
            </div>
            <div className="form-group">
              <input
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="form-control form-control-lg"
                placeholder="* Email"
                type="email"
              />
            </div>
            <div className="form-group">
              <input
                name="subject"
                value={this.state.subject}
                onChange={this.handleChange}
                className="form-control form-control-lg"
                placeholder="* Θέμα"
                type="text"
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                cols="4"
                className="form-control form-control-lg"
                placeholder="* Λεπτομέρειες"
              />
            </div>
            <div className="form-group">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                onChange={this.onCaptchaChange}
              />
            </div>
            <hr />
            {
              this.state.recaptcha_value !== '' &&
              <div className="form-group col-md-4 offset-md-4">
                <button
                  className="btn btn-outline-secondary btn-block"
                  type="submit"

                >
                  <i className="fa fa-send" />
                </button>
              </div>
            }
          </form>
        </div>
      </Modal>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ contactDetails }, dispatch);
}

export default connect(null, mapDispatchToProps)(ContactModal);
