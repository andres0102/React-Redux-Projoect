import fetch from 'cross-fetch';
import { requestHeader } from '../../helpers/auth_header';
import { handleResponse } from '../../helpers/handle_response';
import { alertError } from './alerts';

export const FETCHING_CURRENT_USER = 'FETCHING CURRENT USER';
export const FETCHED_CURRENT_USER = 'FETCHED CURRENT USER';

export const fetchedCurrentUser = (user) => {
  return {
    type: FETCHED_CURRENT_USER,
    payload: user
  }
}

const fetchingCurrentUser = () => {
  return {
    type: FETCHING_CURRENT_USER
  }
}

export const getCurrentUser = () => {
  let headers = requestHeader();

  return (dispatch) => {
    dispatch(fetchingCurrentUser());
    fetch(`${process.env.REACT_APP_API_URL}/api/me`, {
      headers: headers
    })
    .then(handleResponse)
    .then(current_user => {
      dispatch(fetchedCurrentUser(current_user))
    })
    .catch(error => {
      dispatch(alertError(error.toString()))
    })
  }
}
