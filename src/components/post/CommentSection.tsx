import { Grid, Typography } from "@mui/material";
import React from "react";
import { usePublicationsQuery } from "../../graphql/generated";
import FeedItemComponent from "../feed/FeedItem";
import styles from "./post.module.css";
import feedStyles from "../feed/feed.module.css";

type Props = {
  publicationId: string;
};

export default function CommentSection({ publicationId }: Props) {
  const { data: comments, isLoading: loadingComments } = usePublicationsQuery({
    request: {
      // Load all comments for this publication
      commentsOf: publicationId,
      limit: 50,
    },
  });

  console.log("comments:", comments);

  return (
    <div className={styles.commentSection}>
      <Typography variant="h3" component="p">
        Comments
      </Typography>

      <Grid container direction="column">
        {loadingComments ? (
          <Typography variant="body1">Loading comments...</Typography>
        ) : (
          comments?.publications.items.map((comment) => (
            <Grid
              item
              xs={12}
              key={comment.id}
              className={feedStyles.feedItemWrapper}
            >
              {/* @ts-ignore TODO: Type is wrong here. */}
              <FeedItemComponent post={comment} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
}
