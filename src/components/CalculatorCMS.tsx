import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getCalcContent, StrapiCalcContent } from '@/lib/strapi';
import GlassCard from './GlassCard';
import { HelpCircle, ChevronDown } from 'lucide-react';

const PROSE_CLASSES = `prose prose-invert prose-sm sm:prose-base max-w-none
  prose-p:text-on-surface-variant prose-p:leading-relaxed
  prose-headings:text-on-surface prose-headings:font-headline prose-headings:font-bold
  prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
  prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
  prose-strong:text-on-surface
  prose-li:text-on-surface-variant
  prose-code:text-secondary prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
  prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
  prose-blockquote:border-l-primary prose-blockquote:text-on-surface-variant
  prose-table:text-sm prose-table:my-4
  prose-th:text-on-surface prose-th:font-semibold prose-th:border-white/10 prose-th:bg-white/[0.03]
  prose-td:text-on-surface-variant prose-td:border-white/5`;

function MarkdownBody({ content }: { content: string }) {
  return (
    <div className={PROSE_CLASSES}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-white/5 last:border-0">
      <summary className="flex items-center justify-between gap-3 py-4 cursor-pointer list-none text-sm font-semibold text-on-surface hover:text-primary transition-colors">
        {question}
        <ChevronDown className="w-4 h-4 shrink-0 text-on-surface-variant group-open:rotate-180 transition-transform" />
      </summary>
      <div className="pb-4">
        <MarkdownBody content={answer} />
      </div>
    </details>
  );
}

const hasText = (s?: string | null): s is string => !!s && s.trim().length > 0;

export default async function CalculatorCMS({ slug }: { slug: string }) {
  const cms: StrapiCalcContent | null = await getCalcContent(slug);
  if (!cms) return null;

  const contentText = hasText(cms.content) ? cms.content : null;
  const faqs = cms.faqs ?? [];

  if (!contentText && faqs.length === 0) return null;

  return (
    <div className="mt-8 sm:mt-10 flex flex-col gap-4 sm:gap-5">
      {contentText && (
        <GlassCard className="p-5 sm:p-6 md:p-8">
          <MarkdownBody content={contentText} />
        </GlassCard>
      )}

      {faqs.length > 0 && (
        <GlassCard className="p-5 sm:p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/10 text-on-surface-variant">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h2 className="font-headline font-bold text-base sm:text-lg text-on-surface">
              Frequently asked questions
            </h2>
          </div>
          <div className="divide-y divide-white/5">
            {faqs.map((faq) => (
              <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
