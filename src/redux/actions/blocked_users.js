import fetch from 'cross-fetch';
import { requestHeader } from '../../helpers/auth_header';
import { handleResponse } from '../../helpers/handle_response';
import { alertError, alertSuccess } from './alerts';

export const FETCHING_BLOCKED_USERS = 'FETCHING BLOCKED USERS';
export const FETCHED_BLOCKED_USERS = 'FETCHED BLOCKED USERS';
export const REMOVING_BLOCKED_USER = 'REMOVING BLOCKED USER';
export const REMOVED_BLOCKED_USER = 'REMOVED BLOCKED USER';

const fetchingBlockedUsers = () => {
  return {
    type: FETCHING_BLOCKED_USERS
  }
}

const fetchedBlockedUsers = (users) => {
  return {
    type: FETCHED_BLOCKED_USERS,
    payload: users
  }
}

const removingBlockedUser = () => {
  return {
    type: REMOVING_BLOCKED_USER
  }
}

const removedBlockedUser = (user) => {
  return {
    type: REMOVED_BLOCKED_USER,
    payload: user
  }
}

export const getBlockedUsers = () => {
  let headers = requestHeader();
  const getBlockedUsersUrl = `${process.env.REACT_APP_API_URL}/api/blocked_users`;

  return (dispatch) => {
    dispatch(fetchingBlockedUsers());
    fetch(getBlockedUsersUrl, {
        headers: headers
      }
    )
    .then(handleResponse)
    .then(users => {
      dispatch(fetchedBlockedUsers(users));
    })
    .catch(error => {
      dispatch(alertError(error.toString()))
    })
  }
}

export const removeBlockedUser = (user) => {
  let headers = requestHeader();
  const removeBlockedUsersUrl = `${process.env.REACT_APP_API_URL}/api/blocked_users`;

  return (dispatch) => {
    dispatch(removingBlockedUser());
    fetch(removeBlockedUsersUrl, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(user)
      }
    )
    .then(handleResponse)
    .then(user => {
      dispatch(alertSuccess('Ο χρήστης αφαιρέθηκε επιτυχώς'));
      dispatch(removedBlockedUser(user));
    })
    .catch(error => {
      dispatch(alertError(error.toString()))
    })
  }
}
