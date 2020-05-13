import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, facebookLogin } from '../../redux/actions/auth';
import { history } from '../../helpers/history'
import PageLoader from '../page_loader';
import logo from '../../images/kardies-logo-original.png';
import background from '../../images/hands_bg.jpg';
import FbLoginButton from './fb_login_button';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      credentials: {
        email: '',
        password: '',
        grant_type: 'password'
      }
    }
  }

  componentDidMount() {
    if(localStorage.getItem('user')) {
      history.push('/users');
    };
  }

  handleChange = (event) => {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;

    return this.setState({credentials});
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.login(this.state.credentials)
  }

  responseFacebook = (response) => {
    this.props.facebookLogin(response);
  }

  render() {
    return(
      <div id="bg" style={{ backgroundImage: `url(${background})` }}>
        { this.props.loggingIn ? <PageLoader /> : null }
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
            <div className="col-sm-12 col-md-6 col-lg-4 light-grey-bg p-4 effect1 m-4">
              <form className="new_user" onSubmit={this.handleSubmit}>
                <h1 className="text-center">Σύνδεση</h1>
                <hr className="colorgraph" />
                <div className="form-group">
                  <input
                    autoFocus="autofocus"
                    className="form-control form-control-lg"
                    name="email"
                    placeholder="Email"
                    value={this.state.credentials.email}
                    type="email"
                    onChange={this.handleChange}
                   />
                </div>
                <div className="form-group">
                  <input
                    autoComplete="off"
                    className="form-control form-control-lg"
                    name="password"
                    placeholder="Κωδικός"
                    size='metro'
                    value={this.state.credentials.password}
                    onChange={this.handleChange}
                    type="password"
                  />
                </div>
                <hr className="colorgraph" />
                <div className="form-group">
                  <input
                    name="commit"
                    value="Σύνδεση"
                    className="btn btn-success btn-lg btn-block white-text-bs"
                    type="submit"
                  />
                  <p className="home-p text-center">
                    <a href="/password_reset">Ξεχάσατε τον κωδικό σας?</a>
                  </p>
                </div>
                <div className="form-group">
                  <FbLoginButton responseFacebook={this.responseFacebook} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggingIn: state.auth.loggingIn
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, facebookLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
