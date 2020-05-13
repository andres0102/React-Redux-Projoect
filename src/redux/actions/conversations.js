import fetch from 'cross-fetch';
import { requestHeader } from '../../helpers/auth_header';
import { handleResponse } from '../../helpers/handle_response';
import { alertError, alertSuccess } from './alerts';

export const FETCHED_CONVERSATIONS = 'FETCHED CONVERSATIONS';
export const FETCHED_CONVERSATION = 'FETCHED CONVERSATION';
export const FETCHING_CONVERSATIONS = 'FETCHING CONVERSATIONS';
export const FETCHING_CONVERSATION = 'FETCHING CONVERSATION';
export const DELETING_CONVERSATION = 'DELETING CONVERSATION';
export const DELETED_CONVERSATION = 'DELETED CONVERSATION';
export const DELETED_ALL_CONVERSATIONS = 'DELETED ALL CONVERSATIONS';
export const ACTIVE_CONVERSATION = 'ACTIVE CONVERSATION';
export const ADD_MESSAGE = 'ADD MESSAGE';
export const CLEAR_MESSAGES = 'CLEAR MESSAGES';

const fetchedConversations = (conversations) => {
  return {
    type: FETCHED_CONVERSATIONS,
    payload: conversations
  }
}

const fetchedConversation = (conversation) => {
  return {
    type: FETCHED_CONVERSATION,
    payload: conversation
  }
}

const activeConversation = (conversation_id) => {
  return {
    type: ACTIVE_CONVERSATION,
    payload: conversation_id
  }
}

const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    payload: message
  }
}

const fetchingConversations = () => {
  return {
    type: FETCHING_CONVERSATIONS
  }
}

const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES
  }
}

const fetchingConversation = () => {
  return {
    type: FETCHING_CONVERSATION
  }
}

const deletingConversation = () => {
  return {
    type: DELETING_CONVERSATION
  }
}

const deletedConversation = (conversation) => {
  return {
    type: DELETED_CONVERSATION,
    payload: conversation
  }
}

const deletedAllConversations = () => {
  return {
    type: DELETED_ALL_CONVERSATIONS
  }
}

export const clearingMessages = () => {
  return (dispatch) => {
    dispatch(clearMessages());
  }
}

export const getConversations = () => {
  let headers = requestHeader();
  let conversationsUrl = `${process.env.REACT_APP_API_URL}/api/conversations`;

  return (dispatch) => {
    dispatch(fetchingConversations())
    fetch(conversationsUrl, {
        headers: headers
      }
    )
    .then(handleResponse)
    .then(conversations => {
      dispatch(fetchedConversations(conversations))
    })
    .catch(error => {
      dispatch(alertError(error.toString()))
    })
  }
}

export const getConversation = (conversation_id) => {
  let headers = requestHeader();
  let conversationUrl = `${process.env.REACT_APP_API_URL}/api/conversations/${conversation_id}`;

  return (dispatch) => {
    dispatch(fetchingConversation());
    fetch(conversationUrl, {
        headers: headers
      }
    )
    .then(response => handleResponse(response))
    .then(messages => {
      dispatch(activeConversation(conversation_id));
      dispatch(fetchedConversation(messages));
    })
    .catch(error => {
      dispatch(alertError(error.toString()))
    })
  }
}

export const deleteConversation = (conversation_id) => {
  let headers = requestHeader();
  let conversationUrl = `${process.env.REACT_APP_API_URL}/api/conversations/${conversation_id}`;

  return (dispatch) => {
    dispatch(deletingConversation());
    fetch(conversationUrl, {
        headers: headers,
        method: 'DELETE'
      }
    )
    .then(handleResponse)
    .then(conversation => {
      dispatch(alertSuccess('Η συνομιλία διαγράφηκε'));
      dispatch(deletedConversation(conversation));
    })
    .catch(error => {
      dispatch(alertError(error.toString()))
    })
  }
}

export const deleteAllConversations = () => {
  let headers = requestHeader();
  let conversationUrl = `${process.env.REACT_APP_API_URL}/api/conversations/delete_all`;

  return (dispatch) => {
    dispatch(deletingConversation());
    fetch(conversationUrl, {
        headers: headers,
        method: 'DELETE'
      }
    )
    .then(handleResponse)
    .then(conversations => {
      dispatch(alertSuccess('Οι συνομιλίες διαγράφηκαν'));
      dispatch(deletedAllConversations());
    })
    .catch(error => {
      dispatch(alertError(error.toString()))
    })
  }
}

export const applyMessage = (message) => {
  return (dispatch) => {
    dispatch(addMessage(message));
  }
}
