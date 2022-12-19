import { Container } from "@mui/material";
import React, { useRef, useState } from "react";
import guideText from "../../../const/guideText";
import MarkdownPreview from "../post/MarkdownPreview";
import CoverImage from "./CoverImage";
import EditorToolbar from "./EditorToolbar";
import MarkdownEditor from "./MarkdownEditor";

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
  // todo

  return (
    <Container maxWidth="md">
      <CoverImage />

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
        <MarkdownEditor
          mdInputRef={mdInputRef}
          mdValue={mdInput}
          setMdValue={setMdInput}
        />
      )}
    </Container>
  );
}
