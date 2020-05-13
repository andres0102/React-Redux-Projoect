import React, { Component, Fragment } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./private_route";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../stylesheets/application.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from '../helpers/history';
import { alertClear } from '../redux/actions/alerts';
import { ActionCableProvider } from 'react-actioncable-provider';
import { accessToken } from '../helpers/access_token';
import SettingsIndex from './settings/settings_index';
import UsersIndex from './users/users_index';
import KardiesIndex from './kardies/kardies_index';
import PersonalityIndex from './personality/personality_index';
import ConversationsIndex from './conversations/conversations_index';
import UserProfile from './users/user/profile';
import NavBar from './nav_bar';
import Home from './home/home_index';
import Login from './home/login';
import SignUp from './home/sign_up';
import MainPageLoader from './main_page_loader';
import PasswordReset from './home/password_reset';
import AccountConfirmation from './home/account_confirmation';
import terms from './home/terms';
import { ActionCable } from 'react-actioncable-provider';
import NoMatch from './home/no_match';

class App extends Component {
  constructor(props) {
    super(props)

    history.listen((location, action) => {
      this.props.alertClear();
    });

    this.state = { loading: true }
  }

  componentDidMount = () => {
    this.setState({ loading: false });
  }

  cableUrl = () => {
    const token = accessToken();
    return `${process.env.REACT_APP_CABLE_URL}/cable?token=${token}`;
  }

  render() {
    const { alerts } = this.props;
    alerts.message && toast(alerts.message);

    return(
      <Fragment>
        { this.state.loading ?
          <MainPageLoader /> :
          <Fragment>
            <ToastContainer />
            <Router history={history}>
              <Fragment>
                { localStorage.getItem('user') ? <NavBar /> : null }
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/sign_up" component={SignUp} />
                  <Route path="/password_reset" component={PasswordReset} />
                  <Route path="/confirmation" component={AccountConfirmation} />
                  <Route path="/terms" component={terms} />
                  <ActionCableProvider url={this.cableUrl()}>
                    <ActionCable channel={{ channel: 'OnlineStatusChannel' }} />
                    <PrivateRoute exact path="/users" component={UsersIndex} />
                    <PrivateRoute
                      exact path="/users/:username"
                      component={UserProfile}
                    />
                    <PrivateRoute exact path="/likes" component={KardiesIndex} />
                    <PrivateRoute
                      exact path="/personality"
                      component={PersonalityIndex}
                    />
                    <PrivateRoute
                      exact path="/conversations"
                      component={ConversationsIndex}
                    />
                    <PrivateRoute
                      exact path="/settings"
                      component={SettingsIndex}
                    />
                  </ActionCableProvider>
                  <Route component={NoMatch} />
                </Switch>
              </Fragment>
            </Router>
          </Fragment>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = ({ alerts }) => {
  return { alerts };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ alertClear }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
