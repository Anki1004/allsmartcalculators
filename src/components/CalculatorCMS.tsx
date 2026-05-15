import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getCalcContent, StrapiCalcContent } from '@/lib/strapi';
import type { CalculatorConfig } from '@/lib/calculator-types';
import GlassCard from './GlassCard';
import BlocksBody from './BlocksBody';
import { Lightbulb, BookOpen, HelpCircle, ChevronDown, FileText } from 'lucide-react';

const PROSE_CLASSES = `prose prose-invert prose-sm max-w-none
  prose-p:text-on-surface-variant prose-p:leading-relaxed
  prose-headings:text-on-surface prose-headings:font-headline prose-headings:font-bold
  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
  prose-strong:text-on-surface
  prose-li:text-on-surface-variant
  prose-code:text-secondary prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
  prose-blockquote:border-l-primary prose-blockquote:text-on-surface-variant`;

function MarkdownBody({ content }: { content: string }) {
  return (
    <div className={PROSE_CLASSES}>
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

function FaqItemMarkdown({ question, answer }: { question: string; answer: string }) {
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

function FaqItemPlain({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-white/5 last:border-0">
      <summary className="flex items-center justify-between gap-3 py-4 cursor-pointer list-none text-sm font-semibold text-on-surface hover:text-primary transition-colors">
        {question}
        <ChevronDown className="w-4 h-4 shrink-0 text-on-surface-variant group-open:rotate-180 transition-transform" />
      </summary>
      <p className="pb-4 text-sm md:text-base text-on-surface-variant leading-relaxed">
        {answer}
      </p>
    </details>
  );
}

const hasText = (s?: string | null): s is string => !!s && s.trim().length > 0;

export default async function CalculatorCMS({
  slug,
  calc,
}: {
  slug: string;
  calc: CalculatorConfig;
}) {
  const cms: StrapiCalcContent | null = await getCalcContent(slug);

  // ── Section-level fallback ────────────────────────────────────────
  const introText = hasText(cms?.intro) ? cms!.intro! : hasText(calc.intro) ? calc.intro! : null;
  const tipsText = hasText(cms?.tips) ? cms!.tips! : null;
  const formulaExplanationText = hasText(cms?.formulaExplanation)
    ? cms!.formulaExplanation!
    : hasText(calc.howItWorks)
      ? calc.howItWorks!
      : null;
  const formulaCode = hasText(calc.formula) ? calc.formula! : null;
  const bodyContent = cms?.bodyContent && cms.bodyContent.length > 0 ? cms.bodyContent : null;
  const cmsFaqs = cms?.faqs ?? [];
  const useCmsFaqs = cmsFaqs.length > 0;
  const hardcodedFaqs = calc.faqs ?? [];

  const hasAnything =
    introText ||
    tipsText ||
    formulaExplanationText ||
    formulaCode ||
    bodyContent ||
    useCmsFaqs ||
    hardcodedFaqs.length > 0;

  if (!hasAnything) return null;

  return (
    <div className="mt-8 sm:mt-10 flex flex-col gap-4 sm:gap-5">
      {introText && (
        <SectionCard icon={BookOpen} title="About this calculator" color="bg-primary/15 text-primary">
          <MarkdownBody content={introText} />
        </SectionCard>
      )}

      {tipsText && (
        <SectionCard icon={Lightbulb} title="Tips & how to use" color="bg-tertiary/15 text-tertiary">
          <MarkdownBody content={tipsText} />
        </SectionCard>
      )}

      {(formulaExplanationText || formulaCode) && (
        <SectionCard
          icon={BookOpen}
          title={`How ${calc.shortName ?? calc.name} is calculated`}
          color="bg-secondary/15 text-secondary"
        >
          {formulaExplanationText && <MarkdownBody content={formulaExplanationText} />}
          {formulaCode && (
            <code className="font-mono text-xs sm:text-sm md:text-base text-on-surface block bg-surface-container-lowest p-3 sm:p-4 rounded-xl overflow-x-auto whitespace-pre mt-3 sm:mt-4">
              {formulaCode}
            </code>
          )}
        </SectionCard>
      )}

      {bodyContent && (
        <SectionCard icon={FileText} title="In-depth guide" color="bg-primary/15 text-primary">
          <BlocksBody content={bodyContent} className={PROSE_CLASSES} />
        </SectionCard>
      )}

      {(useCmsFaqs || hardcodedFaqs.length > 0) && (
        <SectionCard icon={HelpCircle} title="Frequently asked questions" color="bg-white/10 text-on-surface-variant">
          <div className="divide-y divide-white/5">
            {useCmsFaqs
              ? cmsFaqs.map((faq) => (
                  <FaqItemMarkdown key={faq.id} question={faq.question} answer={faq.answer} />
                ))
              : hardcodedFaqs.map((faq, idx) => (
                  <FaqItemPlain key={idx} question={faq.q} answer={faq.a} />
                ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

