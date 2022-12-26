import { Grid, Typography } from "@mui/material";
import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import { PublicationsQuery } from "../../graphql/generated";
import { getFormattedDate } from "../../lib/helper/dates";
import { formatNum, getPreviewText } from "../../lib/helper/format";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"; // Collect
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"; // Comment
import RepeatIcon from "@mui/icons-material/Repeat"; // Mirror
import styles from "../feed/feed.module.css";

type Props = {
  post: PublicationsQuery["publications"]["items"][0];
};

export default function ProfileFeedItem({ post }: Props) {
  return (
    <Link href={`/post/${post.id}`} className={styles.feedItem}>
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
          md={8}
          lg={9}
          className={styles.blogTextContainer}
        >
          <Typography variant="h3" className={styles.blogTitle}>
            {post?.metadata?.name}
          </Typography>

          <div className={styles.authorInfoContainer}>
            <Typography variant="body2" className={styles.authorName}>
              {getFormattedDate(post.createdAt) || "Loading..."}
            </Typography>
          </div>

          <Typography variant="body1">
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
            {formatNum(post?.stats?.totalAmountOfComments)}
          </Typography>
        </div>
        <div className={styles.metricContainer}>
          <RepeatIcon className={styles.metricIcon} />
          <Typography variant="body2" className={styles.metricText}>
            {formatNum(post?.stats?.totalAmountOfMirrors)}
          </Typography>
        </div>
        <div className={styles.metricContainer}>
          <ShoppingBagIcon className={styles.metricIcon} />
          <Typography variant="body2" className={styles.metricText}>
            {formatNum(post?.stats?.totalAmountOfCollects)}
          </Typography>
        </div>
      </div>
    </Link>
  );
}
