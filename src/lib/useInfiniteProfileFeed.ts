import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { fetchData } from "../../auth-fetcher";
import {
  ProfileFeedDocument,
  ProfileFeedQuery,
  ProfileFeedQueryVariables,
} from "../graphql/generated";

const useInfiniteProfileFeedQuery = <
  TData = ProfileFeedQuery,
  TError = unknown
>(
  variables: ProfileFeedQueryVariables,
  options?: UseInfiniteQueryOptions<ProfileFeedQuery, TError, TData>
) => {
  return useInfiniteQuery<ProfileFeedQuery, TError, TData>(
    ["ProfileFeed", variables],
    ({ pageParam }) =>
      fetchData<ProfileFeedQuery, ProfileFeedQueryVariables>(
        ProfileFeedDocument,
        {
          ...variables,
          request: {
            ...variables.request,
            cursor: pageParam,
          },
        }
      )(),
    options
  );
};

export default useInfiniteProfileFeedQuery;
