import { Typography, Chip, Container } from "@mui/material";
import { MediaRenderer, Web3Button } from "@thirdweb-dev/react";
import React from "react";
import { ProfileQuery } from "../../graphql/generated";
import styles from "./profile.module.css";
import {
  defaultCoverPhoto,
  defaultProfilePicture,
} from "../../../const/images";
import { LENS_CONTRACT_ADDRESS } from "../../../const/blockchain";
import { LENS_ABI } from "../../../const/abis";

type Props = {
  profile: ProfileQuery;
};

export default function ProfileHeader({ profile }: Props) {
  console.log(profile);

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

            <Web3Button
              contractAddress={LENS_CONTRACT_ADDRESS}
              contractAbi={LENS_ABI}
              action={() => {}}
              className={styles.followButton}
            >
              {profile.profile?.isFollowedByMe ? "Unfollow" : "Follow"}
            </Web3Button>
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
        </div>
      </div>
    </Container>
  );
}
