import { Skeleton } from "@mui/material";
import React from "react";
import styles from "./discover.module.css";

export default function LoadingSkeleton() {
  return <Skeleton variant="rectangular" className={styles.authorCard} />;
}
