import { Container } from "@mui/material";
import React from "react";
import { PublicationQuery } from "../../graphql/generated";
import MarkdownPreview from "./MarkdownPreview";
import PostHeader from "./PostHeader";

type Props = {
  publication: PublicationQuery;
};

export default function PostView({ publication }: Props) {
  return (
    <Container maxWidth="md">
      <PostHeader publication={publication} />
      <MarkdownPreview
        content={publication?.publication?.metadata?.content ?? ""}
      />
    </Container>
  );
}
