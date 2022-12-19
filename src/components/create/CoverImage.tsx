import { Button, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import styles from "./create.module.css";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  coverImage: File | null;
  setCoverImage: (coverImage: File | null) => void;
};

/**
 * Allow users to upload a cover image for their post
 */
export default function CoverImage({ coverImage, setCoverImage }: Props) {
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (coverImage) {
      setCoverImageUrl(URL.createObjectURL(coverImage));
    } else {
      setCoverImageUrl(null);
    }
  }, [coverImage]);

  if (!coverImage) {
    return (
      <>
        <div
          className={styles.dragAndDropZone}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) {
              setCoverImage(file);
            }
          }}
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
        >
          <Typography variant="body2">
            Drag and drop your cover image here
          </Typography>
        </div>

        {/* Hidden input field */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setCoverImage(file);
            }
          }}
          style={{ display: "none" }}
        />
      </>
    );
  }

  //   Show the image with a remove button
  return (
    <div className={styles.coverImagePreviewContainer}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={coverImageUrl || ""}
        alt="Cover image"
        className={styles.coverImagePreview}
      />
      <Button
        variant="contained"
        onClick={() => setCoverImage(null)}
        className={styles.removeCoverButton}
      >
        <CloseIcon color="inherit" />
      </Button>
    </div>
  );
}
