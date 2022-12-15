import { Container, Grid } from "@mui/material";
import React from "react";
import { PublicationsQuery } from "../../graphql/generated";
import ProfileFeedItem from "./ProfileFeedItem";

type Props = {
  posts: PublicationsQuery;
};

export default function ProfileFeed({ posts }: Props) {
  return (
    <Container maxWidth="md" style={{ marginTop: 36 }}>
      <Grid container direction="column" spacing={2}>
        {posts?.publications?.items?.map((post) => (
          <Grid item xs={12} key={post.id}>
            <ProfileFeedItem post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
