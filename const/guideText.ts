const headingGuide =
  `## Headings \n` +
  `To create a heading in markdown, you simply need to use a # symbol followed by a space and then the heading text. The number of # symbols you use determines the size of the heading. For example:` +
  `\n\n` +
  "```" +
  `# Heading 1` +
  `\n## Heading 2` +
  `\n### Heading 3` +
  `\n#### Heading 4` +
  `\n##### Heading 5` +
  `\n###### Heading 6` +
  `\n` +
  "```";

const emphasisGuide =
  `## Emphasis \n` +
  `To create emphasis in markdown, you simply need to use a * symbol followed by a space and then the heading text. The number of * symbols you use determines the size of the heading. For example:` +
  `\n\n` +
  "```" +
  `*This text will be italic*` +
  `\n_This will also be italic_` +
  `\n\n` +
  `**This text will be bold**` +
  `\n__This will also be bold__` +
  `\n\n` +
  `*You **can** combine them*` +
  `\n` +
  "```";

const listsGuide =
  `## Lists \n` +
  `To create a list in markdown, you simply need to use a - symbol followed by a space and then the heading text. The number of - symbols you use determines the size of the heading. For example:` +
  `\n\n` +
  "```" +
  `- Item 1` +
  `\n- Item 2` +
  `\n  - Item 2a` +
  `\n  - Item 2b` +
  `\n` +
  "```" +
  `\n\n` +
  `To create a numbered list in markdown, you simply need to use a 1. symbol followed by a space and then the heading text. The number of 1. symbols you use determines the size of the heading. For example:` +
  `\n\n` +
  "```" +
  `1. Item 1` +
  `\n1. Item 2` +
  `\n2. Item 3` +
  `\n   1. Item 3a` +
  `\n   2. Item 3b` +
  `\n` +
  "```";

const imagesGuide =
  `## Images \n` +
  `To create a image in markdown, you simply need to use a ! symbol followed by a [ ] and then the heading text. The number of ! symbols you use determines the size of the heading. For example:` +
  `\n\n` +
  "```" +
  `![GitHub Logo](/images/logo.png)` +
  `\nFormat: ![Alt Text](url)` +
  `\n` +
  "```";

const linksGuide =
  `## Links \n` +
  `To create a link in markdown, you simply need to use a [ ] symbol followed by a ( ) and then the heading text.` +
  `\n\n` +
  `[GitHub](http://github.com)` +
  `\n`;

const blockquotesGuide =
  `## Blockquotes \n` +
  `To create a blockquotes in markdown, you simply need to use a > symbol followed by a space and then the heading text. The number of > symbols you use determines the size of the heading. For example:` +
  `\n\n` +
  "```" +
  `As Vitalik Buterin said:` +
  `\n> Ethereum is a decentralized platform that runs smart contracts:` +
  `\n> applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third party interference.` +
  "```";

const completeGuideText =
  `# Markdown Guide \n\n` +
  `[Markdown Cheat Sheet (Recommended)](https://www.markdownguide.org/cheat-sheet/). \n` +
  headingGuide +
  `\n\n` +
  emphasisGuide +
  `\n\n` +
  listsGuide +
  `\n\n` +
  imagesGuide +
  `\n\n` +
  linksGuide +
  `\n\n` +
  blockquotesGuide;

export default completeGuideText;
