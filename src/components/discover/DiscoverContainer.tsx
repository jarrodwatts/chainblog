import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import DiscoverAuthorCard from "./DiscoverAuthorCard";
import LoadingSkeleton from "./LoadingSkeleton";
import styles from "./discover.module.css";
import useInfiniteExploreProfiles from "../../lib/useInfiniteExploreProfiles";
import { ProfileSortCriteria } from "../../graphql/generated";

export default function DiscoverContainer() {
  const {
    data: profiles,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    fetchNextPage,
  } = useInfiniteExploreProfiles(
    {
      request: {
        limit: 24,
        sortCriteria: ProfileSortCriteria.MostFollowers,
      },
    },
    {
      // Infinite query
      getNextPageParam: (lastPage) => {
        return lastPage.exploreProfiles.pageInfo.next;
      },
    }
  );

  console.log({ profiles, isLoading, isFetchingNextPage, hasNextPage, error });

  return (
    <Container maxWidth="lg" className={styles.pageContainer}>
      <Grid container spacing={3} className={styles.authorCardContainer}>
        {isLoading
          ? [...Array(12)].map((_, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <LoadingSkeleton />
              </Grid>
            ))
          : profiles?.pages.flatMap((page) =>
              page.exploreProfiles.items.map((profile) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={profile.id}>
                  <DiscoverAuthorCard author={profile} />
                </Grid>
              ))
            )}
      </Grid>

      <div className={styles.loadMore}>
        {isFetchingNextPage ? (
          <Typography variant="body2">Loading more...</Typography>
        ) : hasNextPage ? (
          <Button onClick={() => fetchNextPage()}>Load more</Button>
        ) : (
          <Typography variant="body2" className={styles.reachedEnd}>
            You&apos;ve reached the end!
          </Typography>
        )}
      </div>
    </Container>
  );
}
