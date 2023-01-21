import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import { fetchData } from "../../../auth-fetcher";
import ProfileView from "../../components/profile/ProfileView";
import {
  ProfileDocument,
  ProfileQuery,
  ProfileQueryVariables,
  PublicationMainFocus,
  PublicationsDocument,
  PublicationsQuery,
  PublicationsQueryVariables,
  PublicationTypes,
} from "../../graphql/generated";

type Props = {
  profile: ProfileQuery;
  posts: PublicationsQuery;
};

export default function PostPage({ profile, posts }: Props) {
  return <ProfileView profile={profile} posts={posts} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;

  const profileQueryResult = await fetchData<
    ProfileQuery,
    ProfileQueryVariables
  >(ProfileDocument, {
    request: {
      handle: id,
    },
  })();

  if (!profileQueryResult.profile) {
    return {
      notFound: true,
    };
  }

  const publicationsQueryResult = await fetchData<
    PublicationsQuery,
    PublicationsQueryVariables
  >(PublicationsDocument, {
    request: {
      profileId: profileQueryResult.profile?.id,
      metadata: {
        mainContentFocus: [PublicationMainFocus.Article],
      },
      publicationTypes: [PublicationTypes.Post],
    },
  })();

  return {
    props: {
      profile: profileQueryResult,
      posts: publicationsQueryResult,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: For now, just return nothing
  return {
    paths: [],
    fallback: "blocking",
  };
};
