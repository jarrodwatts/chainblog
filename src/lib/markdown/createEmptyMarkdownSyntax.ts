import Decoration from "../../types/Decoration";

/**
 * Accept a Decoration type and return the wrapping markdown
 * e.g. for bold, return "****"
 * e.g. for link, return "[alt text](link)"
 */
export default function createEmptyMarkdownSyntax(decoration: Decoration) {
  switch (decoration) {
    case "h1":
      return "\n" + "# ";
    case "h2":
      return "\n" + "## ";
    case "h3":
      return "\n" + "### ";
    case "h4":
      return "\n" + "#### ";
    case "bold":
      return "**";
    case "italic":
      return "*";
    case "underline":
      return "__";
    case "quote":
      return "\n" + "> ";
    case "inline code":
      return "`";
    case "code block":
      return "\n" + "```";
    case "link":
      return "[alt text](link)";
    case "ul":
      return "\n" + "- ";
    case "ol":
      return "\n" + "1. ";
    case "image":
      return "![alt text](image url)";
    case "tab":
      return "\t";
    default:
      return "";
  }
}
