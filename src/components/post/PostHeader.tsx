import { Grid, Typography } from "@mui/material";
import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import { defaultProfilePicture } from "../../../const/images";
import { PublicationQuery } from "../../graphql/generated";
import { getFormattedDate } from "../../lib/helper/dates";
import styles from "./post.module.css";

type Props = {
  publication: PublicationQuery;
};

export default function PostHeader({ publication }: Props) {
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

      <Grid container direction="row" alignItems="center" spacing={2}>
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
    </div>
  );
}
