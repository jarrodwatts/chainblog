/**
 * Context provider for the Lens user.
 * Exposes the user's profile and authentication status
 */

import { createContext, useContext } from "react";

import useLensUser from "../lib/auth/useLensUser";

const LensUserContext = createContext<ReturnType<typeof useLensUser>>(
  {} as ReturnType<typeof useLensUser>
);

export default function LensUserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lensUserQuery = useLensUser();

  return (
    <LensUserContext.Provider value={lensUserQuery}>
      {children}
    </LensUserContext.Provider>
  );
}

export const useLensUserContext = () => useContext(LensUserContext);
