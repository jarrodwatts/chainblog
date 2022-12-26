import { AlertColor } from "@mui/material";
import { createContext, useContext } from "react";

export type SnackbarState = {
  open: boolean;
  severity?: AlertColor;
  message?: string;
};

const SnackbarContext = createContext<{
  snackbarState: SnackbarState | null;
  setSnackbarState: (snackbarState: SnackbarState | null) => void;
}>({
  snackbarState: null,
  setSnackbarState: () => {},
});

/**
 * Show the user a modal with information about the current state of the app.
 * - Login: User likely encountered an error and needs to login
 * - Success: Something went right, show the user a success message
 * - Error: Something went wrong, show the user the error
 */
export default function SnackbarContextProvider({
  children,
  snackbarState,
  setSnackbarState,
}: {
  children: React.ReactNode;
  snackbarState: SnackbarState | null;
  setSnackbarState: (snackbarState: SnackbarState | null) => void;
}) {
  return (
    <SnackbarContext.Provider
      value={{
        snackbarState,
        setSnackbarState,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
}

export const useSnackbarContext = () => useContext(SnackbarContext);
