import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { fetchData } from "../../auth-fetcher";
import {
  ExplorePublicationsDocument,
  ExplorePublicationsQuery,
  ExplorePublicationsQueryVariables,
} from "../graphql/generated";

const useInfiniteExplorePublications = <
  TData = ExplorePublicationsQuery,
  TError = unknown
>(
  variables: ExplorePublicationsQueryVariables,
  options?: UseInfiniteQueryOptions<ExplorePublicationsQuery, TError, TData>
) => {
  return useInfiniteQuery<ExplorePublicationsQuery, TError, TData>(
    ["ExplorePublications", variables],
    ({ pageParam }) =>
      fetchData<ExplorePublicationsQuery, ExplorePublicationsQueryVariables>(
        ExplorePublicationsDocument,
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

export default useInfiniteExplorePublications;
