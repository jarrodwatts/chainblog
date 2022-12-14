import { Container, Grid } from "@mui/material";
import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import styles from "./feed.module.css";
import FeedItemComponent from "./FeedItem";
import {
  useProfileFeedQuery,
  PublicationMainFocus,
} from "../../graphql/generated";
import useLensUser from "../../lib/auth/useLensUser";

export default function FeedController() {
  const { data: lensUser, isLoading: loadingUser } = useLensUser();
  const { data: feed, isLoading: loadingFeed } = useProfileFeedQuery(
    {
      request: {
        profileId: lensUser?.defaultProfile?.id,
        // TODO: Below, we get 0 results for some reason?
        // feedEventItemTypes: [FeedEventItemType.Post],
        metadata: {
          mainContentFocus: [PublicationMainFocus.Article],
        },
      },
    },
    {
      enabled: !!lensUser?.defaultProfile?.id,
    }
  );

  console.log(lensUser?.defaultProfile?.id);
  console.log(feed);

  return (
    <Container maxWidth="md" className={styles.feedContainer}>
      <Grid container direction="column" spacing={2}>
        {loadingFeed
          ? [...Array.from({ length: 12 })].map((_, i) => (
              <Grid item xs={12} key={i} className={styles.feedItemWrapper}>
                <LoadingSkeleton />
              </Grid>
            ))
          : feed?.feed.items.map((post) => (
              <Grid item xs={12} key={post.root.id}>
                <FeedItemComponent post={post} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}
