import React from "react";
import {
  useExploreProfilesQuery,
  useFollowUserMutation,
} from "../graphql/generated";

export default function Home() {
  const { data, isLoading, error } = useExploreProfilesQuery();
  const { mutate } = useFollowUserMutation();

  mutate({
    request: {
      follow: [
        {
          profile: "jarrodwatts.eth",
        },
      ],
    },
  });

  return <h1 className="text-3xl font-bold underline ">Hello world!</h1>;
}
