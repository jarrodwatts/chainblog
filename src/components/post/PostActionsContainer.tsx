import React from "react";
import {
  PublicationQuery,
  ReactionTypes,
  useAddReactionMutation,
} from "../../graphql/generated";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"; // Collect
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"; // Comment
import RepeatIcon from "@mui/icons-material/Repeat"; // Mirror
import ThumbDownIcon from "@mui/icons-material/ThumbDown"; // Downvote
import ThumbUpIcon from "@mui/icons-material/ThumbUp"; // Upv
import ShareIcon from "@mui/icons-material/Share";
import styles from "./post.module.css";
import { Typography, Tooltip, ButtonBase, Button } from "@mui/material";
import { useLensUserContext } from "../../context/LensUserContext";
import {
  ConnectWallet,
  useAddress,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { CHAIN_ID } from "../../../const/blockchain";
import { useGlobalInformationModalContext } from "../../context/GlobalInformationModalContext";
import { useSnackbarContext } from "../../context/SnackbarContext";
import { useQueryClient } from "@tanstack/react-query";
import { useMirrorPost } from "../../lib/lens/mirrorPost";

type Props = {
  publication: PublicationQuery;
};

export default function PostActionsContainer({ publication }: Props) {
  const { data: lensUser } = useLensUserContext();

  // TODO: Invalidate reaction queries upon reaction.
  // Requires to change SSG section to use React query
  const queryClient = useQueryClient();
  const address = useAddress();
  const [, switchNetwork] = useNetwork();
  const networkMismatch = useNetworkMismatch();
  const { setModalState } = useGlobalInformationModalContext();

  const { mutateAsync: addReaction, isLoading: addingReaction } =
    useAddReactionMutation();

  const { mutateAsync: createMirror, isLoading: creatingMirror } =
    useMirrorPost();

  const { setSnackbarState } = useSnackbarContext();

  const actions = [
    {
      label: "Upvote",
      icon: <ThumbUpIcon />,
      onClick: async () => {
        return await addReaction(
          {
            request: {
              publicationId: publication.publication?.id,
              reaction: ReactionTypes.Upvote,
              profileId: lensUser?.defaultProfile?.id,
            },
          },
          {
            onError: async (error) => {
              setModalState({
                type: "error",
                message: ((error as Error).message as string) || "",
              });
            },
            onSuccess() {
              setSnackbarState({
                open: true,
                severity: "success",
                message: "Upvoted post successfully!",
              });
            },
          }
        );
      },
    },
    {
      label: "Downvote",
      icon: <ThumbDownIcon />,
      onClick: async () => {
        return await addReaction(
          {
            request: {
              publicationId: publication.publication?.id,
              reaction: ReactionTypes.Downvote,
              profileId: lensUser?.defaultProfile?.id,
            },
          },
          {
            onError: async (error) => {
              setModalState({
                type: "error",
                message: ((error as Error).message as string) || "",
              });
            },
            onSuccess() {
              setSnackbarState({
                open: true,
                severity: "error",
                message: "Downvoted post successfully!",
              });
            },
          }
        );
      },
    },
    {
      label: "Collect",
      icon: <ShoppingBagIcon />,
    },
    {
      label: "Mirror",
      icon: <RepeatIcon />,
      onClick: async () => {
        return await createMirror(
          {
            publicationId: publication.publication?.id,
            userId: lensUser?.defaultProfile?.id,
          },
          {
            onError: async (error) => {
              setModalState({
                type: "error",
                message: ((error as Error).message as string) || "",
              });
            },
            onSuccess() {
              setSnackbarState({
                open: true,
                severity: "success",
                message: "Mirrored post successfully!",
              });
            },
          }
        );
      },
    },
    {
      label: "Comment",
      icon: <ChatBubbleIcon />,
    },
    {
      label: "Share",
      icon: <ShareIcon />,
      onClick: () => {
        if (navigator.share) {
          navigator
            .share({
              title: publication?.publication?.metadata?.name || "",
              text: publication?.publication?.metadata?.content || "",
            })
            .then(() => console.log("Successful share"))
            .catch((error) => console.log("Error sharing", error));
        }
      },
    },
  ];

  if (!address) {
    return <ConnectWallet />;
  }

  if (networkMismatch) {
    return (
      <Button
        className={styles.ctaButton}
        onClick={() => switchNetwork?.(CHAIN_ID)}
      >
        Switch Network
      </Button>
    );
  }

  return (
    <Typography variant="h3" className={styles.sidebarAuthorName}>
      <div className={styles.actionContainer}>
        {actions.map((action) => (
          <Tooltip title={action.label} key={action.label}>
            <ButtonBase
              className={styles.action}
              onClick={() => action.onClick?.()}
            >
              {action.icon}
            </ButtonBase>
          </Tooltip>
        ))}
      </div>
    </Typography>
  );
}
