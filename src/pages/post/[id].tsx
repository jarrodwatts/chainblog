import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import { fetchData } from "../../../auth-fetcher";
import PostView from "../../components/post/PostView";
import {
  PublicationQuery,
  PublicationQueryVariables,
  PublicationDocument,
} from "../../graphql/generated";

type Props = {
  publication: PublicationQuery;
};

export default function PostPage({ publication }: Props) {
  return <PostView publication={publication} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;

  const publicationQueryResult = await fetchData<
    PublicationQuery,
    PublicationQueryVariables
  >(PublicationDocument, {
    request: {
      publicationId: id,
    },
  })();

  console.log(PublicationDocument);

  return {
    props: {
      publication: publicationQueryResult,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: Hmmmmmmmmmmmmmmmm get all post IDs from a query or smthng?
  // For now, just return nothing
  return {
    paths: [],
    fallback: "blocking",
  };
};
