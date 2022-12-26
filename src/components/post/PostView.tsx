import { Container, Divider, useMediaQuery } from "@mui/material";
import React from "react";
import { PublicationQuery } from "../../graphql/generated";
import MarkdownPreview from "./MarkdownPreview";
import PostHeader from "./PostHeader";
import styles from "./post.module.css";
import theme from "../../lib/mui/theme";
import PostSidebar from "./PostSidebar";

type Props = {
  publication: PublicationQuery;
};

export default function PostView({ publication }: Props) {
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  console.log(matches);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: matches ? "column" : "row",
      }}
    >
      <Container maxWidth="md" className={styles.postView}>
        <PostHeader publication={publication} />

        <Divider className={styles.divider} />

        <div className={styles.postContent}>
          <MarkdownPreview
            content={publication?.publication?.metadata?.content ?? ""}
          />
        </div>

        {matches && <PostSidebar publication={publication} />}
      </Container>

      {!matches && <PostSidebar publication={publication} />}
    </div>
  );
}
