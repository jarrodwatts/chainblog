import {
  RefreshAccessTokenDocument,
  RefreshAccessTokenMutation,
  RefreshAccessTokenMutationVariables,
} from "../../graphql/generated";
import { setAccessTokenToStorage } from "./helpers";

export default async function refreshAccessToken(currentRefreshToken: string) {
  async function fetchData<TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: RequestInit["headers"]
  ): Promise<TData> {
    const res = await fetch("https://api.lens.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || {};
      throw new Error(message || "Error…");
    }

    return json.data;
  }

  // 3. set the new access token in local storage
  const result = await fetchData<
    RefreshAccessTokenMutation,
    RefreshAccessTokenMutationVariables
  >(RefreshAccessTokenDocument, {
    request: {
      refreshToken: currentRefreshToken,
    },
  });

  const {
    refresh: { accessToken, refreshToken: newRefreshToken },
  } = result;

  setAccessTokenToStorage(accessToken, newRefreshToken);

  return accessToken as string;
}
