import {
  FETCHING_BLOCKED_USERS,
  FETCHED_BLOCKED_USERS,
  REMOVING_BLOCKED_USER,
  REMOVED_BLOCKED_USER
} from '../actions/blocked_users';

const initialState = {
  result: [],
  isFetchingBlockedUsers: false,
  isDeletingBlockedUser: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

  case FETCHING_BLOCKED_USERS:
    return Object.assign({}, state, { isFetchingBlockedUsers: true });

  case FETCHED_BLOCKED_USERS:
    return Object.assign({}, state, { result: action.payload, isFetchingBlockedUsers: false });

  case REMOVING_BLOCKED_USER:
    return Object.assign({}, state, { isDeletingBlockedUser: true });

  case REMOVED_BLOCKED_USER:
    return {
      result: [...state.result.filter(
        (user) => user.user.username !== action.payload.user.username)
      ],
      isDeletingBlockedUser: false
    }

  default:
    return state;
  }
}
