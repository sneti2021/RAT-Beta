import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";

export function PortableBody({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) {
    return null;
  }

  return (
    <div className="portable prose">
      <PortableText
        value={value}
        components={{
          block: {
            h2: ({ children }) => (
              <h2 className="mt-8 text-3xl font-bold">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-6 text-2xl font-bold">{children}</h3>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[var(--accent)] pl-5 text-xl text-[var(--foreground)]">
                {children}
              </blockquote>
            ),
          },
          marks: {
            link: ({ children, value }) => (
              <a className="font-semibold text-[var(--accent)]" href={value?.href}>
                {children}
              </a>
            ),
          },
        }}
      />
    </div>
  );
}
