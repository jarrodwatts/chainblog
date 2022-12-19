import React from "react";
import { ProfileQuery, PublicationsQuery } from "../../graphql/generated";
import ProfileFeed from "./ProfileFeed";
import ProfileHeader from "./ProfileHeader";

type Props = {
  profile: ProfileQuery;
  posts: PublicationsQuery;
};

export default function ProfileView({ profile, posts }: Props) {
  console.log(posts);
  return (
    <>
      <ProfileHeader profile={profile} />
      <ProfileFeed posts={posts} />
    </>
  );
}
