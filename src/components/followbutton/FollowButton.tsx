import { useAddress, Web3Button } from "@thirdweb-dev/react";
import React from "react";
import { LENS_ABI } from "../../../const/abis";
import { LENS_CONTRACT_ADDRESS } from "../../../const/blockchain";
import { useDoesFollowQuery } from "../../graphql/generated";
import { useFollowUser } from "../../lib/lens/followUser";
import { useUnfollowUser } from "../../lib/lens/unfollowUser";
import styles from "./followbutton.module.css";

type Props = {
  profileId: string;
};

export default function FollowButton({ profileId }: Props) {
  const address = useAddress();

  const { data, isLoading } = useDoesFollowQuery(
    {
      request: {
        followInfos: [
          {
            followerAddress: address,
            profileId,
          },
        ],
      },
    },
    {
      enabled: !!address && !!profileId,
    }
  );

  const doesFollow = data?.doesFollow[0].follows;

  console.log(doesFollow);
  const { mutateAsync: follow } = useFollowUser();
  const { mutateAsync: unfollow } = useUnfollowUser();

  return (
    <Web3Button
      contractAddress={LENS_CONTRACT_ADDRESS}
      contractAbi={LENS_ABI}
      action={
        doesFollow
          ? async () => {
              return await unfollow(profileId);
            }
          : async () => {
              return await follow(profileId);
            }
      }
      className={styles.followButton}
    >
      {isLoading ? "Loading..." : doesFollow ? "Unfollow" : "Follow"}
    </Web3Button>
  );
}
