import {
  PublicationMainFocus,
  PublicationSortCriteria,
} from "../graphql/generated";
import useLensUser from "./auth/useLensUser";
import useInfiniteExplorePublications from "./useInfiniteExplorePublications";
import useInfiniteProfileFeedQuery from "./useInfiniteProfileFeed";

/**
 * If there is a current Lens user, fetch the feed for that user.
 * If there is no user, show a default feed.
 */
export default function useDynamicFeed() {
  // 1. Get the current user
  const { data: lensUser, isLoading: loadingUser, isSignedIn } = useLensUser();

  // 2. If there is a user, fetch the feed for that user
  const personalFeedQuery = useInfiniteProfileFeedQuery(
    {
      request: {
        profileId: lensUser?.defaultProfile?.id,
        metadata: {
          mainContentFocus: [PublicationMainFocus.Article],
        },
        /**
         * https://docs.lens.xyz/docs/profile-feed
         * Please note the limit is the number of EVENTS you get back.
         * It is not the total count of aggregate lines. For example, if you asked for 5 and that all have been aggregated
         * We advise you use a limit of 50 for this which should give plenty of information for the user to see and page nicely.
         */
        limit: 50,
      },
    },
    {
      // Fire if there is a user
      enabled: !!lensUser?.defaultProfile?.id,
      // Only fire once
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      keepPreviousData: true,

      // Infinite query
      getNextPageParam: (lastPage) => {
        return lastPage.feed.pageInfo.next;
      },
    }
  );

  // 3. If there is no user, show a default feed
  const defaultFeedQuery = useInfiniteExplorePublications(
    {
      request: {
        sortCriteria: PublicationSortCriteria.TopCollected,
        limit: 50,
        metadata: {
          // mainContentFocus: [PublicationMainFocus.Article],
        },
      },
    },
    {
      // Fire if there is no user (and not loading the user)
      enabled: !isSignedIn || (!lensUser?.defaultProfile?.id && !loadingUser),
      // Only fire once
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      keepPreviousData: true,

      // Infinite query
      getNextPageParam: (lastPage) => {
        return lastPage.explorePublications.pageInfo.next;
      },
    }
  );

  // If there is a user, return the personal feed query
  return {
    personalFeedQuery,
    defaultFeedQuery,
  };
}
