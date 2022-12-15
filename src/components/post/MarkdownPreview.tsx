import Image from "next/image";
import React, { ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import theme from "../../lib/mui/theme";

interface Props {
  content: string;
}

export default function MarkdownPreview({ content }: Props): ReactElement {
  return (
    <div>
      <ReactMarkdown
        components={{
          h1: (props: any) => (
            <h1
              {...props}
              style={{
                ...theme.typography.h1,
                lineHeight: 1.75,
              }}
            />
          ),
          h2: (props: any) => (
            <h2
              {...props}
              style={{ ...theme.typography.h2, lineHeight: 1.75 }}
            />
          ),
          h3: (props: any) => (
            <h3
              {...props}
              style={{
                ...theme.typography.h3,
                lineHeight: 1.75,
                marginBottom: "1em",
                marginTop: "1.5em",
              }}
            />
          ),
          h4: (props: any) => <h4 {...props} style={theme.typography.h4} />,
          h5: (props: any) => <h5 {...props} style={theme.typography.h5} />,
          h6: (props: any) => <h6 {...props} style={theme.typography.h6} />,

          p: (props: any) => {
            const { node } = props;

            if (node.children[0].tagName === "img") {
              try {
                const image = node.children[0];

                // Alt Text of the image
                const alt = image.properties.alt
                  .match(/alt:.*?}/g)[0]
                  .replace("alt:", "")
                  .replace("}", "");

                // Width of the image
                const width = image.properties.alt
                  .match(/width:.*?}/g)[0]
                  .replace("width:", "")
                  .replace("}", "");

                // Height of the image
                const height = image.properties.alt
                  .match(/height:.*?}/g)[0]
                  .replace("height:", "")
                  .replace("}", "");

                return (
                  <Image
                    src={image.properties.src}
                    width={width}
                    height={height}
                    alt={alt}
                  />
                );
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
