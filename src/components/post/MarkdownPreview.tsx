import { Typography } from "@mui/material";
import { MediaRenderer } from "@thirdweb-dev/react";
import React, { ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import theme from "../../lib/mui/theme";
import styles from "./post.module.css";

interface Props {
  content: string;
}

export default function MarkdownPreview({ content }: Props): ReactElement {
  return (
    <div>
      <ReactMarkdown
        components={{
          h1: (props: any) => (
            <Typography variant="h1" {...props} className={styles.blogH1} />
          ),
          h2: (props: any) => (
            <Typography variant="h2" {...props} className={styles.blogH2} />
          ),
          h3: (props: any) => (
            <Typography variant="h3" {...props} className={styles.blogH3} />
          ),
          h4: (props: any) => (
            <Typography variant="h4" {...props} className={styles.blogH4} />
          ),
          h5: (props: any) => (
            <Typography variant="h5" {...props} className={styles.blogH5} />
          ),
          h6: (props: any) => (
            <Typography variant="h6" {...props} className={styles.blogH6} />
          ),

          p: (props: any) => {
            const { node } = props;

            if (node.children[0].tagName === "img") {
              try {
                const image = node.children[0];

                const { alt, src } = image.properties!;

                return <MediaRenderer src={src} alt={alt} width="100%" />;
              } catch (error) {
                console.error("Error:", error);
                return <></>;
              }
            }

            return (
              <p
                {...props}
                style={{
                  ...theme.typography.body1,
                  fontSize: "1.25rem",
                  marginBottom: "1.25em",
                  marginTop: "1.25em",
                }}
              ></p>
            );
          },
          ul: (props: any) => (
            <ul
              {...props}
              style={{
                ...theme.typography.body1,
                marginBottom: "1.25em",
                marginTop: "1.25em",
                fontSize: "1.25rem",
                listStyle: "disc",
                paddingLeft: "2em",
              }}
            ></ul>
          ),
          ol: (props: any) => (
            <ol
              {...props}
              style={{
                ...theme.typography.body1,
                marginBottom: "1.25em",
                fontSize: "1.25rem",
                marginTop: "1.25em",
                listStyle: "decimal",
                paddingLeft: "2em",
              }}
            ></ol>
          ),

          a: (props: any) => (
            <a
              target="_blank"
              rel="noreferrer"
              {...props}
              style={{
                ...theme.typography.body1,
                color: theme.palette.primary.main,
                textDecoration: "underline",
                fontSize: "1.25rem",
              }}
            />
          ),

          // Re-style code blocks
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "") ?? "text";
            return !inline && match ? (
              <SyntaxHighlighter
                style={dracula}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
