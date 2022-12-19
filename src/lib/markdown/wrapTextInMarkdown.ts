/**
 * Accept text and wrap it in markdown syntax
 * @param text
 * @param decoration
 */

import Decoration from "../../types/Decoration";

export default function wrapTextInMarkdown(
  text: string,
  decoration: Decoration
): string {
  switch (decoration) {
    case "h1":
      return `# ${text}`;
    case "h2":
      return `## ${text}`;
    case "h3":
      return `### ${text}`;
    case "h4":
      return `#### ${text}`;
    case "bold":
      return `**${text}**`;
    case "italic":
      return `*${text}*`;
    case "quote":
      return `> ${text}`;
    case "inline code":
      return `\`${text}\``;
    case "code block":
      return "```" + "\n" + text + "\n" + "```";
    case "link":
      return `[${text}](link)`;
    case "ul":
      return `- ${text}`;
    case "ol":
      return `1. ${text}`;
    case "image":
      return `![${text}](link)`;
    case "tab":
      return "\t" + text;
    default:
      return text;
  }
}
