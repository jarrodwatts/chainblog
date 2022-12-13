import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import React from "react";
import { useFollowUserMutation } from "../graphql/generated";
import useLogin from "../lib/auth/useLogin";

export default function LoginButton() {
  const address = useAddress();
  const { mutateAsync: login } = useLogin();

  // Connect Wallet First
  if (!address) {
    return (
      <div className="flex items-center mt-2">
        <ConnectWallet accentColor="#f213a4" />
      </div>
    );
  }

  return (
    <div className="flex items-center mt-5">
      <button
        className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded drop-shadow-md"
        onClick={() => login()}
      >
        Login with Lens
      </button>
    </div>
  );
}
