import {
  FETCHING_RESULT,
  FETCHED_PERSONALITY_RESULT
} from '../actions/personality';

const initialState = {
  result: '',
  isFetchingResults: true
}

export default (state = initialState, action) => {
  switch (action.type) {

  case FETCHING_RESULT:
    return Object.assign({}, state, { isFetchingResults: true });

  case FETCHED_PERSONALITY_RESULT:
    return Object.assign({}, state, { result: action.payload, isFetchingResults: false });

  default:
    return state;
  }
}
