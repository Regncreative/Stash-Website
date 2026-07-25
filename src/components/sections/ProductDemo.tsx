'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  FileText,
  Heart,
  Image as ImageIcon,
  Pin,
  Plus,
  Search,
  Settings,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { cn } from '@/lib/cn'

type Phase =
  | 'idle'
  | 'tray'
  | 'expand'
  | 'files'
  | 'drag'
  | 'dropHighlight'
  | 'searchOpen'
  | 'searchType'
  | 'filter'
  | 'close'

type DemoFile = {
  id: string
  name: string
  size: string
  time: string
  kind: 'psd' | 'png' | 'edge' | 'txt'
}

const FILES: DemoFile[] = [
  { id: 'psd', name: 'Design.psd', size: '384 MB', time: '18:57', kind: 'psd' },
  { id: 'png', name: 'images.png', size: '6.0 KB', time: '18:57', kind: 'png' },
  { id: 'amazon', name: 'amazon.svg', size: '3.1 KB', time: '18:57', kind: 'edge' },
  { id: 'wallmart', name: 'wallmart.svg', size: '2.0 KB', time: '18:57', kind: 'edge' },
  { id: 'f2', name: 'Files 2.txt', size: '0 B', time: '18:48', kind: 'txt' },
  { id: 'f1', name: 'Files 1.txt', size: '0 B', time: '18:48', kind: 'txt' },
]

const SEQUENCE: Array<{ phase: Phase; ms: number }> = [
  { phase: 'tray', ms: 650 },
  { phase: 'expand', ms: 500 },
  { phase: 'files', ms: 1500 },
  { phase: 'drag', ms: 1100 },
  { phase: 'dropHighlight', ms: 750 },
  { phase: 'searchOpen', ms: 450 },
  { phase: 'searchType', ms: 850 },
  { phase: 'filter', ms: 1100 },
  { phase: 'close', ms: 550 },
  { phase: 'idle', ms: 400 },
]

