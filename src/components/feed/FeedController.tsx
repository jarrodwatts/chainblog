import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import styles from "./feed.module.css";
import FeedItemComponent from "./FeedItem";
import useDynamicFeed from "../../lib/useDynamicFeed";
import useLensUser from "../../lib/auth/useLensUser";

export default function FeedController() {
  const { personalFeedQuery, defaultFeedQuery } = useDynamicFeed();

  const { isSignedIn, hasProfile } = useLensUser();

  // Loading user's personalised feed
  if (isSignedIn && hasProfile && personalFeedQuery?.isLoading) {
    return (
      <Container maxWidth="md" className={styles.feedContainer}>
        <Grid container direction="column" spacing={2}>
          {[...Array(12)].map((_, i) => (
            <Grid item xs={12} key={i} className={styles.feedItemWrapper}>
              <LoadingSkeleton />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  // Loaded the user's personalised feed
  if (personalFeedQuery?.data) {
    return (
      <Container maxWidth="md" className={styles.feedContainer}>
        <Grid
          container
          direction="column"
          spacing={2}
          className={styles.feedItemWrapper}
        >
          {
            // Get all the posts out of all the pages and map them
            personalFeedQuery.data?.pages.flatMap((page) =>
              page.feed.items.map((post) => (
                <FeedItemComponent post={post.root} key={post.root.id} />
              ))
            )
          }
        </Grid>

        {personalFeedQuery.isFetchingNextPage ? (
          <Typography variant="body2">Loading more...</Typography>
        ) : personalFeedQuery.hasNextPage ? (
          <Button onClick={() => personalFeedQuery.fetchNextPage()}>
            Load more
          </Button>
        ) : (
          <Typography variant="body2" className={styles.reachedEnd}>
            You&apos;ve reached the end!
          </Typography>
        )}
      </Container>
    );
  }

  // Loaded the default feed
  if (defaultFeedQuery?.data) {
    return (
      <Container maxWidth="md" className={styles.feedContainer}>
        <Grid
          container
          direction="column"
          spacing={2}
          className={styles.feedItemWrapper}
        >
          {defaultFeedQuery.data?.pages?.flatMap((page) =>
            page.explorePublications.items.map((post) => (
              // @ts-ignore TODO: Type is wrong here.
              <FeedItemComponent post={post} key={post.id} />
            ))
          )}
        </Grid>

        {defaultFeedQuery.isFetchingNextPage ? (
          <Typography variant="body2">Loading more...</Typography>
        ) : defaultFeedQuery.hasNextPage ? (
          <Button onClick={() => defaultFeedQuery.fetchNextPage()}>
            Load more
          </Button>
        ) : (
          <Typography variant="body2" className={styles.reachedEnd}>
            You&apos;ve reached the end!
          </Typography>
        )}
      </Container>
    );
  }

  // Loading either of them
  if (defaultFeedQuery?.isLoading || personalFeedQuery?.isLoading) {
    return (
      <Container maxWidth="md" className={styles.feedContainer}>
        <Grid container direction="column" spacing={2}>
          {[...Array(12)].map((_, i) => (
            <Grid item xs={12} key={i} className={styles.feedItemWrapper}>
              <LoadingSkeleton />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return null;
}
