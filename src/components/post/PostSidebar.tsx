import { Container, Divider, Typography } from "@mui/material";
import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import { defaultProfilePicture } from "../../../const/images";
import { PublicationQuery } from "../../graphql/generated";
import { formatNum } from "../../lib/helper/format";
import FollowButton from "../followbutton/FollowButton";
import PostActionsContainer from "./PostActionsContainer";
import styles from "./post.module.css";

type Props = {
  publication: PublicationQuery;
};

export default function PostSidebar({ publication }: Props) {
  return (
    <Container maxWidth="xs" className={styles.postSidebarContainer}>
      <Typography variant="h3" className={styles.thisAuthorSectionTitle}>
        About the author
      </Typography>

      <div className={styles.postSidebarHeader}>
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

        <div className={styles.postSidebarHeaderContent}>
          <Link
            href={`/profile/${publication.publication?.profile.handle}`}
            className={styles.unstyledLink}
          >
            <Typography variant="h3" className={styles.sidebarAuthorName}>
              {publication?.publication?.profile?.name}
            </Typography>
          </Link>

          <Link
            href={`/profile/${publication.publication?.profile.handle}`}
            className={styles.unstyledLink}
          >
            <Typography variant="body2" className={styles.sidebarAuthorHandle}>
              @{publication?.publication?.profile?.handle}
            </Typography>
          </Link>

          <Typography variant="body1" className={styles.followerCount}>
            <b>
              {formatNum(
                publication?.publication?.profile?.stats.totalFollowers
              )}{" "}
              Followers
            </b>
          </Typography>
        </div>
      </div>
      <Typography variant="body1">
        {publication?.publication?.profile?.bio}
      </Typography>

      <div className={styles.followButtonContainer}>
        <FollowButton profileId={publication?.publication?.profile?.id} />
      </div>

      <Divider className={styles.divider} />

      <Typography variant="h3" className={styles.thisPostSectionTitle}>
        About this post
      </Typography>

      <Typography variant="body2" className={styles.label}>
        What are your thoughts on this post?
      </Typography>

      <PostActionsContainer publication={publication} />
    </Container>
  );
}
