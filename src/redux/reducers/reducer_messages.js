import {
  SENDING_MESSAGE,
  SENT_MESSAGE
} from '../actions/messages';

const initialState = {
  isSedingMessage: true,
}

export default (state = initialState, action) => {
  switch (action.type) {

  case SENDING_MESSAGE:
    return Object.assign({}, state, { isSedingMessage: true });

  case SENT_MESSAGE:
    return Object.assign({}, state, { isSedingMessage: false });

  default:
    return state;
  }
}
