import fetch from 'cross-fetch';
import { requestHeader } from '../../helpers/auth_header';
import { handleResponse } from '../../helpers/handle_response';

export const checkTokenExpirationMiddleware = store => next => action => {
  const user = JSON.parse(localStorage.getItem("user"));

  if(user) {
    introspectToken(user)
      .then(response => {
        if(response.active === false) {
          localStorage.clear();
          next(action);
        }
      })
      .catch(error => {
        localStorage.clear();
        next(action);
      });
  }

  next(action);
}

const introspectToken = user => {
  const headers = requestHeader();
  const accessToken = user.access_token;

  let payload = { "token": accessToken };

  return fetch(`${process.env.REACT_APP_API_URL}/oauth/introspect`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  })
  .then(handleResponse)
}
