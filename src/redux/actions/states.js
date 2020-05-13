import fetch from 'cross-fetch';
import { requestHeader } from '../../helpers/auth_header';

export const FETCHING_STATES = 'FETCHING STATES';
export const FETCHED_STATES = 'FETCHED STATES';
export const FETCHING_CITIES = 'FETCHING CITIES';
export const FETCHED_CITIES = 'FETCHED CITIES';

export const fetchingStates = () => {
  return {
    type: FETCHING_STATES
  }
}

export const fetchedStates = (states) => {
  return {
    type: FETCHED_STATES,
    payload: states
  }
}

export const fetchingCities = () => {
  return {
    type: FETCHING_CITIES
  }
}

export const fetchedCities = (cities) => {
  return {
    type: FETCHED_CITIES,
    payload: cities
  }
}

export const getStates = () => {
  let headers = requestHeader();
  const statesUrl = `${process.env.REACT_APP_API_URL}/api/states`;

  return (dispatch) => {
    dispatch(fetchingStates());
    fetch(statesUrl, {
      headers: headers
    }).then(res => res.json())
      .then(states => {
        dispatch(fetchedStates(states))
      });
  }
}
