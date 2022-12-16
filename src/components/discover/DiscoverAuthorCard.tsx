import { Typography } from "@mui/material";
import { MediaRenderer, Web3Button } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import { LENS_ABI } from "../../../const/abis";
import { LENS_CONTRACT_ADDRESS } from "../../../const/blockchain";
import {
  defaultCoverPhoto,
  defaultProfilePicture,
} from "../../../const/images";
import { ExploreProfilesQuery } from "../../graphql/generated";
import styles from "./discover.module.css";

type Props = {
  author: ExploreProfilesQuery["exploreProfiles"]["items"][0];
};

export default function DiscoverAuthorCard({ author }: Props) {
  return (
    <div className={styles.authorCard}>
      {/* Cover photo */}
      <Link
        className={`${styles.coverPhotoContainer}
          ${styles.unstyledLink}`}
        href={`/profile/${author.handle}`}
      >
        <MediaRenderer
          // @ts-ignore: Type does exist.
          src={author.coverPicture?.original?.url || defaultCoverPhoto}
          alt={author.name || author.handle || "Cover photo"}
          style={{
            borderRadius: "8px 8px 0 0",
            width: "100%",
            height: 128,
            objectFit: "cover",
          }}
        />
      </Link>

      {/* Profile photo */}
      <Link
        className={`${styles.profilePhotoContainer}
        ${styles.unstyledLink}`}
        href={`/profile/${author.handle}`}
      >
        <MediaRenderer
          // @ts-ignore: Type does exist.
          src={author.picture?.original?.url || defaultProfilePicture}
          alt={author.name || author.handle || "Profile photo"}
          style={{
            borderRadius: "50%",
            width: 64,
            height: 64,
            border: "3px solid #090909",
            backgroundColor: "rgba(9, 9, 9, 0.5)",
          }}
        />
      </Link>

      {/* Name */}
      <Link className={styles.unstyledLink} href={`/profile/${author.handle}`}>
        <Typography variant="h2" className={styles.name}>
          {author.name || author.handle || "Anon User"}
        </Typography>
      </Link>

      <Typography variant="body2" className={styles.handle}>
        @{author.handle}
      </Typography>

      <Web3Button
        contractAddress={LENS_CONTRACT_ADDRESS}
        contractAbi={LENS_ABI}
        action={() => {
          // TODO: Add follow logic
        }}
        className={styles.followButton}
      >
        {author.isFollowedByMe ? "Unfollow" : "Follow"}
      </Web3Button>
    </div>
  );
}
