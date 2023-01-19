import { useMutation } from "@tanstack/react-query";
import { useAddress, useContract, useSDK } from "@thirdweb-dev/react";
import { SmartContract, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { fetchData } from "../../../auth-fetcher";
import { LENS_ABI } from "../../../const/abis";
import { LENS_CONTRACT_ADDRESS } from "../../../const/blockchain";
import { useGlobalInformationModalContext } from "../../context/GlobalInformationModalContext";
import {
  CreateFollowTypedDataDocument,
  CreateFollowTypedDataMutation,
  CreateFollowTypedDataMutationVariables,
  FollowRequest,
} from "../../graphql/generated";
import {
  signTypedDataWithOmittedTypenames,
  splitSignature,
} from "../helper/format";

async function createFollowTypedData(request: FollowRequest) {
  const result = await fetchData<
    CreateFollowTypedDataMutation,
    CreateFollowTypedDataMutationVariables
  >(CreateFollowTypedDataDocument, {
    request,
  })();

  console.log(result);

  return result.createFollowTypedData;
}

async function signFollowTypedData(sdk: ThirdwebSDK, request: FollowRequest) {
  const result = await createFollowTypedData(request);
  console.log(result);
  const typedData = result.typedData;

  const signature = await signTypedDataWithOmittedTypenames(
    sdk,
    typedData.domain,
    typedData.types,
    typedData.value
  );

  return { result, signature };
}

async function follow(
  sdk: ThirdwebSDK | undefined,
  followerAddress: string | undefined,
  contract: SmartContract | undefined,
  userId: string | undefined
) {
  if (!sdk || !contract || !followerAddress || !userId) {
    // TODO handle error
    return;
  }

  const signedResult = await signFollowTypedData(sdk, {
    follow: [
      {
        profile: userId,
      },
    ],
  });

  const { v, r, s } = splitSignature(signedResult.signature.signature);
  const value = signedResult.result.typedData.value;

  const tx = await contract.call("followWithSig", {
    follower: followerAddress,
    profileIds: [userId],
    datas: value.datas,
    sig: {
      v,
      r,
      s,
      deadline: value.deadline,
    },
  });

  console.log("Created follow", tx);
}

export function useFollowUser() {
  const sdk = useSDK();
  const address = useAddress();
  const { setModalState } = useGlobalInformationModalContext();
  const { contract } = useContract(LENS_CONTRACT_ADDRESS, LENS_ABI);

  return useMutation(
    (userId: string) => follow(sdk, address, contract, userId),
    {
      onError: async (error) => {
        setModalState({
          type: "error",
          message: ((error as Error).message as string) || "",
        });
      },
    }
  );
}