export function ProductDemo() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(reduceMotion ? 'filter' : 'idle')
  const [visibleCount, setVisibleCount] = useState(reduceMotion ? FILES.length : 0)
  const [query, setQuery] = useState(reduceMotion ? 'Design' : '')
  const [searchOpen, setSearchOpen] = useState(!!reduceMotion)

  useEffect(() => {
    if (reduceMotion) return

    let cancelled = false

    const run = async () => {
      while (!cancelled) {
        for (const step of SEQUENCE) {
          if (cancelled) return
          setPhase(step.phase)

          if (step.phase === 'expand') {
            setSearchOpen(false)
            setQuery('')
            setVisibleCount(0)
          }

          if (step.phase === 'files') {
            setVisibleCount(0)
            for (let i = 1; i <= FILES.length; i += 1) {
              if (cancelled) return
              await wait(150)
              setVisibleCount(i)
            }
          }

          if (step.phase === 'searchOpen') {
            setSearchOpen(true)
          }

          if (step.phase === 'searchType') {
            setQuery('')
            for (const ch of 'Design') {
              if (cancelled) return
              await wait(100)
              setQuery((q) => q + ch)
            }
          }

          if (step.phase === 'close' || step.phase === 'idle') {
            setSearchOpen(false)
            setQuery('')
            setVisibleCount(0)
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

  const panelOpen = phase !== 'idle' && phase !== 'tray' && phase !== 'close'
  const panelClosing = phase === 'close'
  const panelShown = panelOpen || panelClosing
  const dropActive = phase === 'dropHighlight' || phase === 'drag'
  const filtering = phase === 'filter' || phase === 'searchType'

  const shown = useMemo(() => {
    const base = FILES.slice(0, Math.max(visibleCount, reduceMotion ? FILES.length : 0))
    if (!filtering || !query) return base
    return base.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
  }, [filtering, query, visibleCount, reduceMotion])

  const fileCount = filtering && query ? shown.length : Math.max(visibleCount, reduceMotion ? 6 : 0)

  return (
    <Section
      id="demo"
      eyebrow="Product demo"
      title="Feels like a built-in Windows feature"
      description="An interactive mockup of the real Stash panel — same layout, same Fluent motion."
    >
      <div className="relative mx-auto w-full max-w-[400px]">
        <div
          aria-hidden
          className="absolute inset-x-6 -bottom-6 h-24 rounded-full bg-[var(--accent)]/15 blur-3xl"
        />

        {/* Fixed stage — never resizes during the loop */}
        <div className="relative h-[620px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#1a2332_0%,#111827_55%,#0b1220_100%)] sm:h-[640px]">
          {/* Panel layer — absolute so open/close never shifts the stage */}
          <div className="absolute inset-x-4 top-4 bottom-[68px] sm:inset-x-5 sm:top-5 sm:bottom-[72px]">
            <motion.div
              className="h-full origin-bottom"
              initial={false}
              animate={{
                opacity: panelShown && !panelClosing ? 1 : 0,
                y: panelShown && !panelClosing ? 0 : 18,
                scale: panelShown && !panelClosing ? 1 : 0.97,
                pointerEvents: panelShown && !panelClosing ? 'auto' : 'none',
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className={cn(
                  'flex h-full flex-col overflow-hidden rounded-[22px] bg-[#111827] text-white shadow-[0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/10',
                  dropActive && 'ring-[var(--accent)]/45',
                )}
              >
                {/* Header — fixed chrome */}
                <div className="shrink-0 px-5 pt-5 pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-[11px]"
                        style={{
                          background: 'linear-gradient(145deg, #3b82f6 0%, #2563eb 100%)',
                        }}
                        aria-hidden
                      >
                        <StashMark />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[22px] font-semibold leading-none tracking-[-0.02em]">
                          Stash
                        </p>
                        <p className="mt-1.5 truncate text-[13px] leading-none text-[#9ca3af]">
                          1 Shelves · {fileCount} Files · 384 MB
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-0.5 text-[#9ca3af]">
                      <span className={cn('rounded-lg p-2', searchOpen && 'bg-white/10 text-white')}>
                        <Search size={18} strokeWidth={1.75} />
                      </span>
                      <span className="rounded-lg p-2">
                        <Settings size={18} strokeWidth={1.75} />
                      </span>
                      <span className="rounded-lg p-2">
                        <X size={18} strokeWidth={1.75} />
                      </span>
                    </div>
                  </div>

                  {/* Search — reserved slot so open/close doesn't jump layout */}
                  <div className="mt-3 h-9">
                    <AnimatePresence initial={false}>
                      {searchOpen ? (
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="relative h-9"
                        >
                          <Search
                            size={15}
                            strokeWidth={1.75}
                            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#9ca3af]"
                          />
                          <div className="flex h-9 w-full items-center rounded-[10px] border border-white/10 bg-[#1a2233] pr-3 pl-9 text-[13px]">
                            <span className={cn(!query && 'text-[#9ca3af]')}>
                              {query || 'Search files…'}
                            </span>
                            {!reduceMotion ? (
                              <motion.span
                                className="ml-0.5 inline-block h-3.5 w-px bg-[#3b82f6]"
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                              />
                            ) : null}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Shelf bar */}
                <div className="shrink-0 px-5 pb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'flex h-10 items-center gap-2 rounded-full bg-[#2563eb] px-4 text-[13px] font-medium text-white shadow-[0_6px_18px_rgba(37,99,235,0.35)]',
                        dropActive && 'ring-2 ring-white/25',
                      )}
                    >
                      <Heart size={16} strokeWidth={1.75} fill="currentColor" />
                      <span>Personal</span>
                      <span className="tabular-nums text-white/85">{fileCount || 6}</span>
                    </div>
                    <div className="flex size-10 items-center justify-center rounded-full bg-[#1a2233] text-[#9ca3af]">
                      <Plus size={18} strokeWidth={1.75} />
                    </div>
                  </div>
                </div>

                {/* File list — fixed slots; only opacity/transform change */}
                <div className="relative min-h-0 flex-1 overflow-hidden px-5">
                  <ul className="space-y-2" aria-hidden>
                    {FILES.map((file, index) => {
                      const revealed = index < visibleCount
                      const matches =
                        !filtering ||
                        !query ||
                        file.name.toLowerCase().includes(query.toLowerCase())
                      const dragging = phase === 'drag' && file.id === 'png' && revealed

                      return (
                        <motion.li
                          key={file.id}
                          initial={false}
                          animate={{
                            opacity: !revealed ? 0 : matches ? 1 : 0.22,
                            y: revealed ? (dragging ? -6 : 0) : 6,
                            x: dragging ? 12 : 0,
                            scale: dragging ? 1.02 : 1,
                          }}
                          transition={{
                            duration: 0.28,
                            delay: revealed && phase === 'files' ? index * 0.04 : 0,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={cn(
                            'flex h-[60px] items-center gap-3 rounded-[14px] bg-[#1a2233] px-3',
                            dragging && 'z-10 shadow-xl ring-1 ring-[#2563eb]/40',
                            filtering && matches && query && 'ring-1 ring-[#2563eb]/35',
                          )}
                        >
                          <FileGlyph kind={file.kind} />
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[14px] font-medium leading-tight">
                              {file.name}
                            </div>
                            <div className="mt-1 text-[12px] leading-none text-[#9ca3af]">
                              {file.size}
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-1 text-[#9ca3af]">
                            <span className="mr-1 text-[12px] tabular-nums">{file.time}</span>
                            <Pin size={15} strokeWidth={1.75} className="opacity-40" />
                            <Trash2 size={15} strokeWidth={1.75} className="opacity-40" />
                          </div>
                        </motion.li>
                      )
                    })}
                  </ul>
                </div>

                {/* Drop footer — always pinned to bottom of panel */}
                <div className="shrink-0 px-5 pt-2 pb-4">
                  <div
                    className={cn(
                      'flex items-center justify-center gap-2.5 rounded-[14px] border border-dashed px-4 py-3 text-[13px] font-medium transition-colors duration-200',
                      dropActive
                        ? 'border-[#2563eb] bg-[rgba(37,99,235,0.16)] text-[#60a5fa]'
                        : 'border-white/12 bg-white/[0.02] text-[#9ca3af]',
                    )}
                  >
                    <Upload size={18} strokeWidth={1.75} />
                    {dropActive ? 'Release to stash' : 'Drop files here'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Taskbar — fixed to stage bottom */}
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-[#0b1220]/95 px-4 py-2.5 text-white ring-1 ring-white/10 sm:inset-x-5 sm:bottom-5">
            <div className="flex items-center gap-3 text-xs text-white/60">
              <span>12:24</span>
              <span className="hidden sm:inline">Windows 11</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                className={cn(
                  'flex size-8 items-center justify-center rounded-[10px]',
                  phase === 'tray' || panelShown
                    ? 'bg-[#2563eb] shadow-[0_0_0_3px_rgba(37,99,235,0.25)]'
                    : 'bg-white/10',
                )}
                animate={
                  reduceMotion
                    ? undefined
                    : phase === 'tray'
                      ? { scale: [1, 1.08, 1] }
                      : { scale: 1 }
                }
                transition={{ duration: 0.5 }}
              >
                <StashMark />
              </motion.div>
              <span className="text-xs text-white/80">Stash</span>
            </div>
          </div>

          {!reduceMotion && phase === 'drag' ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute top-[38%] left-[62%] z-20 size-3 rounded-full bg-white/90 shadow-md ring-2 ring-black/20"
              animate={{ x: [0, 28, 40], y: [0, 80, 130] }}
              transition={{ duration: 1.05, ease: 'easeInOut' }}
            />
          ) : null}
        </div>
      </div>
    </Section>
  )
}

function StashMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2.5" y="3" width="11" height="2.2" rx="0.7" fill="white" />
      <rect x="2.5" y="6.9" width="11" height="2.2" rx="0.7" fill="white" opacity="0.8" />
      <rect x="2.5" y="10.8" width="8" height="2.2" rx="0.7" fill="white" opacity="0.55" />
    </svg>
  )
}

function FileGlyph({ kind }: { kind: DemoFile['kind'] }) {
  if (kind === 'psd') {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-[#1e3a5f]">
        <span className="rounded bg-[#31a8ff] px-1 py-0.5 text-[9px] font-bold text-white">Ps</span>
      </div>
    )
  }
  if (kind === 'edge') {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-white/5">
        <div
          className="size-6 rounded-full"
          style={{
            background:
              'conic-gradient(from 210deg, #0c64d0, #36c5f0, #1ea760, #f7b928, #0c64d0)',
          }}
        />
      </div>
    )
  }
  if (kind === 'png') {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-white/5 text-[#60a5fa]">
        <ImageIcon size={20} strokeWidth={1.5} />
      </div>
    )
  }
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-white/5 text-[#9ca3af]">
      <FileText size={20} strokeWidth={1.5} />
    </div>
  )
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
