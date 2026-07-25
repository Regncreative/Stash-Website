'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { cn } from '@/lib/cn'

const faqs = [
  {
    q: 'Does Stash move my files?',
    a: 'No. Stash stores references (paths) only. Your files stay exactly where they are on disk.',
  },
  {
    q: 'Does it upload files?',
    a: 'No. There is no cloud sync and no account. Metadata stays local in SQLite on your machine.',
  },
  {
    q: 'Does it require an account?',
    a: 'No account, no sign-in. Install, launch from the tray, and start dropping files.',
  },
  {
    q: 'Is it open source?',
    a: 'Yes. Stash is MIT-licensed and developed in the open on GitHub.',
  },
  {
    q: 'Does it support Windows 10?',
    a: 'Yes. Stash targets Windows 11 aesthetics and is compatible with Windows 10 (x64).',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const reduceMotion = useReducedMotion()
  const baseId = useId()

  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Straight answers"
      description="The short version: local references, no uploads, open source."
    >
      <div className="mx-auto max-w-2xl divide-y divide-[var(--border)] rounded-3xl bg-[var(--surface)] ring-1 ring-[var(--border)]">
        {faqs.map((item, index) => {
          const isOpen = open === index
          const panelId = `${baseId}-panel-${index}`
          const buttonId = `${baseId}-button-${index}`

          return (
            <div key={item.q} className="px-5 sm:px-6">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-semibold text-[var(--foreground)]"
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  {item.q}
                  <ChevronDown
                    className={cn(
                      'size-5 shrink-0 text-[var(--muted)] transition-transform duration-300',
                      isOpen && 'rotate-180',
                    )}
                    aria-hidden
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed text-[var(--muted)]">{item.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
