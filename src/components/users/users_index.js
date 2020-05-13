import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CardDeck from './card_deck';
import Search from './search';
import { getCurrentUser } from '../../redux/actions/current_user';

class UsersIndex extends Component {
  componentDidMount() {
    this.props.getCurrentUser()
  }

  render() {
    return(
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <Search />
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <CardDeck />
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCurrentUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(UsersIndex);
