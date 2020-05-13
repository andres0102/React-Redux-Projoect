import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsers } from '../../redux/actions/users';
import { clearingResults } from '../../redux/actions/search';
import Loader from 'react-loader-spinner'
import Card from './card';
import MessageModal from './message_modal';

class CardDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      modalIsOpen: false,
      user: {
        username: '',
        profile_picture: ''
      }
    };
  }

  openModal = (username, profile_picture) => {
    this.setState({ modalIsOpen: true, user: { username, profile_picture } });
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  componentDidMount() {
    this.props.getUsers();
  }

  componentWillUnmount() {
    this.props.clearingResults();
  }

  renderCard = (user) => {
    return (
      <Card
        key={user.username}
        user={user}
        openModal={this.openModal}
        clearResults={this.props.clearingResults}
      />
    );
  }

  renderEmpty = () => {
    return <p> Δοκιμάστε άλλη Αναζήτηση </p>
  }

  renderMoreButton = () => {
    if(this.props.endOfUsers) {
      return (
        <div className="row justify-content-center">
          <strong>
            Φτάσατε στο τέλος της αναζήτησης
          </strong>
        </div>
      )
    }
    return (
      <div className="row justify-content-center">
        <button
          className="button_shadow mb-3"
          onClick={this.fetchMore}
        >
          Περισσότερα...
        </button>
      </div>
    )
  }

  renderLoader = () => {
    return (
      <div className="col-12 text-center">
        <Loader type="Hearts" color="red" height={80} width={80} />
      </div>
    )
  }

  fetchMore = () => {
    let incrementPage = this.state.page + 1;

    this.setState({ page: incrementPage });
    this.props.getUsers(incrementPage);
  }

  renderUsers = () => {
    if(this.props.users === 0) {
      return this.renderEmpty()
    } else {
      return this.props.users.map(this.renderCard)
    }
  }

  renderMessageModal = () => {
    return (
      <MessageModal
        modalIsOpen={this.state.modalIsOpen}
        username={this.state.user.username}
        profilePicture={this.state.user.profile_picture}
        closeModal={this.closeModal}
      />
    )
  }

  render() {
    return (
      <div>
        { this.renderMessageModal() }
        <div id='card-deck' className="card-deck justify-content-center">
          { this.renderUsers() }
          { this.props.isFetching ? this.renderLoader() : null }
        </div>
        { this.renderMoreButton() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.results,
    isFetching: state.users.isFetching,
    endOfUsers: state.users.endOfUsers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUsers, clearingResults }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDeck);
