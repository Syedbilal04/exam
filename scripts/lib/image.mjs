import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { repoRoot } from "./bank.mjs";

/**
 * Diagrams are copied into public/questions/ rather than hotlinked, so a paper
 * never depends on someone else's server staying up and the licence of every
 * stored file is recorded alongside its question.
 */
const publicDir = path.join(repoRoot, "public", "questions");

/** Reads intrinsic dimensions straight from the file header. */
function readSize(buffer) {
  // PNG: 8-byte signature, then an IHDR chunk carrying width and height.
  if (buffer.length > 24 && buffer.toString("ascii", 1, 4) === "PNG") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  // GIF: width and height are little-endian shorts in the header.
  if (buffer.length > 10 && buffer.toString("ascii", 0, 3) === "GIF") {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }

  // JPEG: walk the segment markers until a start-of-frame block appears.
  if (buffer.length > 4 && buffer.readUInt16BE(0) === 0xffd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      const isFrame = marker >= 0xc0 && marker <= 0xcf &&
        ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isFrame) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }
      offset += 2 + buffer.readUInt16BE(offset + 2);
    }
  }

  return null;
}

const EXTENSIONS = { png: ".png", gif: ".gif", jpeg: ".jpg" };

function extensionFor(buffer) {
  if (buffer.toString("ascii", 1, 4) === "PNG") return EXTENSIONS.png;
  if (buffer.toString("ascii", 0, 3) === "GIF") return EXTENSIONS.gif;
  if (buffer.readUInt16BE(0) === 0xffd8) return EXTENSIONS.jpeg;
  return null;
}

/**
 * Downloads one diagram and returns the record the question stores, or null if
 * the file is missing, not an image, or in a format we cannot measure.
 */
export async function saveImage(sourceId, url, alt) {
  const response = await fetch(url);
  if (!response.ok) return null;

  const buffer = Buffer.from(await response.arrayBuffer());
  const extension = extensionFor(buffer);
  const size = extension ? readSize(buffer) : null;
  if (!extension || !size) return null;

  const name = createHash("sha1").update(url).digest("hex").slice(0, 16);
  const directory = path.join(publicDir, sourceId);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, `${name}${extension}`), buffer);

  return {
    url: `/questions/${sourceId}/${name}${extension}`,
    alt: alt || "Question diagram",
    width: size.width,
    height: size.height,
  };
}
