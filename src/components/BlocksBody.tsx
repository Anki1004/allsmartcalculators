'use client';

import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import type { StrapiCalcContent } from '@/lib/strapi';

// Client component because BlocksRenderer is client-only and the `blocks`
// prop takes render functions — functions can't be serialised across the
// server/client boundary. Demotes any H1 from the CMS bodyContent to H2
// (the page already has an H1) and collapses H4-H6 to H3.
export default function BlocksBody({
  content,
  className,
}: {
  content: NonNullable<StrapiCalcContent['bodyContent']>;
  className?: string;
}) {
  return (
    <div className={className}>
      <BlocksRenderer
        content={content}
        blocks={{
          heading: ({ children, level }) => {
            const safeLevel = level === 1 ? 2 : level >= 4 ? 3 : level;
            const Tag = `h${safeLevel}` as 'h2' | 'h3';
            return <Tag>{children}</Tag>;
          },
        }}
      />
    </div>
  );
}
