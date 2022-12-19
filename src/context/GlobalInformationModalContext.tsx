import { createContext, useContext } from "react";

export type ModalState = {
  type: "login" | "success" | "error";
  message: string;
};

const GlobalInformationModalContext = createContext<{
  modalState: ModalState | null;
  setModalState: (modalState: ModalState | null) => void;
}>({
  modalState: null,
  setModalState: () => {},
});

/**
 * Show the user a modal with information about the current state of the app.
 * - Login: User likely encountered an error and needs to login
 * - Success: Something went right, show the user a success message
 * - Error: Something went wrong, show the user the error
 */
export default function GlobalInformationModalContextProvider({
  children,
  modalState,
  setModalState,
}: {
  children: React.ReactNode;
  modalState: ModalState | null;
  setModalState: (modalState: ModalState | null) => void;
}) {
  return (
    <GlobalInformationModalContext.Provider
      value={{
        modalState,
        setModalState,
      }}
    >
      {children}
    </GlobalInformationModalContext.Provider>
  );
}

export const useGlobalInformationModalContext = () =>
  useContext(GlobalInformationModalContext);
