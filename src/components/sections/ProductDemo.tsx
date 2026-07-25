'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FileText, Image as ImageIcon, Search, FileSpreadsheet } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { cn } from '@/lib/cn'

type Phase =
  | 'idle'
  | 'tray'
  | 'expand'
  | 'glass'
  | 'files'
  | 'drag'
  | 'highlight'
  | 'searchFocus'
  | 'searchType'
  | 'filter'
  | 'close'

const FILES = [
  { id: 'brief', name: 'Brief.pdf', icon: FileText, match: true },
  { id: 'shot', name: 'Shot_01.png', icon: ImageIcon, match: false },
  { id: 'notes', name: 'Notes.docx', icon: FileText, match: false },
  { id: 'budget', name: 'Budget.xlsx', icon: FileSpreadsheet, match: true },
]

const SEQUENCE: Array<{ phase: Phase; ms: number }> = [
  { phase: 'tray', ms: 700 },
  { phase: 'expand', ms: 650 },
  { phase: 'glass', ms: 450 },
  { phase: 'files', ms: 1400 },
  { phase: 'drag', ms: 1100 },
  { phase: 'highlight', ms: 700 },
  { phase: 'searchFocus', ms: 500 },
  { phase: 'searchType', ms: 900 },
  { phase: 'filter', ms: 1100 },
  { phase: 'close', ms: 700 },
  { phase: 'idle', ms: 500 },
]

