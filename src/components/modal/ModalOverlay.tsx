import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useGlobalInformationModalContext } from "../../context/GlobalInformationModalContext";
import styles from "./modal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import {
  useAddress,
  useNetworkMismatch,
  useNetwork,
  ConnectWallet,
} from "@thirdweb-dev/react";
import useLogin from "../../lib/auth/useLogin";
import { CHAIN_ID } from "../../../const/blockchain";

export default function ModalOverlay() {
  const { modalState, setModalState } = useGlobalInformationModalContext();

  const { mutateAsync: login } = useLogin();
  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  if (!modalState?.type) return null;

  return (
    <div className={styles.globalFog}>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={styles.modalContainer}
      >
        <Button
          onClick={() => setModalState(null)}
          className={styles.closeButtonContainer}
        >
          <CloseIcon color="inherit" />
        </Button>
        {/* Heading */}
        <Grid item>
          <Typography variant="h2">
            {modalState.type === "login"
              ? "Login Required 🌿"
              : modalState.type === "success"
              ? "Success! 🎉"
              : modalState.type === "error"
              ? "Something Failed! 😢"
              : ""}
          </Typography>
        </Grid>

        {/* Subheading */}
        <Grid item className={styles.subheadingContainer}>
          <Typography variant="body1">{modalState.message}</Typography>
        </Grid>

        {/* Sign in button */}
        {modalState.type === "login" ||
          (modalState.type === "error" ? (
            <>
              <Grid item className={styles.subheadingContainer}>
                <Typography variant="body1">
                  Try signing in, and trying again.
                </Typography>
              </Grid>

              <Grid item className={styles.actionButtonContainer}>
                {
                  // If no address
                  !address ? (
                    <ConnectWallet className={styles.actionButton} />
                  ) : // If on wrong network
                  isOnWrongNetwork ? (
                    <Button
                      variant="contained"
                      onClick={() => switchNetwork?.(CHAIN_ID)}
                      className={styles.actionButton}
                    >
                      Switch Network
                    </Button>
                  ) : (
                    // If on correct network
                    <Button
                      variant="contained"
                      onClick={() => login().then(() => setModalState(null))}
                      className={styles.actionButton}
                    >
                      Sign In
                    </Button>
                  )
                }
              </Grid>
            </>
          ) : (
            modalState.actionBtnInfo && (
              <Grid item className={styles.actionButtonContainer}>
                <Button
                  variant="contained"
                  onClick={() => {
                    modalState?.actionBtnInfo?.onClick?.();
                    setModalState(null);
                  }}
                  className={styles.actionButton}
                >
                  {modalState.actionBtnInfo.text}
                </Button>
              </Grid>
            )
          ))}
      </Grid>
    </div>
  );
}
