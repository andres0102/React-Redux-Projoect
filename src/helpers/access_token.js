export const accessToken = () => {
  const user = localStorage.getItem('user');

  if(user) {
    return JSON.parse(user).access_token
  }

  return null
}
