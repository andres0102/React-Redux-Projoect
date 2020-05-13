import fetch from 'cross-fetch';
import { requestHeader } from '../../helpers/auth_header';
import { handleResponse } from '../../helpers/handle_response';
import { alertError, alertSuccess } from './alerts';

export const FETCHING_RESULT = 'FETCHING RESULT';
export const FETCHED_PERSONALITY_RESULT = 'FETCHED PERSONALITY RESULT';

const fetchingResult = () => {
  return {
    type: FETCHING_RESULT
  }
}

const fetchedPersonalityResult = (result) => {
  return {
    type: FETCHED_PERSONALITY_RESULT,
    payload: result
  }
}

const postData = (url, data) => {
  const headers = requestHeader();

  delete headers['Content-Type'];

  return fetch(url, {
    body: data,
    headers: headers,
    method: 'POST'
  })
  .then(handleResponse)
}

export const postPersonalityResults = (answers) => {
  const personalities_url= `${process.env.REACT_APP_API_URL}/api/personalities`;

  return (dispatch) => {
    dispatch(fetchingResult())
    postData(personalities_url, answers)
      .then(result => {
        dispatch(fetchedPersonalityResult(result));
        dispatch(alertSuccess(`Το αποτέλεσμα σας είναι ${result.data}, μεταβείτε στο προφίλ σας για να δείτε τις λεπτομέρειες`));
      })
      .catch(error => {
        dispatch(alertError(error.toString()))
      });
  }
}
