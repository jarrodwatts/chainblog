import React from "react";
import { MediaRenderer } from "@thirdweb-dev/react";
import styles from "./feed.module.css";
import { Grid, Typography } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"; // Collect
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"; // Comment
import RepeatIcon from "@mui/icons-material/Repeat"; // Mirror
import { ProfileFeedQuery } from "../../graphql/generated";
import { getRelativeTime } from "../../lib/helper/dates";
import { getPreviewText } from "../../lib/helper/format";

type Props = {
  post: ProfileFeedQuery["feed"]["items"][0];
};

export default function FeedItemComponent({ post }: Props) {
  return (
    <div className={styles.feedItem}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid
          item
          xs={12}
          sm={7}
          md={4}
          lg={9}
          className={styles.blogTextContainer}
        >
          <div className={styles.authorInfoContainer}>
            <div className={styles.authorProfilePicture}>
              <MediaRenderer
                // @ts-ignore: Type does exist.
                src={post.root?.profile?.picture?.original?.url || ""}
                alt={
                  post.root?.profile?.name ||
                  post.root?.profile?.handle ||
                  "Loading..."
                }
                className={styles.authorProfilePicture}
              />
            </div>

            <div className={styles.authorInfo}>
              <Typography variant="body1" className={styles.authorName}>
                {post.root?.profile?.name ||
                  post.root?.profile?.handle ||
                  "Loading..."}
              </Typography>
              <Typography variant="body2" className={styles.authorName}>
                {post.root?.profile?.handle || "Loading..."} 🌿{" "}
                {getRelativeTime(post.root.createdAt) || "Loading..."}
              </Typography>
            </div>
          </div>
          <Typography variant="h3" className={styles.blogTitle}>
            {post.root?.metadata?.name}
          </Typography>
          <Typography variant="body1">
            {getPreviewText(post.root?.metadata?.content)}
          </Typography>
        </Grid>
        <Grid xs={12} sm={5} md={8} lg={3} item>
          <MediaRenderer
            src={
              post.root?.metadata?.media?.[0]?.original?.url ||
              // @ts-ignore: Type does exist.
              post.root?.profile?.coverPicture?.original?.url ||
              // @ts-ignore: Type does exist.
              post.root?.profile?.picture?.original?.url ||
              ""
            }
            className={styles.blogImage}
            alt={post.root?.metadata?.name || "Loading..."}
          />
        </Grid>
      </Grid>
      <div className={styles.blogFooter}>
        <div className={styles.metricContainer}>
          <ChatBubbleIcon className={styles.metricIcon} />
          <Typography variant="body2" className={styles.metricText}>
            {post.root?.stats?.totalAmountOfComments}
          </Typography>
        </div>
        <div className={styles.metricContainer}>
          <RepeatIcon className={styles.metricIcon} />
          <Typography variant="body2" className={styles.metricText}>
            {post.root?.stats?.totalAmountOfMirrors}
          </Typography>
        </div>
        <div className={styles.metricContainer}>
          <ShoppingBagIcon className={styles.metricIcon} />
          <Typography variant="body2" className={styles.metricText}>
            {post.root?.stats?.totalAmountOfCollects}
          </Typography>
        </div>
      </div>
    </div>
  );
}
