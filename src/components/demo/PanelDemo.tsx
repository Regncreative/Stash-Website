'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  AlertTriangle,
  FileText,
  Heart,
  Image as ImageIcon,
  Pin,
  Plus,
  Search,
  Trash2,
  Upload,
} from 'lucide-react'
import {
  DemoAppHeader,
  DemoPanel,
  DemoStage,
  DemoTaskbar,
  wait,
} from '@/components/demo/shared'
import { cn } from '@/lib/cn'

type Phase =
  | 'idle'
  | 'tray'
  | 'expand'
  | 'files'
  | 'searchOpen'
  | 'searchType'
  | 'filter'
  | 'missing'
  | 'delete'
  | 'deleted'
  | 'close'

type DemoFile = {
  id: string
  name: string
  size: string
  time: string
  kind: 'psd' | 'png' | 'edge' | 'txt'
  missing?: boolean
}

const INITIAL_FILES: DemoFile[] = [
  { id: 'psd', name: 'Design.psd', size: '384 MB', time: '18:57', kind: 'psd' },
  { id: 'png', name: 'images.png', size: '6.0 KB', time: '18:57', kind: 'png' },
  { id: 'amazon', name: 'amazon.svg', size: '3.1 KB', time: '18:57', kind: 'edge' },
  { id: 'old', name: 'OldBrief.pdf', size: '890 KB', time: '17:12', kind: 'txt', missing: true },
  { id: 'f2', name: 'Files 2.txt', size: '0 B', time: '18:48', kind: 'txt' },
  { id: 'f1', name: 'Files 1.txt', size: '0 B', time: '18:48', kind: 'txt' },
]

const SEQUENCE: Array<{ phase: Phase; ms: number }> = [
  { phase: 'tray', ms: 500 },
  { phase: 'expand', ms: 450 },
  { phase: 'files', ms: 1300 },
  { phase: 'searchOpen', ms: 400 },
  { phase: 'searchType', ms: 800 },
  { phase: 'filter', ms: 900 },
  { phase: 'missing', ms: 1100 },
  { phase: 'delete', ms: 700 },
  { phase: 'deleted', ms: 900 },
  { phase: 'close', ms: 500 },
  { phase: 'idle', ms: 350 },
]

