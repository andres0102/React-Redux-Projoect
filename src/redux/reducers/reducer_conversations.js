import {
  FETCHED_CONVERSATIONS,
  FETCHED_CONVERSATION,
  FETCHING_CONVERSATIONS,
  FETCHING_CONVERSATION,
  DELETING_CONVERSATION,
  DELETED_CONVERSATION,
  DELETED_ALL_CONVERSATIONS,
  ACTIVE_CONVERSATION,
  ADD_MESSAGE,
  CLEAR_MESSAGES
} from '../actions/conversations';

const initialState = {
  results: [],
  messages: [],
  isFetchingConversations: true,
  isFetchingConversation: false,
  isDeletingConversation: false,
  activeConversation: ''
}

export default (state = initialState, action) => {
  switch (action.type) {

  case FETCHING_CONVERSATIONS:
    return Object.assign({}, state, { isFetchingConversations: true });

  case FETCHING_CONVERSATION:
    return Object.assign({}, state, { isFetchingConversation: true });

  case FETCHED_CONVERSATIONS:
    return Object.assign({}, state, { results: action.payload, isFetchingConversations: false });

  case FETCHED_CONVERSATION:
    return Object.assign({}, state, { messages: action.payload, isFetchingConversation: false });

  case DELETED_CONVERSATION:
    return {
      ...state,
      results: [...state.results.filter(
        (conversation) => conversation.id !== action.payload.id)
      ],
      isDeletingConversation: false
    }

  case DELETED_ALL_CONVERSATIONS:
    return {
      ...state,
      results: [],
      isDeletingConversation: false
    }

  case DELETING_CONVERSATION:
    return Object.assign({}, state, { isDeletingConversation: true });

  case ACTIVE_CONVERSATION:
    return Object.assign({}, state, { activeConversation: action.payload });

  case ADD_MESSAGE:
    return Object.assign({}, state, { messages: state.messages.concat(action.payload) });

  case CLEAR_MESSAGES:
    return Object.assign({}, state, { activeConversation: null, messages: [], isFetchingConversation: false });

  default:
    return state;
  }
}
