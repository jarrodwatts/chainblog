import React from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from "./feed.module.css";

export default function LoadingSkeleton() {
  return <Skeleton variant="rectangular" className={styles.feedItem} />;
}
