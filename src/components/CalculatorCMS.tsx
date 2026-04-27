import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getCalcContent, StrapiCalcContent } from '@/lib/strapi';
import GlassCard from './GlassCard';
import { Lightbulb, BookOpen, HelpCircle, ChevronDown } from 'lucide-react';

function MarkdownBody({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none
      prose-p:text-on-surface-variant prose-p:leading-relaxed
      prose-headings:text-on-surface prose-headings:font-headline prose-headings:font-bold
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-strong:text-on-surface
      prose-li:text-on-surface-variant
      prose-code:text-secondary prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
      prose-blockquote:border-l-primary prose-blockquote:text-on-surface-variant
    ">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  color,
  children,
}: {
  icon: React.ElementType;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <GlassCard className="p-5 sm:p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4 sm:mb-5">
        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <h2 className="font-headline font-bold text-base sm:text-lg text-on-surface">{title}</h2>
      </div>
      {children}
    </GlassCard>
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

export default async function CalculatorCMS({ slug }: { slug: string }) {
  const content: StrapiCalcContent | null = await getCalcContent(slug);

  if (!content) return null;

  const hasContent = content.intro || content.tips || content.formulaExplanation || content.faqs?.length;
  if (!hasContent) return null;

  return (
    <div className="mt-8 sm:mt-10 flex flex-col gap-4 sm:gap-5">
      {/* Intro */}
      {content.intro && (
        <SectionCard icon={BookOpen} title="About this calculator" color="bg-primary/15 text-primary">
          <MarkdownBody content={content.intro} />
        </SectionCard>
      )}

      {/* Tips */}
      {content.tips && (
        <SectionCard icon={Lightbulb} title="Tips & how to use" color="bg-tertiary/15 text-tertiary">
          <MarkdownBody content={content.tips} />
        </SectionCard>
      )}

      {/* Formula explanation */}
      {content.formulaExplanation && (
        <SectionCard icon={BookOpen} title="How the formula works" color="bg-secondary/15 text-secondary">
          <MarkdownBody content={content.formulaExplanation} />
        </SectionCard>
      )}

      {/* FAQs */}
      {content.faqs?.length > 0 && (
        <SectionCard icon={HelpCircle} title="Frequently asked questions" color="bg-white/10 text-on-surface-variant">
          <div className="divide-y divide-white/5">
            {content.faqs.map((faq) => (
              <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
