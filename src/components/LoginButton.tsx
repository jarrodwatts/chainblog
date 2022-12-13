import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import React from "react";
import { useFollowUserMutation } from "../graphql/generated";
import useLogin from "../lib/auth/useLogin";

export default function LoginButton() {
  const address = useAddress();
  const { mutateAsync: login } = useLogin();
  const { mutateAsync: follow } = useFollowUserMutation();

  // Connect Wallet First
  if (!address) {
    return (
      <div className="flex items-center w-1 mt-2">
        <ConnectWallet accentColor="#f213a4" />
      </div>
    );
  }

  async function doTheFollowLol() {
    const tx = await follow({
      request: {
        follow: [
          {
            profile: "0x010fe3",
          },
        ],
      },
    });

    console.log(tx);
  }

  return (
    <div className="flex items-center w-1 mt-2">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => login()}
      >
        Login
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => doTheFollowLol()}
      >
        Follow
      </button>
    </div>
  );
}
