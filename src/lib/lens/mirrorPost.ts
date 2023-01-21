import { useMutation } from "@tanstack/react-query";
import { useAddress, useContract, useSDK } from "@thirdweb-dev/react";
import { SmartContract, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { fetchData } from "../../../auth-fetcher";
import { LENS_ABI } from "../../../const/abis";
import { LENS_CONTRACT_ADDRESS } from "../../../const/blockchain";
import { useGlobalInformationModalContext } from "../../context/GlobalInformationModalContext";
import {
  CreateMirrorRequest,
  CreateMirrorTypedDataDocument,
  CreateMirrorTypedDataMutation,
  CreateMirrorTypedDataMutationVariables,
  FollowRequest,
} from "../../graphql/generated";
import {
  signTypedDataWithOmittedTypenames,
  splitSignature,
} from "../helper/format";

async function createMirrorTypedData(request: CreateMirrorRequest) {
  const result = await fetchData<
    CreateMirrorTypedDataMutation,
    CreateMirrorTypedDataMutationVariables
  >(CreateMirrorTypedDataDocument, {
    request,
  })();

  console.log(result);

  return result.createMirrorTypedData;
}

async function signMirrorTypedData(
  sdk: ThirdwebSDK,
  request: CreateMirrorRequest
) {
  const result = await createMirrorTypedData(request);
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

async function mirror(
  sdk: ThirdwebSDK | undefined,
  followerAddress: string | undefined,
  contract: SmartContract | undefined,
  userId: string | undefined,
  publicationId: string | undefined
) {
  if (!sdk || !contract || !followerAddress || !userId) {
    // TODO handle error
    return;
  }

  const signedResult = await signMirrorTypedData(sdk, {
    profileId: userId,
    publicationId: publicationId,
  });

  const { v, r, s } = splitSignature(signedResult.signature.signature);
  const value = signedResult.result.typedData.value;

  const tx = await contract.call("mirrorWithSig", {
    profileId: value.profileId,
    profileIdPointed: value.profileIdPointed,
    pubIdPointed: value.pubIdPointed,
    referenceModuleData: value.referenceModuleData,
    referenceModule: value.referenceModule,
    referenceModuleInitData: value.referenceModuleInitData,
    sig: {
      v,
      r,
      s,
      deadline: value.deadline,
    },
  });

  console.log("Created follow", tx);
}

export function useMirrorPost() {
  const sdk = useSDK();
  const address = useAddress();
  const { setModalState } = useGlobalInformationModalContext();
  const { contract } = useContract(LENS_CONTRACT_ADDRESS, LENS_ABI);

  return useMutation(
    ({ userId, publicationId }: { userId: string; publicationId: string }) =>
      mirror(sdk, address, contract, userId, publicationId),
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
