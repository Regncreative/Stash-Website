'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { FileText, Image as ImageIcon, Settings2 } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { WindowFrame } from '@/components/ui/WindowFrame'
import { cn } from '@/lib/cn'

export function Screens() {
  const reduceMotion = useReducedMotion()

  return (
    <Section
      id="screens"
      eyebrow="Interface"
      title="Realistic Windows mockups — not stock screenshots"
      description="Glass surfaces, soft depth, and Fluent spacing that mirror the installed experience."
    >
      <div className="relative mx-auto max-w-5xl perspective-[1400px]">
        <div
          aria-hidden
          className="absolute inset-x-10 top-1/3 -z-10 h-40 rounded-full bg-[var(--accent)]/10 blur-3xl"
        />

        <div className="grid items-end gap-6 lg:grid-cols-[1fr_1.15fr_0.9fr]">
          <MockPanel
            className="lg:translate-y-8"
            style={{ transform: 'perspective(1200px) rotateY(-6deg) translateY(2rem)' }}
            title="Shelves"
            dark
            reduceMotion={!!reduceMotion}
            delay={0}
          >
            <div className="space-y-2 p-4">
              {['Work', 'Personal', 'Temporary'].map((shelf, i) => (
                <div
                  key={shelf}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5',
                    i === 0 ? 'bg-white/10' : 'bg-white/[0.04]',
                  )}
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: ['#2563EB', '#8764B8', '#00B294'][i] }}
                  />
                  <span className="text-sm">{shelf}</span>
                </div>
              ))}
            </div>
          </MockPanel>

          <MockPanel
            className="lg:z-10 lg:scale-[1.03]"
            title="Stash"
            reduceMotion={!!reduceMotion}
            delay={0.08}
          >
            <div className="space-y-2 p-4">
              {[
                { name: 'Proposal.pdf', Icon: FileText },
                { name: 'Cover.png', Icon: ImageIcon },
                { name: 'Agenda.docx', Icon: FileText },
              ].map((file) => (
                <div
                  key={file.name}
                  className="flex items-center gap-3 rounded-xl bg-black/[0.03] px-3 py-2.5 ring-1 ring-black/[0.04]"
                >
                  <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                    <file.Icon className="size-4" />
                  </span>
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
              ))}
            </div>
          </MockPanel>

          <MockPanel
            className="lg:translate-y-10"
            style={{ transform: 'perspective(1200px) rotateY(6deg) translateY(2.5rem)' }}
            title="Settings"
            reduceMotion={!!reduceMotion}
            delay={0.16}
          >
            <div className="space-y-3 p-4 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-black/[0.03] px-3 py-2.5">
                <span className="inline-flex items-center gap-2">
                  <Settings2 className="size-4 text-[var(--accent)]" />
                  Start with Windows
                </span>
                <span className="h-5 w-9 rounded-full bg-[var(--accent)] p-0.5">
                  <span className="block size-4 translate-x-4 rounded-full bg-white" />
                </span>
              </div>
              <div className="rounded-xl bg-black/[0.03] px-3 py-2.5 text-[var(--muted)]">
                Shortcut · Ctrl+Shift+Space
              </div>
              <div className="rounded-xl bg-black/[0.03] px-3 py-2.5 text-[var(--muted)]">
                Language · English / Türkçe
              </div>
            </div>
          </MockPanel>
        </div>
      </div>
    </Section>
  )
}

function MockPanel({
  children,
  title,
  className,
  style,
  dark,
  reduceMotion,
  delay,
}: {
  children: React.ReactNode
  title: string
  className?: string
  style?: React.CSSProperties
  dark?: boolean
  reduceMotion: boolean
  delay: number
}) {
  return (
    <motion.div
      className={cn('transform-gpu max-lg:[transform:none!important]', className)}
      style={style}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
    >
      <WindowFrame title={title} dark={dark} className="backdrop-blur-xl">
        {children}
      </WindowFrame>
    </motion.div>
  )
}
