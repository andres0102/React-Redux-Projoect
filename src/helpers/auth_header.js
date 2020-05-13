import { accessToken } from './access_token'

export function requestHeader() {
  let authHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken()}`
  }

  return authHeaders
}
