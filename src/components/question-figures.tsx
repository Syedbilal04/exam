import Image from "next/image";
import type { QuestionImage } from "@/lib/types";

/** Diagrams that belong to a question, shown between the stem and the options. */
export function QuestionFigures({ images }: { images: QuestionImage[] }) {
  if (images.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {images.map((image) => (
        <figure
          key={image.url}
          className="overflow-hidden rounded-xl border border-mist-200 bg-white p-3"
        >
          <Image
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="h-auto w-full max-w-sm"
            unoptimized
          />
        </figure>
      ))}
    </div>
  );
}
