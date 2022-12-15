import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import styles from "./feed.module.css";
import FeedItemComponent from "./FeedItem";
import useDynamicFeed from "../../lib/useDynamicFeed";
import useLensUser from "../../lib/auth/useLensUser";

export default function FeedController() {
  const { personalFeedQuery, defaultFeedQuery } = useDynamicFeed();

  const { isSignedIn } = useLensUser();

  if (isSignedIn && personalFeedQuery?.isLoading) {
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

  if (personalFeedQuery?.data) {
    return (
      <Container maxWidth="md" className={styles.feedContainer}>
        <Grid container direction="column" spacing={2}>
          {
            // Get all the posts out of all the pages and map them
            personalFeedQuery.data?.pages.flatMap((page) =>
              page.feed.items.map((post) => (
                <Grid item xs={12} key={post.root.id}>
                  <FeedItemComponent post={post.root} />
                </Grid>
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

  if (defaultFeedQuery?.data) {
    return (
      <Container maxWidth="md" className={styles.feedContainer}>
        <Grid container direction="column" spacing={2}>
          {defaultFeedQuery.data?.pages?.flatMap((page) =>
            page.explorePublications.items.map((post) => (
              <Grid item xs={12} key={post.id}>
                {/* @ts-ignore TODO: Type is wrong here. */}
                <FeedItemComponent post={post} />
              </Grid>
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
