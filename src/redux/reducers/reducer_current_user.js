import {
  FETCHED_CURRENT_USER,
  FETCHING_CURRENT_USER
} from '../actions/current_user';

const initialState = {
  isFetchingCurrentUser: false,
  result: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

  case FETCHED_CURRENT_USER:
    return Object.assign({}, state, { result: action.payload, isFetchingCurrentUser: false });

  case FETCHING_CURRENT_USER:
    return Object.assign({}, state, { isFetchingCurrentUser: true });

  default:
    return state;
  }
}
