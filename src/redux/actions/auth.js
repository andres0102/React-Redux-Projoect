import { authService } from '../../services/auth_service'
import { alertError, alertSuccess } from './alerts'
import { history } from '../../helpers/history'

export const LOGIN_REQUEST = 'LOGIN REQUEST';
export const LOGIN_SUCCESS = 'LOGIN SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT SUCCESS';
export const LOGIN_FAILURE = 'LOGIN FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP FAILURE';

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  }
}

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  }
}

export const loginFailure = () => {
  return {
    type: LOGIN_FAILURE
  }
}

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST
  }
}

export const signupFailure = () => {
  return {
    type: SIGNUP_FAILURE
  }
}

export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS
  }
}

export const login = (creds) => {
  return (dispatch) => {
    dispatch(loginRequest());
    authService.login(creds)
      .then(
        user => {
          dispatch(loginSuccess(user));
          history.push('/users');
          dispatch(alertSuccess('Καλώς ήλθατε'));
        },
        error => {
          dispatch(loginFailure(error.toString()));
          dispatch(alertError(error.toString()));
        }
      )
  }
}

export const facebookLogin = (creds) => {
  return (dispatch) => {
    dispatch(loginRequest());
    authService.facebookLogin(creds)
      .then(
        user => {
          dispatch(loginSuccess(user));
          history.push('/users');
          dispatch(alertSuccess('Καλώς ήλθατε'));
        },
        error => {
          dispatch(loginFailure(error.toString()));
          dispatch(alertError(error.toString()));
        }
      )
  }
}

export const signup = (creds) => {
  return (dispatch) => {
    dispatch(signupRequest());
    authService.signup(creds)
      .then(
        user => {
          dispatch(signupSuccess());
          history.push('/');
          dispatch(alertSuccess('Σε μερικά λεπτά θα λάβετε οδηγίες ενεργοποίησης λογαριασμού στο email σας'));
        },
        error => {
          let errors = [];
          for (var key in error) {
            errors.push(`${error[key][0]}`)
          }
          dispatch(signupFailure());
          dispatch(alertError(errors[0].toString()));
        }
      );
  }
}

export const passwordReset = (creds) => {
  return (dispatch) => {
    authService.passwordReset(creds)
      .then(
        response => {
          history.push('/');
          dispatch(alertSuccess(response.message));
        },
        error => {
          dispatch(alertError(error.toString()));
        }
      );
  }
}

export const passwordResetSubmit = (creds) => {
  return (dispatch) => {
    authService.passwordResetSubmit(creds)
      .then(
        response => {
          history.push('/login');
          dispatch(alertSuccess(response.message));
        },
        error => {
          dispatch(alertError(error.toString()));
        }
      );
  }
}

export const confirmAccount = (token) => {
  return (dispatch) => {
    authService.confirmAccount(token)
      .then(
        response => {
          history.push('/login');
          dispatch(alertSuccess(response.message));
        },
        error => {
          history.push('/');
          dispatch(alertError(error.toString()));
        }
      );
  }
}

export const logout = () => {
  return (dispatch) => {
    authService.logout();
    history.push('/');
    dispatch(logoutSuccess());
  }
}
