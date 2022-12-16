import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { fetchData } from "../../auth-fetcher";
import {
  ExploreProfilesDocument,
  ExploreProfilesQuery,
  ExploreProfilesQueryVariables,
} from "../graphql/generated";

const useInfiniteExploreProfiles = <
  TData = ExploreProfilesQuery,
  TError = unknown
>(
  variables: ExploreProfilesQueryVariables,
  options?: UseInfiniteQueryOptions<ExploreProfilesQuery, TError, TData>
) => {
  return useInfiniteQuery<ExploreProfilesQuery, TError, TData>(
    ["ExploreProfiles", variables],
    ({ pageParam }) =>
      fetchData<ExploreProfilesQuery, ExploreProfilesQueryVariables>(
        ExploreProfilesDocument,
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

export default useInfiniteExploreProfiles;
