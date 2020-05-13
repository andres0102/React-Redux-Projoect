import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { passwordReset, passwordResetSubmit, facebookLogin } from '../../redux/actions/auth';
import logo from '../../images/kardies-logo-original.png';
import background from '../../images/hands_bg.jpg';
import FbLoginButton from './fb_login_button';
var qs = require('qs');

class PasswordReset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: {
        email: ''
      },
      credentials: {
        password: '',
        password_confirmation: '',
        reset_password_token: ''
      }
    }
  }

  componentDidMount = () => {
    if(this.props.location.search) {
      const values = qs.parse(this.props.location.search.slice(1));

      const credentials = this.state.credentials;
      credentials['reset_password_token'] = values.reset_password_token;

      this.setState({credentials});
    };
  }

  componentWillUnMount = () => {
    const credentials = this.state.credentials;
    credentials['reset_password_token'] = '';

    this.setState({credentials});
  }

  handleChange = (event) => {
    const field = event.target.name;
    const details = this.state.details;
    details[field] = event.target.value;

    return this.setState({details});
  }

  handleResetChange = (event) => {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;

    return this.setState({credentials});
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.passwordReset(this.state.details)
  }

  handleResetSubmit = (event) => {
    event.preventDefault()
    this.props.passwordResetSubmit(this.state.credentials)
  }

  responseFacebook = (response) => {
    this.props.facebookLogin(response);
  }

  renderEmailForm = () => {
    return (
      <Fragment>
        <form className="new_user" onSubmit={this.handleSubmit}>
          <h3 className="text-center">Ξεχάσατε τον κωδικό σας?</h3>
          <hr className="colorgraph" />
          <div className="form-group">
            <input
              autoFocus="autofocus"
              className="form-control form-control-lg"
              name="email"
              placeholder="Email"
              value={this.state.details.email}
              type="email"
              onChange={this.handleChange}
             />
          </div>
          <hr className="colorgraph" />
          <div className="form-group">
            <input
              name="commit"
              value="Αποστολή οδηγιών"
              className="btn btn-success btn-lg btn-block white-text-bs"
              type="submit"
            />
          </div>
        </form>
        <div className="form-group">
          <FbLoginButton responseFacebook={this.responseFacebook} />
        </div>
      </Fragment>
    )
  }

  renderResetForm = () => {
    return (
      <form className='text-center' onSubmit={this.handleResetSubmit}>
        <h3>Αλλαγή κωδικού</h3>
        <hr className="colorgraph" />
        <small>
          Ο κωδικός πρέπει να είναι 6 χαρακτήρες τουλάχιστον
        </small>
        <div className="form-group">
          <input
            placeholder="Νέος κωδικός"
            className="form-control"
            value={this.state.credentials.password}
            onChange={this.handleResetChange}
            name="password"
            type="password"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Νέος κωδικός επανάληψη"
            className="form-control"
            value={this.state.credentials.password_confirmation}
            onChange={this.handleResetChange}
            name="password_confirmation"
            type="password"
          />
        </div>
        <div className="form-group">
          <input
            name="commit"
            value="Αλλαγή κωδικού"
            className="btn btn-primary btn-small btn-block"
            type="submit"
          />
        </div>
      </form>

    )
  }

  render() {
    return(
      <div id="bg" style={{ backgroundImage: `url(${background})` }}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <a className="mt-4" href="/">
              <img className="logo"
                src={logo}
                alt="Kardies logo original"
              />
            </a>
          </div>
          <div className="row justify-content-center">
            <div className="col-xs-12 col-sm-8 col-md-4 light-grey-bg p-4 effect1 m-4">
              { this.state.credentials.reset_password_token === '' ?
                this.renderEmailForm() :
                this.renderResetForm() }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ passwordReset, passwordResetSubmit, facebookLogin }, dispatch);
}

export default connect(null, mapDispatchToProps)(PasswordReset);
