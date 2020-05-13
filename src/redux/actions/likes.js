import fetch from 'cross-fetch';
import { requestHeader } from '../../helpers/auth_header';
import { handleResponse } from '../../helpers/handle_response';
import { history } from '../../helpers/history';
import { alertError } from './alerts';

export const FETCHED_LIKES = 'FETCHED LIKES';
export const FETCHING_LIKES = 'FETCH LIKES';
export const END_OF_LIKES = 'END OF LIKES';
export const CLEARING_RESULTS = 'CLEARING RESULTS';

const fetchedLikes = (likes) => {
  return {
    type: FETCHED_LIKES,
    payload: likes
  }
}

const endOfLikes = () => {
  return {
    type: END_OF_LIKES
  }
}

const fetchingLikes = () => {
  return {
    type: FETCHING_LIKES
  }
}

export const clearingResults = () => {
  return {
    type: CLEARING_RESULTS
  }
}

export const getLikes = (page = 1) => {
  let headers = requestHeader();
  let likesUrl = `${process.env.REACT_APP_API_URL}/api/likes?page=${page}`;

  return (dispatch) => {
    dispatch(fetchingLikes())
    fetch(likesUrl, {
        headers: headers
      }
    )
    .then(handleResponse)
    .then(likes => {
      if(likes.length === 0) {
        dispatch(endOfLikes())
      } else {
        dispatch(fetchedLikes(likes))
      }
    })
    .catch(error => {
      history.push('/users')
      dispatch(alertError(error.toString()))
    })
  }
}
