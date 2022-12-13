import { STORAGE_KEY } from "../../../auth-fetcher";

/**
 * Determine if an access token is expired
 * @param exp The expiration time of the token
 * @returns {boolean}
 */
export function isTokenExpired(exp: number): boolean {
  return exp * 1000 < Date.now();
}

/**
 * Read the access token from local storage
 * Returns null if the token is not found (user is not logged in)
 * @returns { {accessToken: string; refreshToken: string; exp: number; }   | null}
 */
export function readAccessTokenFromStorage(): {
  accessToken: string;
  refreshToken: string;
  exp: number;
} | null {
  // Logic: Read the STORAGE_KEY from localStorage, which will return:
  const ls = localStorage || window.localStorage;

  if (!ls) {
    console.error(
      "Something went wrong finding local storage. Entering unauthenticated mode."
    );
    return null;
  }

  // Read key from local storage
  const token = ls.getItem(STORAGE_KEY);
  const tokenValue = token
    ? (JSON.parse(token) as {
        accessToken: string;
        refreshToken: string;
        exp: number;
      })
    : null;
  return tokenValue;
}

export function setAccessTokenToStorage(
  accessToken: string,
  refreshToken: string
) {
  const ls = localStorage || window.localStorage;

  const exp = parseJwt(refreshToken).exp;

  if (!ls) {
    console.error(
      "Something went wrong finding local storage.  Could not set access token."
    );
    return null;
  }

  ls.setItem(
    STORAGE_KEY,
    JSON.stringify({
      accessToken,
      refreshToken,
      exp,
    })
  );
}

/**
 * Utility function for parsing JWT tokens such as those returned by the
 * Lens GraphQL API (access tokens and refresh tokens).
 */
export function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
