import { Button, Typography } from "@mui/material";
import {
  useNetworkMismatch,
  useAddress,
  ConnectWallet,
  useNetwork,
} from "@thirdweb-dev/react";
import React from "react";
import { CHAIN_ID } from "../../../const/blockchain";
import useLogin from "../../lib/auth/useLogin";
import styles from "./signinbutton.module.css";
import { MediaRenderer } from "@thirdweb-dev/react";
import { useLensUserContext } from "../../context/LensUserContext";
import Link from "next/link";

export default function SignInButton() {
  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const {
    data: lensUser,
    isSignedIn,
    isLoading: loadingLensUser,
    error,
  } = useLensUserContext();
  const { mutateAsync: login } = useLogin();

  async function handleLogin() {
    await login();
  }

  // If no wallet is connected,
  if (!address) {
    return <ConnectWallet className={styles.ctaButton} />;
  }

  // If is on wrong network,
  if (isOnWrongNetwork) {
    return (
      <Button
        className={styles.ctaButton}
        onClick={() => switchNetwork?.(CHAIN_ID)}
      >
        Switch Network
      </Button>
    );
  }

  if (!isSignedIn) {
    return (
      <Button
        variant="contained"
        className={styles.signInButton}
        onClick={handleLogin}
      >
        Sign In 🌿
      </Button>
    );
  }

  if (loadingLensUser) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error!</Typography>;
  }

  if (lensUser?.defaultProfile === null) {
    return <Typography variant="body1">No Lens Profile</Typography>;
  }

  return (
    <div className={styles.profileContainer}>
      {/* TODO: Should create profile page and link to it. */}
      <Link
        href={`/profile/${lensUser?.defaultProfile?.handle}`}
        className={styles.profilePicture}
      >
        <MediaRenderer
          // @ts-ignore: Type does exist.
          src={lensUser?.defaultProfile?.picture?.original?.url || ""}
          alt={lensUser?.defaultProfile?.name || "Loading..."}
          className={styles.profilePicture}
        />
      </Link>
    </div>
  );
}
