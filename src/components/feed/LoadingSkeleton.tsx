import { Skeleton } from "@mui/material";
import React from "react";
import styles from "./feed.module.css";

export default function LoadingSkeleton() {
  return <Skeleton variant="rectangular" className={styles.feedItem} />;
}
