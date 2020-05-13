import fetch from 'cross-fetch';

export const authService = {
  login,
  logout,
  signup,
  passwordReset,
  passwordResetSubmit,
  facebookLogin,
  confirmAccount
};

function login(creds) {
  const loginUrl = `${process.env.REACT_APP_API_URL}/oauth/token`;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds)
  };

  return fetch(loginUrl, requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user.access_token) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
}

function facebookLogin(creds) {
  const loginUrl = `${process.env.REACT_APP_API_URL}/api/omniauths`;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds)
  };

  return fetch(loginUrl, requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user.access_token) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
}

function signup(details) {
  const signUpUrl = `${process.env.REACT_APP_API_URL}/api/user`;

  const requestOptions = {
    method: 'POST',
    body: details
  };

  return fetch(signUpUrl, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data;
    })
}

function passwordReset(details) {
  const passwordResetUrl = `${process.env.REACT_APP_API_URL}/api/user/password`;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details)
  };

  return fetch(passwordResetUrl, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data;
    })
}

function passwordResetSubmit(details) {
  const passwordResetUrl = `${process.env.REACT_APP_API_URL}/api/user/password`;

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details)
  };

  return fetch(passwordResetUrl, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data;
    })
}

function confirmAccount(token) {
  const confirmationTokenURL = new URL(
    `${process.env.REACT_APP_API_URL}/api/user/confirmation?confirmation_token=${token}`
  );

  return fetch(confirmationTokenURL)
    .then(handleResponse)
    .then(data => {
      return data;
    })
}

function logout() {
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.json().then(data => {
    if (!response.ok) {
      let error = (data && data.errors) || data.error_description || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
