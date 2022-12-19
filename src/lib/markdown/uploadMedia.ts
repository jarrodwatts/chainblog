import { ThirdwebStorage } from "@thirdweb-dev/storage";

export async function uploadMedia(file: File) {
  const storage = new ThirdwebStorage();
  const uri = await storage.upload(file);
  return { uri, fileName: file.name || "Alt Text" };
}

export async function insertMediaIntoMarkdown(
  input: HTMLTextAreaElement,
  uri: string,
  fileName: string,
  setContent: (content: string) => void
) {
  const { selectionStart, selectionEnd, value } = input;

  // Start of user selection, or the end of the text if no selection
  const start = selectionStart || value?.length || 0;
  // End of user selection, or the end of the text if no selection
  const end = selectionEnd || value?.length || 0;

  const selectedText = value.substring(start, end);

  // If no text is selected, insert the markdown at the cursor position
  if (selectedText.length === 0) {
    const newMarkdown = "\n" + `![${fileName}](${uri})` + "\n";
    const newValue =
      value.substring(0, start) + newMarkdown + value.substring(end);
    setContent(newValue);
    input.focus();
  } else {
    const newMarkdown = `[${selectedText}](${uri})`;
    const newValue =
      value.substring(0, start) +
      "\n" +
      newMarkdown +
      "\n" +
      value.substring(end);
    setContent(newValue);
    input.focus();
  }
}
