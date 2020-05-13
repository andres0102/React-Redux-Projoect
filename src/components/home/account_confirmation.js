import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { confirmAccount } from '../../redux/actions/auth';
import { history } from '../../helpers/history';
var qs = require('qs');

class AccountConfirmation extends Component {
  componentDidMount = () => {
    if(this.props.location.search) {
      const values = qs.parse(this.props.location.search.slice(1));

      const confirmation_token = values.confirmation_token;

      this.props.confirmAccount(confirmation_token);
    } else {
      history.push('/');
    }
  }

  render() {
    return <div></div>
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ confirmAccount }, dispatch);
}

export default connect(null, mapDispatchToProps)(AccountConfirmation);
