'use client';

import { useState } from 'react';
import { Bug, Lightbulb, MessageSquare, Shield, Send, Mail, Clock } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

const CATEGORIES = [
  {
    id: 'bug',
    icon: Bug,
    label: 'Report a bug',
    desc: 'Something broken or giving wrong results?',
    color: 'from-red-500/20 to-red-600/10',
    iconColor: 'text-red-400',
    ring: 'ring-red-500/30',
  },
  {
    id: 'suggest',
    icon: Lightbulb,
    label: 'Suggest a calculator',
    desc: 'Got an idea for a new tool we should build?',
    color: 'from-yellow-500/20 to-yellow-600/10',
    iconColor: 'text-yellow-400',
    ring: 'ring-yellow-500/30',
  },
  {
    id: 'feedback',
    icon: MessageSquare,
    label: 'General feedback',
    desc: 'Comments, questions, or just want to say hi?',
    color: 'from-primary-dim/20 to-primary/10',
    iconColor: 'text-primary',
    ring: 'ring-primary/30',
  },
  {
    id: 'legal',
    icon: Shield,
    label: 'Legal or privacy',
    desc: 'Questions about data, terms, or rights?',
    color: 'from-secondary/20 to-secondary/10',
    iconColor: 'text-secondary',
    ring: 'ring-secondary/30',
  },
];

export default function ContactPage() {
  const [selected, setSelected] = useState('feedback');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, category: selected }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/50 focus:bg-white/[0.06] transition-colors';

  return (
    <div className="pt-28 pb-20 px-5 md:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-3">Contact</p>
          <h1 className="font-headline font-black text-4xl md:text-6xl tracking-tighter text-on-surface mb-4">
            Get in touch
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            We genuinely read every message. Whether you found a bug, want to suggest a calculator, or just have feedback — we'd love to hear from you. We usually respond within a couple of business days.
          </p>
        </div>

        {/* Category selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = selected === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelected(cat.id)}
                className={`relative text-left p-4 rounded-2xl border transition-all ${
                  active
                    ? `bg-gradient-to-br ${cat.color} border-white/15 ring-1 ${cat.ring}`
                    : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/10'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-3`}>
                  <Icon className={`w-4 h-4 ${active ? cat.iconColor : 'text-on-surface-variant'}`} />
                </div>
                <p className="text-sm font-semibold text-on-surface leading-tight mb-1">{cat.label}</p>
                <p className="text-xs text-on-surface-variant leading-snug">{cat.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Form */}
        {sent ? (
          <GlassCard className="p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center mx-auto mb-5">
              <Send className="w-7 h-7 text-white" />
            </div>
            <h2 className="font-headline font-bold text-2xl text-on-surface mb-2">Message sent</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm mx-auto mb-6">
              Thanks for reaching out. We'll get back to you at <span className="text-primary">{form.email}</span> within a couple of business days.
            </p>
            <button
              onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
              className="text-xs text-on-surface-variant/60 hover:text-primary transition-colors"
            >
              Send another message
            </button>
          </GlassCard>
        ) : (
          <GlassCard className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold tracking-widest uppercase text-on-surface-variant/60">Your name</label>
                  <input
                    type="text"
                    placeholder="How should we address you?"
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold tracking-widest uppercase text-on-surface-variant/60">Email address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-widest uppercase text-on-surface-variant/60">Subject</label>
                <input
                  type="text"
                  placeholder="A one-line summary"
                  className={inputClass}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-widest uppercase text-on-surface-variant/60">Message</label>
                <textarea
                  rows={6}
                  placeholder="Tell us what's on your mind. Specific details help — which calculator, what you expected, what happened, etc."
                  className={`${inputClass} resize-none`}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>

              {error && (
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                  {error}
                </p>
              )}
              <div className="flex items-center justify-between flex-wrap gap-4 pt-1">
                <p className="text-xs text-on-surface-variant/50">
                  By submitting, you agree to our{' '}
                  <a href="/privacy" className="text-primary hover:underline">privacy policy</a>.
                  {" We'll only use your info to respond."}
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-dim to-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity press disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Sending…' : 'Send message'}
                </button>
              </div>
            </form>
          </GlassCard>
        )}

        {/* Bottom info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <GlassCard className="p-6 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-dim/30 to-primary/20 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface mb-1">Prefer email?</p>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-2">
                You can reach us directly at the address below. We read everything.
              </p>
              <a href="mailto:hello@allsmartcalculator.tech" className="text-xs text-primary font-mono hover:underline">
                hello@allsmartcalculator.tech
              </a>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/30 to-secondary/20 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface mb-1">Response time</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                We aim to respond within 2–3 business days. If it's urgent or about a broken calculator affecting many users, we usually get to it faster.
              </p>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
