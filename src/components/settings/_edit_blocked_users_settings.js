import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBlockedUsers, removeBlockedUser } from '../../redux/actions/blocked_users';
import { renderImage } from '../../helpers/render_image';
import SweetAlert from 'sweetalert2-react';
import Loader from 'react-loader-spinner'
import PageLoader from '../page_loader';

class EditBlockedUsersSettings extends Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false, selectedUser: '' }
  }

  componentDidMount() {
    this.props.getBlockedUsers();
  }

  handleClick = (username) => (e) => {
    e.preventDefault();

    this.setState({isOpen: true, selectedUser: username})
  }

  renderPicture = (object) => {
    return (
      <a
        href=''
        key={object.user.username}
        onClick={this.handleClick(object.user.username)}
      >
        <div
          title={object.user.username}
          className="d-inline-block profile-pic-round-sm m-2"
          style={{
            border: '1px solid black',
            backgroundImage: `url(${renderImage(object.user.profile_picture_thumb)})`
          }}
        />
      </a>
    )
  }

  renderPictures = () => {
    const blockedUsers = this.props.blockedUsers;

    return blockedUsers.map(this.renderPicture)
  }

  removeBlockedUserSubmit = () => {
    const payload = {
      username: this.state.selectedUser
    };

    this.props.removeBlockedUser(payload);
    this.setState({ selectedUser: '', isOpen: false })
  }

  renderLoader = () => {
    return (
      <div className="col-12 text-center">
        <Loader type="Hearts" color="red" height={80} width={80} />
      </div>
    )
  }

  renderSwal = () => {
    return (
      <SweetAlert
        show={this.state.isOpen}
        type="warning"
        title="Αφαίρεση αποκλεισμού"
        text='Είστε σίγουρος/η?'
        showCancelButton={true}
        confirmButtonText="Ναί"
        cancelButtonText="Όχι"
        onConfirm={this.removeBlockedUserSubmit}
      />
    )
  }

  render() {
    return(
      <div className="col-12 p-4">
        { this.props.isDeletingBlockedUser ? <PageLoader /> : null }
        <div className="dark-gray-text">
          <h2 className="mb-4 pull-left">Αποκλεισμένοι χρήστες</h2>
        </div>
        <div className="clearfix" />
        <hr className="colorgraph" />
        { this.renderSwal() }
        { this.props.isFetchingBlockedUsers ?
          this.renderLoader() :
          this.renderPictures() }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      removeBlockedUser,
      getBlockedUsers
    }, dispatch)
  };
}

const mapStateToProps = (state) => {
  return {
    blockedUsers: state.blocked_users.result,
    isFetchingBlockedUsers: state.blocked_users.isFetchingBlockedUsers,
    isDeletingBlockedUser: state.blocked_users.isDeletingBlockedUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBlockedUsersSettings);
