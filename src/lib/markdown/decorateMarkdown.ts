/**
 * Function that takes in a reference to a HTMLTextAreaElement
 * Uses the user's currently selected text to decorate it.
 * If there is no selected text, it will insert the markdown at the cursor position.
 *
 *
 */

import Decoration from "../../types/Decoration";
import createEmptyMarkdownSyntax from "./createEmptyMarkdownSyntax";
import wrapTextInMarkdown from "./wrapTextInMarkdown";

export default function decorateMarkdown(
  input: HTMLTextAreaElement,
  decoration: Decoration,
  setContent: (content: string) => void
) {
  const { selectionStart, selectionEnd, value } = input;

  // Start of user selection, or the end of the text if no selection
  const start = selectionStart || 0;
  // End of user selection, or the end of the text if no selection
  const end = selectionEnd || value?.length || 0;

  const selectedText = value.substring(start, end);

  // If no text is selected, insert the markdown at the cursor position
  if (selectedText.length === 0) {
    const newMarkdown = createEmptyMarkdownSyntax(decoration);
    const newValue =
      value.substring(0, start) + newMarkdown + value.substring(end);
    setContent(newValue);
    input.focus();
  } else {
    const newMarkdown = wrapTextInMarkdown(selectedText, decoration);
    const newValue =
      value.substring(0, start) + newMarkdown + value.substring(end);
    setContent(newValue);
    input.focus();
  }
}
