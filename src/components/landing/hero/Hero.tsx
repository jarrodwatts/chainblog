import {
  Button,
  Typography,
  Container,
  Grid,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import theme from "../../../lib/mui/theme";
import MarkdownEditor from "../../create/MarkdownEditor";
import MarkdownPreview from "../../post/MarkdownPreview";
import styles from "./hero.module.css";

export default function Hero() {
  const router = useRouter();
  const mdInputRef = useRef<HTMLTextAreaElement>(null);
  const [mdInput, setMdInput] = useState<string>("Start typing here...");
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className={styles.container}>
      <Container maxWidth="lg" className={styles.contentContainer}>
        <Typography variant="h1" className={styles.header}>
          The blogging platform
          <br />
          <span className={styles.boujee}>built on Lens Protocol</span>.
        </Typography>

        <Typography variant="body2" className={styles.subheader}>
          Store your blog posts on the blockchain.
          <br /> Take your content, followers, and revenue with you;{" "}
          <b>anywhere</b>.
        </Typography>

        <Button
          color="secondary"
          variant="contained"
          className={styles.ctaButton}
          // TODO: probs bad
          onClick={() => router.push("/feed")}
        >
          <Link href="/feed" className={styles.ctaLink}>
            Get Started 🌿
          </Link>
        </Button>

        <Typography variant="h2" sx={{ mt: 9 }}>
          Write in Markdown. Post on Lens.
        </Typography>

        <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
          Import your existing blog posts, or start writing new ones in our
          performant MD editor.
        </Typography>

        <Grid container direction="row">
          <Grid item xs={12} md={6} className={styles.markdownEditor}>
            <Typography variant="h3">Write</Typography>
            <MarkdownEditor
              mdInputRef={mdInputRef}
              mdValue={mdInput}
              setMdValue={setMdInput}
              minRows={10}
            />
          </Grid>
          <Grid item xs={12} md={6} className={styles.markdownPreview}>
            <Typography variant="h3">Preview</Typography>
            <MarkdownPreview content={mdInput} />
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          sx={{ mt: 12, mb: 4 }}
          alignItems="center"
        >
          <Grid item xs={12} md={7} spacing={9}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Personalized feed of posts
            </Typography>
            <Typography variant="body1">
              Discover the most popular posts on Lens, or view a personalized
              feed of posts created by profiles you follow.
            </Typography>

            <Button
              color="primary"
              variant="contained"
              className={styles.secondaryButton}
              onClick={() => router.push("/feed")}
            >
              <Link href="/feed" className={styles.ctaLink}>
                View Feed
              </Link>
            </Button>
          </Grid>
          <Grid item xs={12} md={5}>
            <Image
              src={"/feed2.png"}
              alt="feed icon"
              width={350}
              height={350}
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction={
            // Show the image on the right for desktop,
            // and on the bottom for mobile
            matches ? "column-reverse" : "row"
          }
          sx={{ mt: 12, mb: 4 }}
          alignItems="center"
        >
          <Grid item xs={12} md={5}>
            <Image
              src={"/monetize.png"}
              alt="feed icon"
              width={400}
              height={400}
            />
          </Grid>

          <Grid item xs={12} md={7} spacing={9}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Monetise your content
            </Typography>
            <Typography variant="body1">
              Earn money from your content and build a community you own. Allow
              readers to{" "}
              <b>
                <Link
                  href="https://docs.lens.xyz/docs/collect"
                  target="_blank"
                  className={styles.ctaLink}
                >
                  Collect
                </Link>
              </b>{" "}
              your publications on the blockchain.
            </Typography>

            <Button
              color="primary"
              variant="contained"
              className={styles.secondaryButton}
              onClick={() => router.push("/create")}
            >
              <Link href="/create" className={styles.ctaLink}>
                Start Writing
              </Link>
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          sx={{ mt: 12, mb: 4 }}
          alignItems="center"
        >
          <Grid item xs={12} md={7} spacing={9}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Discover creators in web3
            </Typography>
            <Typography variant="body1">
              Find the best writers in the Web3 space and support their content
              with the underlying Lens Protocol.
            </Typography>

            <Button
              color="primary"
              variant="contained"
              className={styles.secondaryButton}
              onClick={() => router.push("/discover")}
            >
              <Link href="/discover" className={styles.ctaLink}>
                Discover Creators
              </Link>
            </Button>
          </Grid>
          <Grid item xs={12} md={5}>
            <Image
              src={"/discover.png"}
              alt="feed icon"
              width={350}
              height={350}
            />
          </Grid>
        </Grid>

        <Typography variant="h2" sx={{ mt: 9 }}>
          Join the Web3 writing community
        </Typography>

        <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
          Find other writers and creators in the Web3 space in our Discord.
        </Typography>
        <Button
          color="primary"
          variant="contained"
          className={styles.thirdaryButton}
          onClick={() =>
            router.push("https://discord.com/invite/4eQBm7DDNS", {})
          }
        >
          <Link
            href="https://discord.com/invite/4eQBm7DDNS"
            target="_blank"
            className={styles.ctaLink}
          >
            Join the Discord
          </Link>
        </Button>
      </Container>
    </div>
  );
}
