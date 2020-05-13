import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStates } from '../../redux/actions/states';
import { editSettings, deleteAccount } from '../../redux/actions/settings';
import PageLoader from '../page_loader';
import SweetAlert from 'sweetalert2-react';
import ImageUploader from 'react-images-upload';

class EditSettings extends Component {
  constructor(props) {
    super(props)

    const currentUser = this.props.currentUser;

    this.state = {
      ages: [],
      password: '',
      passwordConfirmation: '',
      profile_picture: currentUser.profile_picture,
      username: currentUser.username,
      userDetailId: currentUser.user_detail.id,
      email: currentUser.email,
      gender: currentUser.user_detail.gender,
      age: currentUser.user_detail.age,
      state: currentUser.user_detail.state,
      visibleSwal: false
    }
  }

  componentDidMount() {
    this.props.getStates();

    this.setState({ ages: this.agesList() })
  }

  agesList = () => {
    const list = [];
    for (let i = 18; i <= 99; i++) {
      list.push(i);
    }
    return list
  }

  onDrop = (picture) => {
    this.setState({profile_picture: picture[0]});
  }

  renderPlaces = (state) => {
    return <option key={state[1]} value={state[1]}> {state[0]} </option>
  }

  renderLoader = () => {
    return <option>Loading...</option>
  }

  renderAges = (age) => {
    return <option key={age} value={age}>{age}</option>
  }

  handleUsernameChange = (e) => {
    const username = e.target.value
    return this.setState({username});
  }

  handleEmailChange = (e) => {
    const email = e.target.value
    return this.setState({email});
  }

  handleAgeChange = (e) => {
    const age = e.target.value
    return this.setState({age});
  }

  handleGenderChange = (e) => {
    const gender = e.target.value
    return this.setState({gender});
  }

  handleStateChange = (e) => {
    const state = e.target.value
    return this.setState({state});
  }

  handlePasswordChange = (e) => {
    const password = e.target.value
    return this.setState({password});
  }

  handlePasswordConfirmationChange = (e) => {
    const passwordConfirmation = e.target.value
    return this.setState({ passwordConfirmation });
  }

  renderDeleteAccSwal = () => {
    return (
      <SweetAlert
        show={this.state.visibleSwal}
        type="warning"
        title="Διαγραφή λογαριασμού"
        text='Ο λογαριασμός θα διαγραφεί ολοκληρωτικά, είστε σίγουρος/η;'
        showCancelButton={true}
        confirmButtonText="Ναί"
        cancelButtonText="Όχι"
        onConfirm={this.deleteAccount}
      />
    )
  }

  deleteAccount = () => {
    this.props.deleteAccount();
    this.setState({ visibleSwal: false })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let formPayload = new FormData(event.target);

    if(this.state.password === '' && this.state.passwordConfirmation === '') {
      formPayload.delete("user[password]")
      formPayload.delete("user[password_confirmation]")
    }

    formPayload.append('profile_picture', this.state.profile_picture);

    this.props.editSettings(formPayload);
  }

  render() {
    const warningString = "Έως 5 ΜΒ. Επιτρεπόμενα αρχεία: (.jpg | .png | .gif)"

    return(
      <div className="col p-4">
        { this.props.isEditingSettings ? <PageLoader /> : null }
        <div className="dark-gray-text">
          <h2 className="pull-left">Το προφίλ μου</h2>
        </div>
        <div className="clearfix" />
        <form onSubmit={this.handleSubmit}>
          <hr className="colorgraph" />

          <input
            className="form-control form-control-lg"
            value={this.state.userDetailId}
            name="user[user_detail_attributes][id]"
            type="hidden"
          />

          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <ImageUploader
                  withIcon={true}
                  withPreview={true}
                  singleImage={true}
                  label={warningString}
                  buttonText='Αλλαγή φωτογραφίας προφίλ'
                  buttonType='button'
                  onChange={this.onDrop}
                  name='user[user_detail_attributes][profile_picture]'
                  imgExtension={['.jpg', '.gif', '.png']}
                  maxFileSize={5242880}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-5 col-md-5">
              <strong className="pull-right">Νομός</strong>
            </div>
            <div className="col-xs-12 col-sm-7 col-md-7">
              <div className="form-group">
                <select
                  className="form-control custom-select form-control-lg"
                  name="user[user_detail_attributes][state]"
                  value={this.state.state}
                  onChange={this.handleStateChange}
                >
                  { this.props.states.isFetching ? this.renderLoader() :
                    this.props.states.allStates.map(this.renderPlaces) }
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-5 col-md-5">
              <strong className="pull-right">Φύλο</strong>
            </div>
            <div className="col-xs-12 col-sm-7 col-md-7">
              <div className="form-group">
                <select
                  className="form-control custom-select form-control-lg"
                  name="user[user_detail_attributes][gender]"
                  value={this.state.gender}
                  onChange={this.handleGenderChange}
                >
                  <option value="male">Άντρας</option>
                  <option value="female">Γυναίκα</option>
                  <option value="other">Άλλο</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-5 col-md-5">
            <strong className="pull-right">Ηλικία</strong>
            </div>
            <div className="col-xs-12 col-sm-7 col-md-7">
              <div className="form-group">
                <select
                  className="form-control custom-select form-control-lg"
                  name="user[user_detail_attributes][age]"
                  value={this.state.age}
                  onChange={this.handleAgeChange}
                >
                  { this.state.ages.map(this.renderAges) }
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-5 col-md-5">
              <strong className="pull-right">Ψευδώνυμο</strong>
            </div>
            <div className="col-xs-12 col-sm-7 col-md-7">
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                  name="user[username]"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-5 col-md-5">
              <strong className="pull-right">Email</strong>
            </div>
            <div className="col-xs-12 col-sm-7 col-md-7">
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  name="user[email]"
                  type="email"
                />
              </div>
            </div>
          </div>
          <hr />

          <a>
            <strong>
              Αλλαγή κωδικού
              <i className="fa fa-plus ml-1" />
            </strong>
          </a>

          <div className="form-group row">
            <div className="col-sm-6">
              <label>Νέος κωδικός</label>
              <input
                className="form-control"
                name="user[password]"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                type="password"
              />
            </div>
            <div className="col-sm-6">
              <label>Επαλήθευση νέου κωδικού</label>
              <input
                className="form-control"
                name="user[password_confirmation]"
                value={this.state.passwordConfirmation}
                onChange={this.handlePasswordConfirmationChange}
                type="password"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <button
                className="btn btn-primary btn-block"
                type="submit"
              >
                Αποθήκευση
              </button>
            </div>
          </div>
        </form>
        { this.renderDeleteAccSwal() }
        <div className="row">
          <div className="col-sm-6 mt-4">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => this.setState({visibleSwal: true})}
            >
              Διαφραφή λογαριασμού
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      getStates,
      editSettings,
      deleteAccount
    }, dispatch)
  };
}

const mapStateToProps = (state) => {
  return {
    states: state.states,
    currentUser: state.currentUser.result,
    isEditingSettings: state.settings.isEditingSettings
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSettings);
