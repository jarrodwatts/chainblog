import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { useGetAccessTokenMutation } from "../../graphql/generated";
import generateChallenge from "./generateChallenge";
import { setAccessTokenToStorage } from "./helpers";

/**
 * This function begins the full login flow for the user.
 * 1) Generate a challenge for the user to sign
 * 2) Use the signature from the challenge to get an access token
 * 3) Store the access token in local storage
 */
export default function useLogin() {
  const sdk = useSDK();
  const address = useAddress();
  const queryClient = useQueryClient();

  const { mutateAsync: getAccessToken } = useGetAccessTokenMutation();

  async function login() {
    if (!address) {
      console.error("No address found. Cannot generateChallenge");
      return null;
    }

    if (!sdk) {
      console.error("SDK not initialized in useLogin");
      return null;
    }

    // Generate a challenge for the user to sign
    const { challenge } = await generateChallenge(address);

    if (!challenge) {
      console.error("Failed to get challenge from Lens");
      return null;
    }

    console.log("Logging in...");
    console.log("Challenge:", challenge);

    // Sign the challenge message
    const signature = await sdk?.wallet?.sign(challenge.text);

    console.log("Requesting access token:", { address, signature });

    // Now, send the challenge and signature to the Lens API to get an access token
    const { accessToken, refreshToken } = (
      await getAccessToken({
        request: {
          address,
          signature,
        },
      })
    ).authenticate;

    // Store the access token in local storage
    setAccessTokenToStorage(accessToken, refreshToken);

    // Invalidate the query so that the user is logged in
    queryClient.invalidateQueries({
      queryKey: ["lensUser"],
    });
  }

  // Return a useMutation hook that will call the login function
  return useMutation(login);
}
