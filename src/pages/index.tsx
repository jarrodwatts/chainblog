import React from "react";
import LoginButton from "../components/LoginButton";
import {
  useDefaultProfileQuery,
  useExploreProfilesQuery,
} from "../graphql/generated";
import useLogin from "../lib/auth/useLogin";

export default function Home() {
  const { data, isLoading, error } = useDefaultProfileQuery({
    request: {
      ethereumAddress: "0x470FAF7c48203276eCD3fF1f3C43894f66288574",
    },
  });

  const { data: profiles } = useExploreProfilesQuery();

  console.log(profiles);

  // console.log({ data, isLoading, error });

  return (
    <div>
      <h1 className="text-3xl font-bold underline ">Hello world!</h1>
      <LoginButton />
    </div>
  );
}
