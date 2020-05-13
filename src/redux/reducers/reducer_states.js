import {
  FETCHING_STATES,
  FETCHED_STATES,
  FETCHING_CITIES,
  FETCHED_CITIES,
} from '../actions/states';

const initialState = {
  allStates: [],
  isFetching: false,
  isFetchingCities: false,
  allCities: []
}

export default (state = initialState, action) => {
  switch (action.type) {

  case FETCHING_STATES:
    return Object.assign({}, state, { isFetching: true })

  case FETCHED_STATES:
    return Object.assign({}, state, { allStates: action.payload, isFetching: false })

  case FETCHING_CITIES:
    return Object.assign({}, state, { isFetchingCities: true })

  case FETCHED_CITIES:
    return Object.assign({}, state, { allCities: action.payload, isFetchingCities: false })

  default:
    return state;
  }
}
