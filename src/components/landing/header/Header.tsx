import Link from "next/link";
import React from "react";
import SignInButton from "../../signinbutton/SignInButton";
import styles from "./header.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "../../../lib/mui/theme";
import BurgerMenu from "./BurgerMenu";

const navItems = [
  <Link className={`${styles.ctaLink}`} href="/create" key={0}>
    Create
  </Link>,
  <Link className={`${styles.ctaLink}`} href="/feed" key={1}>
    Feed
  </Link>,
  <Link className={`${styles.ctaLink}`} href="/discover" key={2}>
    Discover
  </Link>,
];

export default function Header() {
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  // Mobile view
  if (matches) {
    return (
      <>
        <div className={styles.header}>
          <div className={styles.left}>
            <Link href="/feed">
              {/*  eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="logo" height={56} />
            </Link>
          </div>

          <BurgerMenu />
        </div>
      </>
    );
  }

  // Desktop view
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Link href="/feed">
            {/*  eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="logo" height={56} />
          </Link>
          {navItems}
        </div>

        <SignInButton />
      </div>
    </>
  );
}
