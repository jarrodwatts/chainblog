import { Container, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import guideText from "../../../const/guideText";
import MarkdownPreview from "../post/MarkdownPreview";
import CoverImage from "./CoverImage";
import CreateHeader from "./CreateHeader";
import EditorToolbar from "./EditorToolbar";
import MarkdownEditor from "./MarkdownEditor";
import styles from "./create.module.css";

type Props = {};

export type EditorTab = "write" | "preview" | "guide";

export default function CreateContainer({}: Props) {
  // State to keep track of which tab is active
  const [activeTab, setActiveTab] = useState<EditorTab>("write");

  // Reference to the editor input element
  const mdInputRef = useRef<HTMLTextAreaElement>(null);

  // Store the contents of the editor as the user types
  const [mdInput, setMdInput] = useState<string>("");

  // State to keep track of the cover image
  const [coverImage, setCoverImage] = useState<File | null>(null);

  // State to keep track of the title
  const [title, setTitle] = useState<string>("");

  // Configurable metadata state
  const [metadata, setMetadata] = useState<Record<string, any>>({});

  return (
    <>
      <CreateHeader
        postMetadata={{
          ...metadata,
          title,
          coverImage,
          content: mdInput,
        }}
        setPostMetadata={setMetadata}
      />
      <Container maxWidth="md">
        <CoverImage coverImage={coverImage} setCoverImage={setCoverImage} />

        <EditorToolbar
          mdInputRef={mdInputRef}
          setMdValue={setMdInput}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Preview Tab */}
        {activeTab === "preview" && <MarkdownPreview content={mdInput} />}

        {/* Guide tab */}
        {activeTab === "guide" && <MarkdownPreview content={guideText} />}

        {/* Write tab */}
        {activeTab === "write" && (
          <>
            <TextField
              label="Title"
              fullWidth
              placeholder="Enter a title..."
              size="medium"
              variant="standard"
              InputProps={{
                className: styles.titleInput,
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              multiline
              maxRows={3}
              required
            />
            <MarkdownEditor
              mdInputRef={mdInputRef}
              mdValue={mdInput}
              setMdValue={setMdInput}
            />
          </>
        )}
      </Container>
    </>
  );
}
