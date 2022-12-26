import { Grid, Typography } from "@mui/material";
import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import { defaultProfilePicture } from "../../../const/images";
import { PublicationQuery } from "../../graphql/generated";
import { getFormattedDate } from "../../lib/helper/dates";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"; // Collect
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"; // Comment
import RepeatIcon from "@mui/icons-material/Repeat"; // Mirror
import ThumbDownIcon from "@mui/icons-material/ThumbDown"; // Downvote
import ThumbUpIcon from "@mui/icons-material/ThumbUp"; // Upvote
import styles from "./post.module.css";
import { formatNum } from "../../lib/helper/format";

type Props = {
  publication: PublicationQuery;
};

export default function PostHeader({ publication }: Props) {
  console.log(publication);

  return (
    <div className={styles.postHeaderContainer}>
      <MediaRenderer
        src={
          publication?.publication?.metadata?.media?.[0]?.original?.url ||
          // @ts-ignore: Type does exist.
          publication.publication?.profile.coverPicture?.original?.url ||
          // @ts-ignore: Type does exist.
          publication.publication?.profile.picture?.original?.url ||
          ""
        }
        className={styles.postImage}
        alt={
          publication?.publication?.metadata?.name || "Publication cover image"
        }
      />

      <Typography variant="h1" className={styles.postTitle}>
        {publication?.publication?.metadata?.name}
      </Typography>

      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={2}
        className={styles.postMetadataContainer}
      >
        {/* Profile picture and name */}
        <Grid item>
          <Link
            href={`/profile/${publication.publication?.profile.handle}`}
            className={styles.unstyledLink}
          >
            <MediaRenderer
              src={
                // @ts-ignore: Type does exist.
                publication?.publication?.profile?.picture?.original?.url ||
                defaultProfilePicture
              }
              className={styles.authorProfilePicture}
              alt={
                publication?.publication?.profile?.name ||
                "Author profile picture"
              }
            />
          </Link>
        </Grid>

        <Grid item>
          <Link
            href={`/profile/${publication.publication?.profile.handle}`}
            className={styles.unstyledLink}
          >
            <Typography variant="body1" className={styles.authorName}>
              {publication?.publication?.profile?.name ||
                publication?.publication?.profile?.handle ||
                "Unknown Author"}
            </Typography>
          </Link>
        </Grid>

        <Grid item>
          <Typography variant="body2" className={styles.secondaryMetadata}>
            {getFormattedDate(publication?.publication?.createdAt) ||
              "A long time ago"}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={2}
        className={styles.postMetadataContainer}
      >
        <Grid item className={styles.statContainer}>
          <ThumbUpIcon />
          <Typography variant="body1" className={styles.secondaryMetadata}>
            <b>{formatNum(publication.publication?.stats.totalUpvotes)}</b>{" "}
            Upvotes
          </Typography>
        </Grid>{" "}
        <Grid item className={styles.statContainer}>
          <ThumbDownIcon />
          <Typography variant="body1" className={styles.secondaryMetadata}>
            <b>{formatNum(publication.publication?.stats.totalDownvotes)}</b>{" "}
            Downvotes
          </Typography>
        </Grid>{" "}
        <Grid item className={styles.statContainer}>
          <ShoppingBagIcon />
          <Typography variant="body1" className={styles.secondaryMetadata}>
            <b>
              {formatNum(publication.publication?.stats.totalAmountOfCollects)}
            </b>{" "}
            Collects
          </Typography>
        </Grid>{" "}
        <Grid item className={styles.statContainer}>
          <RepeatIcon />
          <Typography variant="body1" className={styles.secondaryMetadata}>
            <b>
              {formatNum(publication.publication?.stats.totalAmountOfMirrors)}
            </b>{" "}
            Mirrors
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
