import React, { Component } from 'react';
import ContactModal from './contact_modal';

export default class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {visibleContactModal: false}
  }

  closeModal = () => {
    this.setState({visibleContactModal: false})
  }

  renderContactModal = () => {
    return (
      <ContactModal
        modalIsOpen={this.state.visibleContactModal}
        closeModal={this.closeModal}
      />
    )
  }

  openModal = (e) => {
    e.preventDefault();

    this.setState({visibleContactModal: true});
  }

  render() {
    return(
      <footer>
        <div className="container-fluid">
          { this.renderContactModal() }
          <div className="row">
            <div className="col">
              <p>
                <a href="" onClick={this.openModal}>
                  Επικοινωνία
                </a>
              </p>
            </div>
            <div className="col text-center">
              © 2016 Δικαιώματα Κardies.gr
            </div>
            <div className="col text-right">
              <a href="/terms">Όροι χρήσης</a>
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/kardies.gr"
                >
                  <i className="fa fa-facebook-square fa-2x"/>
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
