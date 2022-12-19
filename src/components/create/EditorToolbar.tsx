import { Button, ButtonBase, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import styles from "./create.module.css";
import HelpIcon from "@mui/icons-material/Help";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import CodeIcon from "@mui/icons-material/Code";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";
import capitalize from "@mui/material/utils/capitalize";
import { EditorTab } from "./CreateContainer";
import decorateMarkdown from "../../lib/markdown/decorateMarkdown";

const tabs = [
  {
    name: "write",
    icon: <EditIcon />,
  },
  {
    name: "preview",
    icon: <VisibilityIcon />,
  },
  {
    name: "guide",
    icon: <HelpIcon />,
  },
];

const editorOptions = [
  {
    name: "heading",
    icon: <TextFieldsIcon />,
    // Take the editor and the setContent and call the decorateMarkdown function
    // with the editor and the setContent function
    onClick: (
      editor: HTMLTextAreaElement,
      setContent: (content: string) => void
    ) => decorateMarkdown(editor, "h1", setContent),
  },
  {
    name: "bold",
    icon: <FormatBoldIcon />,
    onClick: (
      editor: HTMLTextAreaElement,
      setContent: (content: string) => void
    ) => decorateMarkdown(editor, "bold", setContent),
  },
  {
    name: "italic",
    icon: <FormatItalicIcon />,
    onClick: (
      editor: HTMLTextAreaElement,
      setContent: (content: string) => void
    ) => decorateMarkdown(editor, "italic", setContent),
  },
  {
    name: "quote",
    icon: <FormatQuoteIcon />,
    onClick: (
      editor: HTMLTextAreaElement,
      setContent: (content: string) => void
    ) => decorateMarkdown(editor, "quote", setContent),
  },
  {
    name: "inline code",
    icon: <CodeIcon />,
    onClick: (
      editor: HTMLTextAreaElement,
      setContent: (content: string) => void
    ) => decorateMarkdown(editor, "inline code", setContent),
  },
  {
    name: "code block",
    icon: <DeveloperModeIcon />,
    onClick: (
      editor: HTMLTextAreaElement,
      setContent: (content: string) => void
    ) => decorateMarkdown(editor, "code block", setContent),
  },
  {
    name: "unordered list",
    icon: <FormatListBulletedIcon />,
    onClick: (
      editor: HTMLTextAreaElement,
      setContent: (content: string) => void
    ) => decorateMarkdown(editor, "ul", setContent),
  },
  {
    name: "ordered list",
    icon: <FormatListNumberedIcon />,
    onClick: (
      editor: HTMLTextAreaElement,
      setContent: (content: string) => void
    ) => decorateMarkdown(editor, "ol", setContent),
  },
  {
    name: "link",
    icon: <LinkIcon />,
    onClick: (
      editor: HTMLTextAreaElement,
      setContent: (content: string) => void
    ) => decorateMarkdown(editor, "link", setContent),
  },
  {
    name: "image",
    icon: <ImageIcon />,
    onClick: (
      editor: HTMLTextAreaElement,
      setContent: (content: string) => void
    ) => decorateMarkdown(editor, "image", setContent),
  },
];

type Props = {
  mdInputRef: React.RefObject<HTMLTextAreaElement>;
  setMdValue: (value: string) => void;
  activeTab: EditorTab;
  setActiveTab: (tab: EditorTab) => void;
};

export default function EditorToolbar({
  mdInputRef,
  setMdValue,
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className={styles.navbarContainer}
      >
        {/* Left side of editor (Tabs) */}
        <Grid item className={styles.navbarTabs}>
          {/* Map over editor tabs */}
          {tabs.map((tab, i) => (
            <Grid item key={i}>
              <Button
                color={activeTab === tab.name ? "primary" : "inherit"}
                onClick={() => setActiveTab(tab.name as EditorTab)}
                className={`${styles.navbarTab} ${
                  activeTab === tab.name ? styles.navbarTabActive : ""
                }`}
                startIcon={tab.icon}
              >
                {capitalize(tab.name)}
              </Button>
            </Grid>
          ))}
        </Grid>

        {/* Right side of editor (Editor options) */}
        <Grid item className={styles.navbarOptions}>
          {editorOptions.map((option, i) => (
            <Grid item key={i}>
              <Tooltip title={capitalize(option.name)}>
                <ButtonBase
                  className={styles.navbarOptionButton}
                  onClick={() => {
                    if (!mdInputRef?.current) return;
                    option.onClick?.(mdInputRef?.current, setMdValue);
                  }}
                >
                  {option.icon}
                </ButtonBase>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <div className={styles.draftWarningContainer}>
        <Typography variant="body2" color="error">
          Currently, there is no draft-saving feature.{" "}
          <b>Your work will be lost if you leave this page</b>.
        </Typography>
      </div>
    </>
  );
}
