import katex from "katex";
import { Fragment } from "react";

/**
 * Renders question text that may contain TeX between `$...$` (inline) or
 * `$$...$$` (display). Everything outside the delimiters stays a plain React
 * text node, so only KaTeX's own output is ever injected as HTML.
 */
const SEGMENT = /(\$\$[^$]+\$\$|\$[^$\n]+\$)/g;

function renderMath(source: string, displayMode: boolean): string {
  return katex.renderToString(source, {
    displayMode,
    throwOnError: false,
    output: "html",
    strict: "ignore",
  });
}

export function MathText({ children }: { children: string }) {
  if (!children.includes("$")) return <>{children}</>;

  return (
    <>
      {children.split(SEGMENT).map((segment, index) => {
        const display = segment.startsWith("$$") && segment.endsWith("$$");
        const inline =
          !display && segment.startsWith("$") && segment.endsWith("$");

        if (!display && !inline) return <Fragment key={index}>{segment}</Fragment>;

        const body = segment.slice(display ? 2 : 1, display ? -2 : -1);
        return (
          <span
            key={index}
            dangerouslySetInnerHTML={{ __html: renderMath(body, display) }}
          />
        );
      })}
    </>
  );
}