export function ProductDemo() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(reduceMotion ? 'filter' : 'idle')
  const [visibleFiles, setVisibleFiles] = useState(reduceMotion ? FILES.length : 0)
  const [query, setQuery] = useState(reduceMotion ? 'bu' : '')

  useEffect(() => {
    if (reduceMotion) return

    let cancelled = false

    const run = async () => {
      while (!cancelled) {
        for (const step of SEQUENCE) {
          if (cancelled) return
          setPhase(step.phase)

          if (step.phase === 'files') {
            setVisibleFiles(0)
            for (let i = 1; i <= FILES.length; i += 1) {
              if (cancelled) return
              await wait(220)
              setVisibleFiles(i)
            }
          }

          if (step.phase === 'searchType') {
            setQuery('')
            for (const ch of 'bu') {
              if (cancelled) return
              await wait(180)
              setQuery((q) => q + ch)
            }
          }

          if (step.phase === 'close' || step.phase === 'idle') {
            setQuery('')
            setVisibleFiles(0)
          }

          await wait(step.ms)
        }
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [reduceMotion])

  const open = phase !== 'idle' && phase !== 'tray'
  const glass = ['glass', 'files', 'drag', 'highlight', 'searchFocus', 'searchType', 'filter'].includes(
    phase,
  )
  const shelfHighlight = phase === 'highlight' || phase === 'drag'
  const searchActive = ['searchFocus', 'searchType', 'filter'].includes(phase)
  const filtering = phase === 'filter' || phase === 'searchType'

  const shown = useMemo(() => {
    if (!filtering || !query) return FILES.slice(0, Math.max(visibleFiles, reduceMotion ? FILES.length : 0))
    return FILES.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
  }, [filtering, query, visibleFiles, reduceMotion])

  return (
    <Section
      id="demo"
      eyebrow="Product demo"
      title="Feels like a built-in Windows feature"
      description="An interactive mockup of the tray shelf — no GIFs, just motion that mirrors the real app."
    >
      <div className="relative mx-auto max-w-3xl">
        <div
          aria-hidden
          className="absolute inset-x-8 -bottom-6 h-24 rounded-full bg-[var(--accent)]/15 blur-3xl"
        />

        <div className="relative flex min-h-[420px] flex-col items-center justify-end rounded-[28px] bg-[linear-gradient(180deg,#dbe4f0_0%,#c9d5e6_100%)] p-6 sm:min-h-[480px] sm:p-10">
          <AnimatePresence>
            {open ? (
              <motion.div
                key="panel"
                className="mb-4 w-full max-w-md origin-bottom"
                initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.94 }}
                animate={{
                  opacity: phase === 'close' ? 0 : 1,
                  y: phase === 'close' ? 18 : 0,
                  scale: phase === 'close' ? 0.96 : 1,
                }}
                exit={{ opacity: 0, y: 18, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassPanel
                  className={cn(
                    'overflow-hidden transition-[box-shadow,background-color] duration-500',
                    glass ? 'bg-white/70' : 'bg-white/35',
                    shelfHighlight && 'ring-2 ring-[var(--accent)]/50 shadow-[0_0_0_6px_rgba(37,99,235,0.12)]',
                  )}
                >
                  <div className="border-b border-black/[0.06] px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">Work</p>
                        <p className="text-xs text-[var(--muted)]">3 shelves · references only</p>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="size-2 rounded-full bg-[#2563eb]" />
                        <span className="size-2 rounded-full bg-[#8764B8]" />
                        <span className="size-2 rounded-full bg-[#00B294]" />
                      </div>
                    </div>
                    <div
                      className={cn(
                        'mt-3 flex items-center gap-2 rounded-xl px-3 py-2 ring-1 transition-all duration-300',
                        searchActive
                          ? 'bg-white ring-[var(--accent)] shadow-[0_0_0_3px_rgba(37,99,235,0.12)]'
                          : 'bg-black/[0.03] ring-transparent',
                      )}
                    >
                      <Search className="size-4 text-[var(--muted)]" aria-hidden />
                      <span className="text-sm text-[var(--muted)]">
                        {query || 'Search files…'}
                        {searchActive && !reduceMotion ? (
                          <motion.span
                            className="ml-0.5 inline-block h-4 w-px bg-[var(--accent)] align-middle"
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                        ) : null}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 p-3" aria-hidden>
                    <AnimatePresence mode="popLayout">
                      {shown.map((file, index) => {
                        const Icon = file.icon
                        const dragging = phase === 'drag' && file.id === 'shot'
                        return (
                          <motion.li
                            key={file.id}
                            layout
                            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                            animate={{
                              opacity: 1,
                              y: dragging ? -10 : 0,
                              x: dragging ? 18 : 0,
                              scale: dragging ? 1.03 : 1,
                            }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.35, delay: index * 0.04 }}
                            className={cn(
                              'flex items-center gap-3 rounded-xl bg-white/70 px-3 py-2.5 ring-1 ring-black/[0.04]',
                              dragging && 'z-10 shadow-lg ring-[var(--accent)]/30',
                            )}
                          >
                            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                              <Icon className="size-4" />
                            </span>
                            <span className="text-sm font-medium text-[var(--foreground)]">
                              {file.name}
                            </span>
                          </motion.li>
                        )
                      })}
                    </AnimatePresence>
                  </ul>
                </GlassPanel>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="relative flex w-full max-w-lg items-end justify-between rounded-2xl bg-[#1f2937] px-4 py-3 text-white shadow-xl">
            <div className="flex items-center gap-3 text-xs text-white/70">
              <span>12:24</span>
              <span className="hidden sm:inline">Windows 11</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                className={cn(
                  'flex size-8 items-center justify-center rounded-lg bg-white/10',
                  (phase === 'tray' || open) && 'bg-[var(--accent)]/30 ring-1 ring-[var(--accent)]/50',
                )}
                animate={
                  reduceMotion
                    ? undefined
                    : phase === 'tray'
                      ? { scale: [1, 1.08, 1] }
                      : { scale: 1 }
                }
                transition={{ duration: 0.6 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/logo.png" alt="" width={18} height={18} className="rounded" />
              </motion.div>
              <span className="text-xs text-white/80">Stash</span>
            </div>
          </div>

          {!reduceMotion && phase === 'drag' ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 shadow-md"
              animate={{ x: [0, 70, 90], y: [40, -10, -30] }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            />
          ) : null}
        </div>
      </div>
    </Section>
  )
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
