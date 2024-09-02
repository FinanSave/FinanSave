import { jwtDecode } from 'jwt-decode'

export function getUserIdByToken(token: string) {
  const tokenDecoded = jwtDecode(token)

  return tokenDecoded.id
}
