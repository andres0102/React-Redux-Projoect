import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader-spinner'
import { getUser } from '../../../redux/actions/users';
import { clearingResults } from '../../../redux/actions/search';
import ProfilePicPanel from './_profile_pic_panel';
import DetailsPanel from './_details_panel';
import PersonalityPanel from './_personality_panel';
import GalleryPanel from './_gallery_panel';

class UserProfile extends Component {
  componentDidMount() {
    let username = this.props.match.params.username;
    this.props.getUser(username);
  }

  componentWillUnmount() {
    this.props.clearingResults();
  }

  renderProfilePicPanel = () => {
    return (
      <ProfilePicPanel user={this.props.user} />
    )
  }

  renderDetailsPanel = () => {
    const about = this.props.user.about;

    return (
      <DetailsPanel about={about} />
    )
  }

  renderPersonalityPanel = () => {
    const userDetail = this.props.user.user_detail;

    return (
      <PersonalityPanel userDetail={userDetail} />
    )
  }

  renderGalleryPanel = () => {
    return <GalleryPanel user={this.props.user} />
  }

  renderLoader = () => {
    return (
      <div className="row">
        <div className="col-12 text-center">
          <Loader type="Hearts" color="red" height={80} width={80} />
        </div>
      </div>
    )
  }

  render() {
    return(
      <div className='container-fluid'>
        { this.props.loading ? this.renderLoader() :
          <span>
            <div className="row mt-2">
              { this.renderProfilePicPanel() }
              { this.renderDetailsPanel() }
              { this.renderPersonalityPanel() }
            </div>
            <div className="row">
              { this.renderGalleryPanel() }
            </div>
          </span>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.users.user,
    loading: state.users.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUser, clearingResults }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
