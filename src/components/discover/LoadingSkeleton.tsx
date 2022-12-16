import React from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from "./discover.module.css";

export default function LoadingSkeleton() {
  return <Skeleton variant="rectangular" className={styles.authorCard} />;
}