/** Compact panel demo: search, missing files, delete. */
export function PanelDemo() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(reduceMotion ? 'missing' : 'idle')
  const [visibleCount, setVisibleCount] = useState(reduceMotion ? INITIAL_FILES.length : 0)
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [removedIds, setRemovedIds] = useState<string[]>([])
  const [deletingId, setDeletingId] = useState<string | null>(null)

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
            setRemovedIds([])
            setDeletingId(null)
          }

          if (step.phase === 'files') {
            setVisibleCount(0)
            for (let i = 1; i <= INITIAL_FILES.length; i += 1) {
              if (cancelled) return
              await wait(130)
              setVisibleCount(i)
            }
          }

          if (step.phase === 'searchOpen') setSearchOpen(true)

          if (step.phase === 'searchType') {
            setQuery('')
            for (const ch of 'Design') {
              if (cancelled) return
              await wait(90)
              setQuery((q) => q + ch)
            }
          }

          if (step.phase === 'missing') {
            setSearchOpen(false)
            setQuery('')
          }

          if (step.phase === 'delete') {
            setDeletingId('old')
          }

          if (step.phase === 'deleted') {
            setRemovedIds(['old'])
            setDeletingId(null)
          }

          if (step.phase === 'close' || step.phase === 'idle') {
            setSearchOpen(false)
            setQuery('')
            setVisibleCount(0)
            setRemovedIds([])
            setDeletingId(null)
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

  const panelOpen = !['idle', 'tray', 'close'].includes(phase)
  const panelClosing = phase === 'close'
  const panelShown = panelOpen || panelClosing
  const filtering = phase === 'filter' || phase === 'searchType'
  const highlightMissing = phase === 'missing' || phase === 'delete'

  const files = INITIAL_FILES.filter((f) => !removedIds.includes(f.id))
  const fileCount = Math.max(
    filtering && query
      ? files.filter((f) => f.name.toLowerCase().includes(query.toLowerCase())).length
      : Math.min(visibleCount, files.length),
    0,
  )

  return (
    <DemoStage>
      <div className="absolute inset-x-3 top-3 bottom-[56px]">
        <motion.div
          className="h-full origin-bottom"
          initial={false}
          animate={{
            opacity: panelShown && !panelClosing ? 1 : 0,
            y: panelShown && !panelClosing ? 0 : 14,
            scale: panelShown && !panelClosing ? 1 : 0.97,
          }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <DemoPanel>
            <DemoAppHeader
              subtitle={`1 Shelves · ${fileCount} Files · 384 MB`}
              searchActive={searchOpen}
            />

            <div className="h-8 px-4">
              <AnimatePresence initial={false}>
                {searchOpen ? (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative h-8"
                  >
                    <Search
                      size={13}
                      className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-[#9ca3af]"
                    />
                    <div className="flex h-8 items-center rounded-[9px] border border-white/10 bg-[#1a2233] pr-2 pl-8 text-[12px]">
                      <span className={cn(!query && 'text-[#9ca3af]')}>
                        {query || 'Search files…'}
                      </span>
                      {searchOpen && !reduceMotion ? (
                        <motion.span
                          className="ml-0.5 inline-block h-3 w-px bg-[#3b82f6]"
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      ) : null}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 px-4 pt-2 pb-2">
              <div className="flex h-8 items-center gap-1.5 rounded-full bg-[#2563eb] px-3 text-[12px] font-medium shadow-[0_6px_16px_rgba(37,99,235,0.35)]">
                <Heart size={13} fill="currentColor" />
                Personal
                <span className="text-white/85">{fileCount || files.length}</span>
              </div>
              <div className="flex size-8 items-center justify-center rounded-full bg-[#1a2233] text-[#9ca3af]">
                <Plus size={15} />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden px-4">
              <ul className="space-y-1.5">
                {INITIAL_FILES.map((file, index) => {
                  const removed = removedIds.includes(file.id)
                  const revealed = index < visibleCount && !removed
                  const matches =
                    !filtering ||
                    !query ||
                    file.name.toLowerCase().includes(query.toLowerCase())
                  const isMissingFocus = highlightMissing && file.missing
                  const isDeleting = deletingId === file.id

                  return (
                    <motion.li
                      key={file.id}
                      initial={false}
                      animate={{
                        opacity: removed ? 0 : !revealed ? 0 : matches ? 1 : 0.22,
                        y: removed || isDeleting ? -6 : revealed ? 0 : 4,
                        x: isDeleting ? 18 : 0,
                        scale: removed ? 0.94 : isDeleting ? 0.96 : 1,
                        height: removed ? 0 : 48,
                        marginBottom: removed ? 0 : 6,
                      }}
                      transition={{ duration: 0.28, delay: phase === 'files' ? index * 0.03 : 0 }}
                      className={cn(
                        'flex items-center gap-2.5 overflow-hidden rounded-[12px] bg-[#1a2233] px-2.5',
                        filtering && matches && query && 'ring-1 ring-[#2563eb]/30',
                        isMissingFocus && 'ring-1 ring-amber-400/45',
                        isDeleting && 'ring-1 ring-rose-400/40',
                      )}
                    >
                      <div className={cn('relative', file.missing && 'grayscale')}>
                        <FileGlyph kind={file.kind} />
                        {file.missing ? (
                          <AlertTriangle className="absolute -top-1 -right-1 size-3 text-amber-400" />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div
                          className={cn(
                            'truncate text-[12px] font-medium',
                            file.missing && 'text-[#9ca3af] line-through',
                          )}
                        >
                          {file.name}
                        </div>
                        <div className="mt-0.5 text-[10px] text-[#9ca3af]">
                          {file.missing ? (
                            <span className="text-amber-400">File not found</span>
                          ) : (
                            file.size
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-[#9ca3af]">
                        <span className="mr-1 text-[10px] tabular-nums">{file.time}</span>
                        <Pin size={12} className="opacity-40" />
                        <Trash2
                          size={12}
                          className={cn(
                            'opacity-40',
                            (isDeleting || (highlightMissing && file.missing)) &&
                              'text-rose-400 opacity-100',
                          )}
                        />
                      </div>
                    </motion.li>
                  )
                })}
              </ul>
            </div>

            <div className="px-4 pt-1.5 pb-3">
              <div className="flex items-center justify-center gap-2 rounded-[12px] border border-dashed border-white/12 py-2.5 text-[10px] font-medium text-[#9ca3af]">
                <Upload size={12} />
                Drop files here
              </div>
            </div>
          </DemoPanel>
        </motion.div>
      </div>

      <DemoTaskbar active={phase === 'tray' || panelShown} />
    </DemoStage>
  )
}

function FileGlyph({ kind }: { kind: DemoFile['kind'] }) {
  if (kind === 'psd') {
    return (
      <div className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-[#1e3a5f]">
        <span className="rounded bg-[#31a8ff] px-0.5 text-[8px] font-bold text-white">Ps</span>
      </div>
    )
  }
  if (kind === 'edge') {
    return (
      <div className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-white/5">
        <div
          className="size-5 rounded-full"
          style={{
            background: 'conic-gradient(from 210deg, #0c64d0, #36c5f0, #1ea760, #f7b928, #0c64d0)',
          }}
        />
      </div>
    )
  }
  if (kind === 'png') {
    return (
      <div className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-white/5 text-[#60a5fa]">
        <ImageIcon size={16} strokeWidth={1.5} />
      </div>
    )
  }
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-white/5 text-[#9ca3af]">
      <FileText size={16} strokeWidth={1.5} />
    </div>
  )
}
