import fetch from 'cross-fetch';
import { requestHeader } from '../../helpers/auth_header';
import { handleResponse } from '../../helpers/handle_response';
import { alertError, alertSuccess } from './alerts';

export const SENDING_MESSAGE = 'SENDING MESSAGE';
export const SENT_MESSAGE = 'SENT MESSAGE';

const sendingMessage = () => {
  return {
    type: SENDING_MESSAGE
  }
}

const sentMessage = () => {
  return {
    type: SENT_MESSAGE
  }
}

export const sendMessage = (data) => {
  let headers = requestHeader();
  let messagesUrl = `${process.env.REACT_APP_API_URL}/api/messages`;

  delete headers['Content-Type'];

  return (dispatch) => {
    dispatch(sendingMessage())
    fetch(messagesUrl, {
        headers: headers,
        method: 'POST',
        body: data
      }
    )
    .then(handleResponse)
    .then(message => {
      dispatch(sentMessage());
      dispatch(alertSuccess('Το μήνυμα εστάλει'));
    })
    .catch(error => {
      dispatch(alertError(error.toString()))
    })
  }
}

export const replyMessage = (data) => {
  let headers = requestHeader();
  let messagesUrl = `${process.env.REACT_APP_API_URL}/api/message_reply`;

  return (dispatch) => {
    dispatch(sendingMessage())
    fetch(messagesUrl, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(data)
      }
    )
    .then(handleResponse)
    .then(message => {
      dispatch(sentMessage());
    })
    .catch(error => {
      dispatch(alertError(error.toString()))
    })
  }
}
