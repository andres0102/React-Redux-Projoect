import { requestHeader } from '../helpers/auth_header';

export default function sendHeart(username) {
  let like_url = `${process.env.REACT_APP_API_URL}/api/users/${username}/like`
  return postData(like_url, username)
}

const postData = (url, username) => {
  const headers = requestHeader();

  return fetch(url, {
    method: 'PUT',
    headers: headers
  })
  .then(handleResponse)
}

const handleResponse = (response) => {
  return response.json().then(data => {
    if (!response.ok) {
      let error = (data && data.errors) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
