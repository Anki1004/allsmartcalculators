import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface CmsRichTextProps {
  content: string;
  className?: string;
}

export default function CmsRichText({ content, className }: CmsRichTextProps) {
  if (!content?.trim()) return null;

  return (
    <div
      className={cn(
        'prose prose-invert prose-sm sm:prose-base max-w-none break-words',
        'prose-headings:font-headline prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-on-surface',
        'prose-h1:text-2xl sm:prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mb-4',
        'prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-6',
        'prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-5',
        'prose-p:text-on-surface-variant prose-p:leading-relaxed',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-on-surface prose-strong:font-semibold',
        'prose-li:text-on-surface-variant prose-li:marker:text-primary',
        'prose-ol:list-decimal prose-ul:list-disc',
        'prose-code:text-secondary prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none',
        'prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10',
        'prose-blockquote:border-l-primary prose-blockquote:text-on-surface-variant prose-blockquote:font-normal prose-blockquote:not-italic',
        'prose-hr:border-white/10',
        'prose-img:rounded-xl',
        'prose-table:text-sm',
        'prose-th:text-on-surface prose-th:font-semibold prose-th:border-white/10',
        'prose-td:text-on-surface-variant prose-td:border-white/5',
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
