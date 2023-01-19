import { useMutation } from "@tanstack/react-query";
import { useAddress, useContract, useSDK } from "@thirdweb-dev/react";
import { SmartContract, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { fetchData } from "../../../auth-fetcher";
import { LENS_ABI } from "../../../const/abis";
import { LENS_CONTRACT_ADDRESS } from "../../../const/blockchain";
import { useGlobalInformationModalContext } from "../../context/GlobalInformationModalContext";
import {
  CreateUnfollowTypedDataDocument,
  CreateUnfollowTypedDataMutation,
  CreateUnfollowTypedDataMutationVariables,
  UnfollowRequest,
} from "../../graphql/generated";
import {
  signTypedDataWithOmittedTypenames,
  splitSignature,
} from "../helper/format";

async function createUnfollowTypedData(request: UnfollowRequest) {
  const result = await fetchData<
    CreateUnfollowTypedDataMutation,
    CreateUnfollowTypedDataMutationVariables
  >(CreateUnfollowTypedDataDocument, {
    request,
  })();

  console.log(result);

  return result.createUnfollowTypedData;
}

async function signUnfollowTypedData(
  sdk: ThirdwebSDK,
  request: UnfollowRequest
) {
  const result = await createUnfollowTypedData(request);
  const typedData = result.typedData;

  const signature = await signTypedDataWithOmittedTypenames(
    sdk,
    typedData.domain,
    typedData.types,
    typedData.value
  );

  return { result, signature };
}

async function unfollow(
  sdk: ThirdwebSDK | undefined,
  unfollowerAddress: string | undefined,
  contract: SmartContract | undefined,
  userId: string | undefined
) {
  if (!sdk || !contract || !unfollowerAddress || !userId) {
    // TODO handle error
    return;
  }

  await createUnfollowTypedData({
    profile: userId,
  });

  const signedResult = await signUnfollowTypedData(sdk, {
    profile: userId,
  });

  const { v, r, s } = splitSignature(signedResult.signature.signature);
  const value = signedResult.result.typedData.value;

  // TODO: This function errors out: Message: Internal JSON-RPC error.
  const tx = await contract.call("burnWithSig", value.tokenId, {
    v,
    r,
    s,
    deadline: value.deadline,
  });

  console.log("unfollowed", tx);
}

export function useUnfollowUser() {
  const sdk = useSDK();
  const address = useAddress();
  const { setModalState } = useGlobalInformationModalContext();
  const { contract } = useContract(LENS_CONTRACT_ADDRESS, LENS_ABI);

  return useMutation(
    (userId: string) => unfollow(sdk, address, contract, userId),
    {
      onError: async (error) => {
        console.error(error);
        setModalState({
          type: "error",
          message: "Failed to unfollow user.",
        });
      },
    }
  );
}
