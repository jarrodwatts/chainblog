import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Link from "next/link";
import React from "react";
import styles from "./hero.module.css";

export default function Hero() {
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
        >
          <Link href="/feed" className={styles.ctaLink}>
            Get Started 🌿
          </Link>
        </Button>
      </Container>
    </div>
  );
}
