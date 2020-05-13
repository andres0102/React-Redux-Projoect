import fetch from 'cross-fetch';
import { fetchedResults, fetchingResults } from './search';
import { requestHeader } from '../../helpers/auth_header';
import { handleResponse } from '../../helpers/handle_response';
import { history } from '../../helpers/history';
import { alertError, alertSuccess } from './alerts';

export const FETCHED_USER = 'FETCHED USER';
export const END_OF_USERS = 'END OF USERS';

export const fetchedUser = (user) => {
  return {
    type: FETCHED_USER,
    payload: user
  }
}

const endOfUsers = () => {
  return {
    type: END_OF_USERS
  }
}

export const getUser = (userName) => {
  let headers = requestHeader();
  let user_url = `${process.env.REACT_APP_API_URL}/api/users/${userName}`

  return (dispatch) => {
    dispatch(fetchingResults())
    fetch(user_url, { headers: headers })
    .then(handleResponse)
    .then(user => { dispatch(fetchedUser(user)) })
    .catch(error => {
      history.push('/users')
      dispatch(alertError(error.toString()))
    })
  }
}

export const getUsers = (page = 1) => {
  let headers = requestHeader();
  let users_url = `${process.env.REACT_APP_API_URL}/api/users?page=${page}`;

  return (dispatch) => {
    dispatch(fetchingResults())
    fetch(users_url, {
        headers: headers
      }
    )
    .then(response => handleResponse(response))
    .then(users => {
      if(users.length === 0) {
        dispatch(endOfUsers())
      } else {
        dispatch(fetchedResults(users))
      }
    })
    .catch(error => {
      dispatch(alertError(error.toString()))
    })
  }
}

export const reportUser = (data) => {
  let headers = requestHeader();
  let reports_url = `${process.env.REACT_APP_API_URL}/api/reports`;

  return (dispatch) => {
    fetch(reports_url, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(data)
      }
    )
    .then(handleResponse)
    .then(report => {
      dispatch(alertSuccess('Η αναφορά εστάλει επιτυχώς'))
    })
    .catch(error => {
      dispatch(alertError(error.toString()))
    })
  }
}

export const blockUser = (data) => {
  let headers = requestHeader();
  let blocked_users_url = `${process.env.REACT_APP_API_URL}/api/blocked_users`;

  return (dispatch) => {
    fetch(blocked_users_url, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(data)
      }
    )
    .then(handleResponse)
    .then(() => {
      dispatch(alertSuccess('Ο χρήστης αποκλείστηκε επιτυχώς'))
    })
    .catch(error => {
      dispatch(alertError(error.toString()))
    })
  }
}

export const contactDetails = (data) => {
  let headers = requestHeader();
  let contactDetailsUrl = `${process.env.REACT_APP_API_URL}/api/contacts`;

  return (dispatch) => {
    fetch(contactDetailsUrl, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(data)
      }
    )
    .then(handleResponse)
    .then(response => {
      dispatch(alertSuccess(response.message))
    })
    .catch(error => {
      dispatch(alertError(error.toString()))
    })
  }
}
