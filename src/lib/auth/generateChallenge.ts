import { fetchData } from "../../../auth-fetcher";
import {
  ChallengeQuery,
  ChallengeQueryVariables,
  ChallengeDocument,
} from "../../graphql/generated";

export default async function generateChallenge(address: string) {
  return await fetchData<ChallengeQuery, ChallengeQueryVariables>(
    ChallengeDocument,
    {
      request: {
        address,
      },
    }
  )();
}
