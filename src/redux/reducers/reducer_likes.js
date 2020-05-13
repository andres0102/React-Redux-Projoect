import {
  FETCHED_LIKES,
  FETCHING_LIKES,
  END_OF_LIKES,
  CLEARING_RESULTS
} from '../actions/likes';

const initialState = {
  results: [],
  isFetchingLikes: true,
  endOfLikes: false
}

export default (state = initialState, action) => {
  switch (action.type) {

  case FETCHING_LIKES:
    return Object.assign({}, state, { isFetchingLikes: true });

  case FETCHED_LIKES:
    return Object.assign({}, state, { results: state.results.concat(action.payload), isFetchingLikes: false });

  case END_OF_LIKES:
    return Object.assign({}, state, { endOfLikes: true, isFetchingLikes: false });

  case CLEARING_RESULTS:
    return Object.assign({}, state, { results: [], endOfLikes: false, isFetchingLikes: true });

  default:
    return state;
  }
}
