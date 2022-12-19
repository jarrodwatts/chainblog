import * as React from "react";
import Drawer from "@mui/material/Drawer";
import createStyles from "./create.module.css";
import { Divider, Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import styles from "./create.module.css";
import TagSelector from "./TagSelector";
import { Web3Button } from "@thirdweb-dev/react";
import { LENS_CONTRACT_ADDRESS } from "../../../const/blockchain";
import { LENS_ABI } from "../../../const/abis";
import { useCreatePost } from "../../lib/lens/createPost";

type Props = {
  postMetadata: Record<string, any>;
  setPostMetadata: (metadata: Record<string, any>) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function TemporaryDrawer({
  postMetadata,
  setPostMetadata,
  open,
  setOpen,
}: Props) {
  const { mutateAsync: createPost } = useCreatePost();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  const list = () => (
    <Grid
      container
      direction="column"
      className={createStyles.settingsSidebar}
      role="presentation"
    >
      <Grid item>
        <Typography variant="h3">Publish Post</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">
          Configure your settings before publishing to the blockchain.
        </Typography>
      </Grid>

      <Divider className={styles.divider} />

      {postMetadata.coverImage ? (
        <>
          <Typography variant="body1" className={styles.label}>
            Cover Image
          </Typography>
          <Typography variant="body2" className={styles.tinyLabel}>
            Note: editable in the main post editor.
          </Typography>
          <img
            src={URL.createObjectURL(postMetadata.coverImage)}
            className={styles.sidebarImagePreview}
          />
        </>
      ) : (
        <Typography variant="body1" className={styles.label} color="error">
          No cover image.
        </Typography>
      )}

      <Grid item className={styles.textFieldContainer}>
        <Typography variant="body1" className={styles.label}>
          Title
        </Typography>
        <Typography variant="body2" className={styles.tinyLabel}>
          Note: editable in the main post editor.
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          disabled
          value={postMetadata.title || ""}
        />
      </Grid>

      <Divider className={styles.divider} />

      <Grid item className={styles.textFieldContainer}>
        <Typography variant="body1" className={styles.label}>
          Description
        </Typography>
        <TextField variant="outlined" fullWidth multiline rows={6} />
      </Grid>

      <Grid item className={styles.textFieldContainer}>
        <Typography variant="body1" className={styles.label}>
          Tags
        </Typography>

        <TagSelector
          postMetadata={postMetadata}
          setPostMetadata={setPostMetadata}
        />
      </Grid>

      <Web3Button
        className={styles.publishButton}
        contractAddress={LENS_CONTRACT_ADDRESS}
        contractAbi={LENS_ABI}
        action={async () => await createPost({ ...postMetadata })}
      >
        <Typography variant="h6">Publish Post 🌿</Typography>
      </Web3Button>
    </Grid>
  );

  return (
    <div>
      <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
