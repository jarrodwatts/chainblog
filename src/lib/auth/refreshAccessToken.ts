import { fetchData } from "../../../auth-fetcher";
import {
  RefreshAccessTokenDocument,
  RefreshAccessTokenMutation,
  RefreshAccessTokenMutationVariables,
} from "../../graphql/generated";
import { setAccessTokenToStorage } from "./helpers";

export default async function refreshAccessToken(): Promise<string> {
  const newTokenResult = await fetchData<
    RefreshAccessTokenMutation,
    RefreshAccessTokenMutationVariables
  >(RefreshAccessTokenDocument)();

  const { accessToken, refreshToken } = newTokenResult.refresh;

  // Set in local storage
  setAccessTokenToStorage(accessToken, refreshToken);
  return accessToken as string;
}
