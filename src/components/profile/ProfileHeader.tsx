import { Typography, Chip, Container } from "@mui/material";
import { MediaRenderer } from "@thirdweb-dev/react";
import React from "react";
import { ProfileQuery } from "../../graphql/generated";
import styles from "./profile.module.css";
import {
  defaultCoverPhoto,
  defaultProfilePicture,
} from "../../../const/images";
import FollowButton from "../followbutton/FollowButton";

type Props = {
  profile: ProfileQuery;
};

export default function ProfileHeader({ profile }: Props) {
  return (
    <Container maxWidth="md">
      <div className={styles.profileHeaderContainer}>
        <div className={styles.imageWithGradient}>
          <MediaRenderer // @ts-ignore: Type does exist.
            src={
              // @ts-ignore: Type does exist.
              profile.profile?.coverPicture?.original?.url || defaultCoverPhoto
            }
            alt="Profile cover picture"
            className={styles.coverPhoto}
          />
        </div>

        <div className={styles.profileMetadataContainer}>
          <div className={styles.pictureAndActionsContainer}>
            <MediaRenderer
              src={
                // @ts-ignore: Type does exist.
                profile.profile?.picture?.original?.url || defaultProfilePicture
              }
              alt="Profile picture"
              className={styles.profilePhoto}
            />

            <FollowButton profileId={profile.profile?.id} />
          </div>

          <Typography variant="h1" className={styles.profileName}>
            {profile.profile?.name}
          </Typography>

          <div className={styles.handleAndFollowsYouContainer}>
            <Typography variant="body2" className={styles.profileHandle}>
              @{profile.profile?.handle}
            </Typography>

            {profile?.profile?.isFollowing && (
              <Chip
                label="Follows You"
                variant="outlined"
                className={styles.followsYouPill}
              />
            )}
          </div>
          <Typography variant="body1" className={styles.profileBio}>
            {profile.profile?.bio}
          </Typography>

          <div className={styles.followersAndFollowing}>
            <Typography variant="body1" className={styles.followers}>
              <b>{profile.profile?.stats.totalFollowers}</b> Followers
            </Typography>
            <Typography variant="body1" className={styles.following}>
              <b>{profile.profile?.stats.totalFollowing}</b> Following
            </Typography>
            <Typography variant="body1" className={styles.following}>
              <b>{profile.profile?.stats.totalPosts}</b> Posts
            </Typography>
          </div>
        </div>
      </div>
    </Container>
  );
}
