import fetch from 'cross-fetch';
import { requestHeader } from './auth_header'
import { accessToken } from './access_token'

const postData = (url) => {
  let headers = requestHeader();

  return fetch(url, {
    headers: headers,
    body: JSON.stringify({token: accessToken()}),
    method: 'POST'
  })
  .then(response => response.json())
}

export const introspectToken = () => {
  const introspect_url = `${process.env.REACT_APP_API_URL}/oauth/introspect`;

  return (
    postData(introspect_url)
      .then(res => {
        if(res.active === undefined) {
          return false
        } else if(res.active === true) {
          return true
        } else {
          return false
        }
      })
      .catch(error => { return false })
  );
}
