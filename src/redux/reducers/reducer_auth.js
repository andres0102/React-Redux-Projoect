import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS
} from '../actions/auth';

const initialState = {
  loggingIn: false,
  loggedIn: false,
  user: {},
  signingUp: false,
  signedUp: false
}

export default (state = initialState, action) => {
  switch (action.type) {

  case LOGIN_REQUEST:
    return Object.assign({}, state, { loggingIn: true })

  case LOGIN_SUCCESS:
    return Object.assign({}, state, { loggingIn: false, loggedIn: true, user: action.payload })

  case LOGIN_FAILURE:
    return Object.assign({}, state, { loggingIn: false, loggedIn: false, user: {} })

  case LOGOUT_SUCCESS:
    return Object.assign({}, state: { loggingIn: false, loggedIn: false, user: {} })

  case SIGNUP_REQUEST:
    return Object.assign({}, state, { signingUp: true })

  case SIGNUP_SUCCESS:
    return Object.assign({}, state, { signingUp: false, signedUp: true })

  case SIGNUP_FAILURE:
    return Object.assign({}, state, { signingUp: false, signedUp: false, user: {} })

  default:
    return state;
  }
}
