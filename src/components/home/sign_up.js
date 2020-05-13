import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signup, facebookLogin } from '../../redux/actions/auth';
import { getStates } from '../../redux/actions/states';
import logo from '../../images/kardies-logo-original.png';
import background from '../../images/hands_bg.jpg';
import ImageUploader from 'react-images-upload';
import PageLoader from '../page_loader';
import FbLoginButton from './fb_login_button';
import { history } from '../../helpers/history';

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile_picture: "",
      ages: []
    }
  }

  onDrop = (picture) => {
    this.setState({profile_picture: picture[0]});
  }

  agesList = () => {
    const list = [];
    for (let i = 18; i <= 99; i++) {
      list.push(i);
    }
    return list
  }

  componentDidMount() {
    if(localStorage.getItem('user')) {
      history.push('/users');
    }

    this.props.getStates()
    const agesList = this.agesList();
    this.setState({ ages: agesList })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let formPayload = new FormData(event.target);
    formPayload.append('profile_picture', this.state.profile_picture)

    this.props.signup(formPayload)
  }

  renderPlaces = (state) => {
    return <option key={state[1]} value={state[1]}> {state[0]} </option>
  }

  renderLoader = () => {
    return <option>Loading...</option>
  }

  renderAges = (age) => {
    return <option key={age} value={age}> {age} </option>
  }

  responseFacebook = (response) => {
    this.props.facebookLogin(response);
  }

  render() {
    const warningString = "Έως 5 ΜΒ. Επιτρεπόμενα αρχεία: (.jpg | .png | .gif)"

    return(
      <div id="bg" style={{ backgroundImage: `url(${background})` }}>
        { this.props.auth.signingUp ? <PageLoader /> : null }
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
            <div className="col-xs-12 col-sm-8 col-md-6 light-grey-bg p-4 effect1 m-4">
              <form onSubmit={this.handleSubmit}>
                <h1 className="text-center"> Φόρμα εγγραφής </h1>
                <hr className="colorgraph" />
                <div className="form-group">
                  <ImageUploader
                    withIcon={true}
                    withPreview={true}
                    singleImage={true}
                    label={warningString}
                    buttonText='Επιλογή φωτογραφίας προφίλ'
                    buttonType='button'
                    onChange={this.onDrop}
                    name='user[user_detail_attributes][profile_picture]'
                    imgExtension={['.jpg', '.gif', '.png']}
                    maxFileSize={5242880}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control custom-select form-control-lg"
                    name="user[user_detail_attributes][state]"
                  >
                    <option value="">Επιλέξτε νομό</option>
                    { this.props.states.isFetching ? this.renderLoader() :
                      this.props.states.allStates.map(this.renderPlaces) }
                  </select>
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Ψευδώνυμο"
                    name="user[username]"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Email"
                    name="user[email]"
                    type="email"
                  />
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-6 col-md-6">
                    <div className="form-group">
                      <select
                        className="form-control custom-select form-control-lg"
                        name="user[user_detail_attributes][gender]"
                      >
                        <option value="">Φύλο</option>
                        <option value="male">Άντρας</option>
                        <option value="female">Γυναίκα</option>
                        <option value="other">Άλλο</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-6">
                    <div className="form-group">
                      <select
                        className="form-control custom-select form-control-lg"
                        name="user[user_detail_attributes][age]"
                      >
                        <option value="">Ηλικία</option>
                        { this.state.ages.map(this.renderAges) }
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Κωδικός"
                    name="user[password]"
                    type="password"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Επαλήθευση κωδικού"
                    name="user[password_confirmation]"
                    type="password"
                  />
                </div>
                <hr className="colorgraph" />
                <div className="form-group">
                  <input
                    name="commit"
                    value="Εγγραφή"
                    className="btn btn-success btn-lg btn-block white-text-bs"
                    type="submit"
                  />
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

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      getStates,
      signup,
      facebookLogin
    }, dispatch)
  };
}

const mapStateToProps = ({ states, auth }) => {
  return { states, auth };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
