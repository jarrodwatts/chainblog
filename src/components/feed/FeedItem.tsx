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
import Link from "next/link";
import { defaultProfilePicture } from "../../../const/images";

type Props = {
  post: ProfileFeedQuery["feed"]["items"][0]["root"];
};

export default function FeedItemComponent({ post }: Props) {
  return (
    <Link href={`/post/${post.id}`} className={styles.feedItem}>
      <Grid
        container
        item
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid
          item
          xs={12}
          sm={7}
          md={8}
          lg={9}
          className={styles.blogTextContainer}
        >
          <div className={styles.authorInfoContainer}>
            <div className={styles.authorProfilePicture}>
              <MediaRenderer
                src={
                  // @ts-ignore: Type does exist.
                  post?.profile?.picture?.original?.url || defaultProfilePicture
                }
                alt={
                  post?.profile?.name || post?.profile?.handle || "Loading..."
                }
                className={styles.authorProfilePicture}
              />
            </div>

            <div className={styles.authorInfo}>
              <Typography variant="body1" className={styles.authorName}>
                {post?.profile?.name || post?.profile?.handle || "Loading..."}
              </Typography>
              <Typography variant="body2" className={styles.authorName}>
                {post?.profile?.handle || "Loading..."} 🌿{" "}
                {getRelativeTime(post.createdAt) || "Loading..."}
              </Typography>
            </div>
          </div>
          <Typography variant="h3" className={styles.blogTitle}>
            {post?.metadata?.name}
          </Typography>
          <Typography variant="body1" className={styles.blogDescription}>
            {getPreviewText(post?.metadata?.content)}
          </Typography>
        </Grid>
        <Grid xs={12} sm={5} md={4} lg={3} item>
          <MediaRenderer
            src={
              post?.metadata?.image ||
              post?.metadata?.media?.[0]?.original?.url ||
              // @ts-ignore: Type does exist.
              post?.profile?.coverPicture?.original?.url ||
              // @ts-ignore: Type does exist.
              post?.profile?.picture?.original?.url ||
              ""
            }
            className={styles.blogImage}
            alt={post?.metadata?.name || "Loading..."}
          />
        </Grid>
      </Grid>
      <div className={styles.blogFooter}>
        <div className={styles.metricContainer}>
          <ChatBubbleIcon className={styles.metricIcon} />
          <Typography variant="body2" className={styles.metricText}>
            {post?.stats?.totalAmountOfComments}
          </Typography>
        </div>
        <div className={styles.metricContainer}>
          <RepeatIcon className={styles.metricIcon} />
          <Typography variant="body2" className={styles.metricText}>
            {post?.stats?.totalAmountOfMirrors}
          </Typography>
        </div>
        <div className={styles.metricContainer}>
          <ShoppingBagIcon className={styles.metricIcon} />
          <Typography variant="body2" className={styles.metricText}>
            {post?.stats?.totalAmountOfCollects}
          </Typography>
        </div>
      </div>
    </Link>
  );
}
