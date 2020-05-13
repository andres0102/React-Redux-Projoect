export const handleResponse = (response) => {
  return response.json().then(data => {
    if (!response.ok) {
      let error = (data && data.errors) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
