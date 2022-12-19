import {
  readAccessTokenFromStorage,
  isTokenExpired,
} from "./src/lib/auth/helpers";
import refreshAccessToken from "./src/lib/auth/refreshAccessToken";

export const endpoint = "https://api.lens.dev/";
export const STORAGE_KEY = "LH_STORAGE_KEY";

async function getAccessToken(): Promise<string | null> {
  const tokenValue = readAccessTokenFromStorage();

  // If the token is not in localStorage, then the user is not logged in
  if (!tokenValue) {
    return null;
  }

  let accessTokenValue = tokenValue.accessToken;

  // If the exp is less than the current time, then the token has expired
  if (isTokenExpired(tokenValue.exp)) {
    // If the token has expired, then we need to refresh the token
    accessTokenValue = await refreshAccessToken();
  }

  // If the token has not expired, then we can use the accessToken
  return accessTokenValue;
}

export const fetchData = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"]
): (() => Promise<TData>) => {
  return async () => {
    // If on server, then don't try to get an access token

    const accessToken =
      typeof window === "undefined" ? null : await getAccessToken();

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options ?? {}),
        ...(accessToken
          ? {
              "x-access-token": `Bearer ${accessToken}`,
            }
          : {}),

        // Cors
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || "Error..";
      // throw new Error(message);
    }

    return json.data;
  };
};
