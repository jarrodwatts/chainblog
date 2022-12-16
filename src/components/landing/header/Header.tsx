import Link from "next/link";
import React from "react";
import SignInButton from "../../signinbutton/SignInButton";
import styles from "./header.module.css";

export default function Header() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Link href="/feed">
            {/*  eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="logo" height={56} />
          </Link>
          <Link className={`${styles.ctaLink}`} href="/feed">
            Feed
          </Link>
          <Link className={`${styles.ctaLink}`} href="/discover">
            Discover
          </Link>
        </div>

        <SignInButton />
      </div>
    </>
  );
}
