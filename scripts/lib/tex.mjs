import katex from "katex";

const MATH_SPAN = /\$\$[^$]+\$\$|\$[^$\n]+\$/g;
const TEX_COMMAND = /\\[a-zA-Z]+/;

export function hasTex(text) {
  return text.includes("$");
}

/**
 * True when every `$...$` span in the text is something KaTeX can actually
 * draw. Imported questions that fail this would reach the student as a red
 * error box, so the importer drops them instead.
 */
export function texRenders(text) {
  const spans = text.match(MATH_SPAN);
  if (!spans) return true;

  for (const span of spans) {
    const display = span.startsWith("$$");
    const body = span.slice(display ? 2 : 1, display ? -2 : -1);
    try {
      katex.renderToString(body, {
        displayMode: display,
        throwOnError: true,
        strict: "ignore",
      });
    } catch {
      return false;
    }
  }

  // An odd number of delimiters means one span never closes.
  return (text.match(/\$/g) ?? []).length % 2 === 0;
}

/**
 * Prepares one field (a stem, an option or an explanation) for the cockpit.
 *
 * Sources often delimit math in the stem but leave options as bare TeX such as
 * `\frac{1}{12}`. A field that is nothing but TeX gets wrapped so KaTeX picks
 * it up; a field that mixes prose with undelimited TeX is rejected, because
 * guessing where the math starts would corrupt the question.
 */
export function normalizeField(text) {
  const trimmed = (text ?? "").trim();
  if (!trimmed) return { ok: true, text: trimmed };

  if (!trimmed.includes("$")) {
    if (!TEX_COMMAND.test(trimmed)) return { ok: true, text: trimmed };
    const wrapped = `$${trimmed}$`;
    return texRenders(wrapped)
      ? { ok: true, text: wrapped }
      : { ok: false, text: trimmed };
  }

  if (TEX_COMMAND.test(trimmed.replace(MATH_SPAN, " "))) {
    return { ok: false, text: trimmed };
  }

  return texRenders(trimmed)
    ? { ok: true, text: trimmed }
    : { ok: false, text: trimmed };
}
