import {
  FETCHING_RESULTS,
  FETCHED_RESULTS,
  CLEARING_RESULTS
} from '../actions/search';
import { FETCHED_USER, END_OF_USERS} from '../actions/users';

const initialState = {
  results: [],
  user: {},
  endOfUsers: false,
  current_user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

  case FETCHING_RESULTS:
    return Object.assign({}, state, { isFetching: true });

  case FETCHED_RESULTS:
    return Object.assign({}, state, { results: state.results.concat(action.payload), isFetching: false });

  case FETCHED_USER:
    return Object.assign({}, state, { user: action.payload, isFetching: false });

  case END_OF_USERS:
    return Object.assign({}, state, { endOfUsers: true, isFetching: false });

  case CLEARING_RESULTS:
    return Object.assign({}, state, { results: [], endOfUsers: false, isFetching: true});

  default:
    return state;
  }
}
