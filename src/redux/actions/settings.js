import fetch from 'cross-fetch';
import { requestHeader } from '../../helpers/auth_header';
import { handleResponse } from '../../helpers/handle_response';
import { fetchedCurrentUser } from './current_user';
import { alertError, alertSuccess } from './alerts';

export const EDITING_SETTINGS = 'EDITING SETTINGS';
export const EDITED_SETTINGS = 'EDITED SETTINGS';

const editedSettings = () => {
  return {
    type: EDITED_SETTINGS
  }
}

const editingSettings = () => {
  return {
    type: EDITING_SETTINGS
  }
}

export const editSettings = (data) => {
  let headers = requestHeader();
  const editUserSettingsUrl = `${process.env.REACT_APP_API_URL}/api/user`;

  delete headers['Content-Type'];

  return (dispatch) => {
    dispatch(editingSettings())
    fetch(editUserSettingsUrl, {
        method: 'PUT',
        body: data,
        headers: headers
      }
    )
    .then(handleResponse)
    .then(user => {
      dispatch(fetchedCurrentUser(user));
      dispatch(editedSettings());
      dispatch(alertSuccess('Οι αλλαγές σας σώθηκαν επιτυχώς'));
    })
    .catch(error => {
      dispatch(editedSettings());
      dispatch(alertError(error.toString()))
    })
  }
}

export const editAboutSettings = (data) => {
  let headers = requestHeader();
  const editAboutSettingsUrl = `${process.env.REACT_APP_API_URL}/api/about`;

  return (dispatch) => {
    dispatch(editingSettings())
    fetch(editAboutSettingsUrl, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
      }
    )
    .then(handleResponse)
    .then(user => {
      dispatch(fetchedCurrentUser(user));
      dispatch(editedSettings());
      dispatch(alertSuccess('Οι αλλαγές σας σώθηκαν επιτυχώς'));
    })
    .catch(error => {
      dispatch(editedSettings());
      dispatch(alertError(error.toString()))
    })
  }
}

export const editEmailSettings = (data) => {
  let headers = requestHeader();
  const editEmailSettingsUrl = `${process.env.REACT_APP_API_URL}/api/email_preference`;

  return (dispatch) => {
    dispatch(editingSettings())
    fetch(editEmailSettingsUrl, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
      }
    )
    .then(handleResponse)
    .then(user => {
      dispatch(fetchedCurrentUser(user));
      dispatch(editedSettings());
      dispatch(alertSuccess('Οι αλλαγές σας σώθηκαν επιτυχώς'));
    })
    .catch(error => {
      dispatch(editedSettings());
      dispatch(alertError(error.toString()))
    })
  }
}

export const editGallerySettings = (data) => {
  let headers = requestHeader();
  const editGallerySettings = `${process.env.REACT_APP_API_URL}/api/galleries`;

  delete headers['Content-Type'];

  return (dispatch) => {
    dispatch(editingSettings())
    fetch(editGallerySettings, {
        method: 'PUT',
        headers: headers,
        body: data
      }
    )
    .then(handleResponse)
    .then(user => {
      dispatch(fetchedCurrentUser(user));
      dispatch(editedSettings());
      dispatch(alertSuccess('Οι αλλαγές σας σώθηκαν επιτυχώς'));
    })
    .catch(error => {
      dispatch(editedSettings());
      dispatch(alertError(error.toString()))
    })
  }
}

export const deletePicture = (picture_id) => {
  let headers = requestHeader();
  const deletePictureUrl = `${process.env.REACT_APP_API_URL}/api/pictures/${picture_id}`

  return (dispatch) => {
    dispatch(editingSettings())
    fetch(deletePictureUrl, {
        method: 'DELETE',
        headers: headers
      }
    )
    .then(handleResponse)
    .then(user => {
      dispatch(fetchedCurrentUser(user));
      dispatch(editedSettings());
      dispatch(alertSuccess('Η φωτογραφία διαγράφηκε επιτυχώς'));
    })
    .catch(error => {
      dispatch(editedSettings());
      dispatch(alertError(error.toString()))
    })
  }
}

export const deleteAccount = () => {
  const headers = requestHeader();
  const deletePictureUrl = `${process.env.REACT_APP_API_URL}/api/users`

  return (dispatch) => {
      fetch(deletePictureUrl, {
        method: 'DELETE',
        headers: headers
      }
    )
    .then(handleResponse)
    .then(response => {
      localStorage.clear();
      dispatch(alertSuccess(response.message));
    })
    .catch(error => {
      dispatch(alertError(error.toString()))
    })
  }
}
