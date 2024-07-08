import { jwtDecode, type JwtPayload } from "jwt-decode";

export type JwtDecode<T = unknown> = JwtPayload &
  T & {
    iat: number;
    exp: number;
    iss: string;
  };

export function verifyTokenExpirationTime(decodedToken: JwtDecode) {
  const now = Math.floor(Date.now() / 1000);
  const tokenExpirationTime = decodedToken.exp ?? 0;

  if (tokenExpirationTime > now) {
    return true;
  }

  return false;
}

export function getTokenExpirationDate(exp: number | null) {
  return exp ? new Date(exp * 1000) : null;
}
