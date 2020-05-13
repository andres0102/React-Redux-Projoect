import fetch from 'cross-fetch';
import { requestHeader } from '../../helpers/auth_header'

export const FETCHING_RESULTS = 'FETCHING RESULTS';
export const FETCHED_RESULTS = 'FETCHED RESULTS';
export const CLEARING_RESULTS = 'CLEARING RESULTS';

export const fetchingResults = () => {
  return {
    type: FETCHING_RESULTS
  }
}

export const fetchedResults = (users) => {
  return {
    type: FETCHED_RESULTS,
    payload: users
  }
}

export const clearingResults = () => {
  return {
    type: CLEARING_RESULTS
  }
}

const postData = (url, data) => {
  let headers = requestHeader();

  delete headers['Content-Type'];

  return fetch(url, {
    body: data,
    headers: headers,
    method: 'POST'
  })
  .then(response => response.json())
}

export const getSearchUsers = (criteria) => {
  const search_url= `${process.env.REACT_APP_API_URL}/api/search`

  return (dispatch) => {
    dispatch(fetchingResults())
    postData(search_url, criteria)
      .then(users => {
        dispatch(fetchedResults(users))
      });
  }
}
