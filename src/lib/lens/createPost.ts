import { SmartContract, ThirdwebSDK } from "@thirdweb-dev/sdk";
import {
  CreatePostTypedDataDocument,
  CreatePostTypedDataMutation,
  CreatePostTypedDataMutationVariables,
  CreatePublicPostRequest,
  PublicationMainFocus,
} from "../../graphql/generated";
import uploadToIpfs from "../uploadToIpfs";
import { fetchData } from "../../../auth-fetcher";
import {
  signTypedDataWithOmittedTypenames,
  splitSignature,
} from "../helper/format";
import { v4 as uuidv4 } from "uuid";
import { useLensUserContext } from "../../context/LensUserContext";
import { useContract, useSDK } from "@thirdweb-dev/react";
import { LENS_CONTRACT_ADDRESS } from "../../../const/blockchain";
import { LENS_ABI } from "../../../const/abis";
import { useMutation } from "@tanstack/react-query";
import { useGlobalInformationModalContext } from "../../context/GlobalInformationModalContext";
import { useRouter } from "next/router";

async function createPostTypedData(request: CreatePublicPostRequest) {
  const result = await fetchData<
    CreatePostTypedDataMutation,
    CreatePostTypedDataMutationVariables
  >(CreatePostTypedDataDocument, {
    request,
  })();

  return result.createPostTypedData;
}

async function signCreatePostTypedData(
  sdk: ThirdwebSDK,
  request: CreatePublicPostRequest
) {
  const result = await createPostTypedData(request);
  const typedData = result.typedData;

  const signature = await signTypedDataWithOmittedTypenames(
    sdk,
    typedData.domain,
    typedData.types,
    typedData.value
  );

  return { result, signature };
}

export default async function createPost(
  sdk: ThirdwebSDK | undefined,
  profileId: string | undefined,
  contract: SmartContract | undefined,
  postMetadata: Record<string, any>
) {
  // TODO: handle errors
  if (!sdk || !contract) {
    // Throw error for hook
    throw new Error("SDK or smart contract not initialized.");
  }

  if (!profileId) {
    // Throw error for hook
    throw new Error("No lens user found.");
  }

  // TODO: Make upload requests parallel or batched
  const ipfsCoverUri = await uploadToIpfs(postMetadata.coverImage);
  const ipfsMetadataUri = await uploadToIpfs({
    ...postMetadata,
    version: "2.0.0",
    mainContentFocus: PublicationMainFocus.Article,
    description: postMetadata.description || "Blog post made on chainblog.io",
    metadata_id: uuidv4(),
    locale: "en-US",
    content: postMetadata.content || "Blog post made on chainblog.io",
    external_url: null,
    image: ipfsCoverUri,
    imageMimeType: null,
    name: postMetadata.title,
    attributes: [],
    tags: postMetadata.tags || [],
  });

  const signedResult = await signCreatePostTypedData(sdk, {
    collectModule: {
      // TODO: Collection modules should be configurable
      freeCollectModule: {
        followerOnly: false,
      },
    },
    referenceModule: {
      // TODO: Reference modules should be configurable
      followerOnlyReferenceModule: false,
    },
    contentURI: ipfsMetadataUri,
    profileId: profileId,
  });

  console.log("create post: signedResult", signedResult);

  const typedData = signedResult.result.typedData;
  const { v, r, s } = splitSignature(signedResult.signature.signature);

  const tx = await contract.call("postWithSig", {
    profileId: typedData.value.profileId,
    contentURI: typedData.value.contentURI,
    collectModule: typedData.value.collectModule,
    collectModuleInitData: typedData.value.collectModuleInitData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleInitData: typedData.value.referenceModuleInitData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });

  console.log("create post: tx hash", tx);
}

// Export a react query mutation out of this function
export function useCreatePost() {
  const sdk = useSDK();
  const { data: lensProfile } = useLensUserContext();
  const { setModalState } = useGlobalInformationModalContext();
  const { contract } = useContract(LENS_CONTRACT_ADDRESS, LENS_ABI);
  const router = useRouter();

  return useMutation(
    (postMetadata: Record<string, any>) =>
      createPost(sdk, lensProfile?.defaultProfile?.id, contract, postMetadata),
    {
      onError: async (error) => {
        setModalState({
          type: "error",
          message: ((error as Error).message as string) || "",
        });
      },
      onSuccess: async () => {
        setModalState({
          type: "success",
          message: "Post created successfully!",
          actionBtnInfo: {
            onClick: () =>
              router.push(`/profile/${lensProfile?.defaultProfile?.handle}`),
            text: "View Profile",
          },
        });
      },
    }
  );
}
