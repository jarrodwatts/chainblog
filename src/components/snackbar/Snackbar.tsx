import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSnackbarContext } from "../../context/SnackbarContext";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarComponent() {
  const { setSnackbarState, snackbarState } = useSnackbarContext();

  return (
    <Snackbar
      open={snackbarState?.open}
      autoHideDuration={6000}
      onClose={() =>
        setSnackbarState({
          open: false,
        })
      }
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={() =>
          setSnackbarState({
            open: false,
          })
        }
        severity={snackbarState?.severity || "info"}
        sx={{ width: "100%" }}
      >
        {snackbarState?.message || "Action completed."}
      </Alert>
    </Snackbar>
  );
}
