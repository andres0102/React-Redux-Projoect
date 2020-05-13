import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import MyProfile from './_my_profile';
import EditSettings from './_edit_settings';
import EditAboutMeSettings from './_edit_about_me_settings';
import EditEmailSettings from './_edit_email_settings';
import EditBlockedUsersSettings from './_edit_blocked_users_settings';
import EditGallerySettings from './_edit_gallery_settings';

class SettingsIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'editSettings'
    }
  }

  renderLoader = () => {
    return (
      <div className="col-12 text-center">
        <Loader type="Hearts" color="red" height={80} width={80} />
      </div>
    );
  }

  renderEditSettings = () => {
    return (
      <div className="row justify-content-center">
        <EditSettings />
      </div>
    )
  }

  renderAboutMeSettings = () => {
    return (
      <div className="row justify-content-center">
        <EditAboutMeSettings />
      </div>
    )
  }

  renderEmailSettings = () => {
    return (
      <div className="row justify-content-center">
        <EditEmailSettings />
      </div>
    )
  }

  renderGallerySettings = () => {
    return (
      <div className="row justify-content-center">
        <EditGallerySettings />
      </div>
    )
  }

  renderBlockedUsersSettings = () => {
    return (
      <div className="row justify-content-center">
        <EditBlockedUsersSettings />
      </div>
    )
  }

  handleRenderClick = (value) => {
    this.setState({selected: value})
  }

  renderSettings = () => {
    switch (this.state.selected) {
      case 'editSettings':
        return this.renderEditSettings();
      case 'editAboutMeSettings':
        return this.renderAboutMeSettings();
      case 'editEmailSettings':
        return this.renderEmailSettings();
      case 'editGallerySettings':
        return this.renderGallerySettings();
      case 'editBlockedUsersSettings':
        return this.renderBlockedUsersSettings();
      default:
        return this.renderEditSettings()
    }
  }

  render() {
    const isFetchingCurrentUser = this.props.isFetchingCurrentUser;

    return(
      <div className='container'>
        { isFetchingCurrentUser ? this.renderLoader() : null }
        <div className="row">
          <div className="col-lg-3 col-sm-12 bg-teal effect2 pt-4 px-4">
            <MyProfile currentUser={this.props.currentUser} />
            <div id="sidebar-settings">
              <ul className="row p-2">
                <div className='col-lg-12 col-md-3 p-0'>
                  <li
                    className="white-text-bs"
                    onClick={() => this.handleRenderClick('editSettings')}
                  >
                    Το προφίλ μου
                    <i className="fa fa-chevron-circle-right pull-right" />
                  </li>
                </div>
                <div className='col-lg-12 col-md-3 p-0'>
                  <li
                    className="white-text-bs"
                    onClick={() => this.handleRenderClick('editAboutMeSettings')}
                  >
                    Για μένα
                    <i className="fa fa-chevron-circle-right pull-right" />
                  </li>
                </div>
                <div className='col-lg-12 col-md-3 p-0'>
                  <li
                    className="white-text-bs"
                    onClick={() => this.handleRenderClick('editEmailSettings')}
                  >
                    Eιδοποιήσεις
                    <i className="fa fa-chevron-circle-right pull-right" />
                  </li>
                </div>
                <div className='col-lg-12 col-md-3 p-0'>
                  <li
                    className="white-text-bs"
                    onClick={() => this.handleRenderClick('editGallerySettings')}
                  >
                    Άλμπουμ
                    <i className="fa fa-chevron-circle-right pull-right" />
                  </li>
                </div>
                <div className='col-lg-12 col-md-3 p-0'>
                  <li
                    className="white-text-bs"
                    onClick={() => this.handleRenderClick('editBlockedUsersSettings')}
                  >
                    Αποκλεισμοί
                    <i className="fa fa-chevron-circle-right pull-right" />
                  </li>
                </div>
              </ul>
            </div>
          </div>
          <div className="col-lg-9 col-sm-12 bg-white effect2">
            { this.renderSettings() }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.result,
    isFetchingCurrentUser: state.currentUser.isFetchingCurrentUser
  };
}

export default connect(mapStateToProps, null)(SettingsIndex);
