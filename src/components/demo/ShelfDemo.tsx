'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  FileText,
  Heart,
  Image as ImageIcon,
  Mail,
  Paperclip,
  Pin,
  Plus,
  Trash2,
  Upload,
} from 'lucide-react'
import {
  DemoAppHeader,
  DemoPanel,
  DemoStage,
  DemoTaskbar,
  ScaleToFit,
  wait,
} from '@/components/demo/shared'
import { cn } from '@/lib/cn'

type Phase =
  | 'idle'
  | 'tray'
  | 'expand'
  | 'inboundDrag'
  | 'inboundDrop'
  | 'mailOpen'
  | 'outboundDrag'
  | 'attached'
  | 'hold'
  | 'close'

type ShelfFile = {
  id: string
  name: string
  size: string
  time: string
  kind: 'pdf' | 'png' | 'txt'
}

const BASE_FILES: ShelfFile[] = [
  { id: 'png', name: 'images.png', size: '6.0 KB', time: '18:57', kind: 'png' },
  { id: 'txt', name: 'Notes.txt', size: '2.1 KB', time: '18:48', kind: 'txt' },
  { id: 'agenda', name: 'Agenda.docx', size: '84 KB', time: '18:40', kind: 'txt' },
]

const INBOUND: ShelfFile = {
  id: 'brief',
  name: 'Brief.pdf',
  size: '1.2 MB',
  time: '19:02',
  kind: 'pdf',
}

const SEQUENCE: Array<{ phase: Phase; ms: number }> = [
  { phase: 'tray', ms: 550 },
  { phase: 'expand', ms: 550 },
  { phase: 'inboundDrag', ms: 1200 },
  { phase: 'inboundDrop', ms: 750 },
  { phase: 'mailOpen', ms: 700 },
  { phase: 'outboundDrag', ms: 1300 },
  { phase: 'attached', ms: 1200 },
  { phase: 'hold', ms: 800 },
  { phase: 'close', ms: 550 },
  { phase: 'idle', ms: 450 },
]

/** Fixed desktop canvas — scaled down on narrow viewports so Mail + Stash stay side-by-side. */
const CANVAS_W = 1040
const CANVAS_H = 680

/** Wide desktop story: drop into Stash, then drag out to Mail. */
export function ShelfDemo() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(reduceMotion ? 'attached' : 'idle')
  const [hasInbound, setHasInbound] = useState(!!reduceMotion)
  const [attached, setAttached] = useState(!!reduceMotion)

  useEffect(() => {
    if (reduceMotion) return
    let cancelled = false

    const run = async () => {
      while (!cancelled) {
        setHasInbound(false)
        setAttached(false)

        for (const step of SEQUENCE) {
          if (cancelled) return
          setPhase(step.phase)

          if (step.phase === 'expand') {
            setHasInbound(false)
            setAttached(false)
          }
          if (step.phase === 'inboundDrop') setHasInbound(true)
          if (step.phase === 'attached') setAttached(true)
          if (step.phase === 'close' || step.phase === 'idle') {
            setHasInbound(false)
            setAttached(false)
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
  const dropActive = phase === 'inboundDrag' || phase === 'inboundDrop'
  const mailVisible = ['mailOpen', 'outboundDrag', 'attached', 'hold'].includes(phase)
  const mailHot = phase === 'outboundDrag' || phase === 'attached'
  const desktopGone = hasInbound || phase === 'inboundDrop'
  const draggingOut = phase === 'outboundDrag'
  const shelfFiles = hasInbound ? [INBOUND, ...BASE_FILES] : BASE_FILES

  return (
    <ScaleToFit width={CANVAS_W} height={CANVAS_H} className="rounded-[24px]">
      <DemoStage
        variant="wide"
        className="rounded-none bg-[linear-gradient(145deg,#243044_0%,#1a2332_40%,#121a27_100%)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 18% 18%, rgba(37,99,235,0.18), transparent 35%), radial-gradient(circle at 70% 25%, rgba(14,165,233,0.12), transparent 30%)',
          }}
        />

        {/* Desktop icons — left */}
        <div className="absolute top-8 left-10 z-10 flex flex-col gap-6">
          <motion.div
            className="flex w-[80px] flex-col items-center gap-1.5"
            animate={{ opacity: desktopGone ? 0 : 1, scale: desktopGone ? 0.85 : 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex size-14 items-center justify-center rounded-[14px] bg-white/10 ring-1 ring-white/15">
              <FileText size={26} className="text-[#f87171]" />
            </div>
            <span className="text-center text-[12px] leading-tight text-white/85">Brief.pdf</span>
          </motion.div>
          <div className="flex w-[80px] flex-col items-center gap-1.5 opacity-45">
            <div className="flex size-14 items-center justify-center rounded-[14px] bg-white/8 ring-1 ring-white/10">
              <ImageIcon size={24} className="text-[#60a5fa]" />
            </div>
            <span className="text-center text-[12px] leading-tight text-white/75">Shot.png</span>
          </div>
          <div className="flex w-[80px] flex-col items-center gap-1.5 opacity-35">
            <div className="flex size-14 items-center justify-center rounded-[14px] bg-white/8 ring-1 ring-white/10">
              <FileText size={24} className="text-[#9ca3af]" />
            </div>
            <span className="text-center text-[12px] leading-tight text-white/70">Todo.txt</span>
          </div>
        </div>

        {/* Mail compose — left of Stash panel */}
        <AnimatePresence>
          {mailVisible ? (
            <motion.div
              key="mail"
              className={cn(
                'absolute top-6 bottom-[64px] left-8 z-20 flex w-[520px] flex-col overflow-hidden rounded-[12px] bg-[#202020] shadow-[0_24px_64px_rgba(0,0,0,0.45)] ring-1 ring-white/12',
                mailHot && 'ring-[#2563eb]/60',
              )}
              initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-white/8 bg-[#2b2b2b] px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-md bg-[#0078d4]/25">
                    <Mail size={13} className="text-[#4fc3f7]" />
                  </div>
                  <span className="text-[12px] font-medium text-white/90">Mail — New message</span>
                </div>
                <div className="flex items-center gap-1 text-white/45">
                  <span className="rounded px-2 py-0.5 text-[11px]">—</span>
                  <span className="rounded px-2 py-0.5 text-[11px]">□</span>
                  <span className="rounded px-2 py-0.5 text-[11px]">✕</span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 border-b border-white/8 bg-[#252525] px-3 py-2">
                <div className="rounded-md bg-[#0078d4] px-3 py-1.5 text-[11px] font-semibold text-white">
                  Send
                </div>
                <div
                  className={cn(
                    'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] text-white/70',
                    mailHot && 'bg-[#2563eb]/25 text-[#93c5fd] ring-1 ring-[#2563eb]/40',
                  )}
                >
                  <Paperclip size={12} />
                  Attach
                </div>
                <div className="rounded-md px-2.5 py-1.5 text-[11px] text-white/45">Discard</div>
              </div>

              <div className="shrink-0 border-b border-white/8 px-4 py-1 text-[12px]">
                <div className="flex items-center gap-3 border-b border-white/6 py-2">
                  <span className="w-14 shrink-0 text-white/45">To</span>
                  <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-white/90">
                    team@company.com
                  </span>
                </div>
                <div className="flex items-center gap-3 border-b border-white/6 py-2">
                  <span className="w-14 shrink-0 text-white/45">Cc</span>
                  <span className="text-white/30">Add</span>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <span className="w-14 shrink-0 text-white/45">Subject</span>
                  <span className="text-white/90">Project brief</span>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden px-4 py-3 text-[12px] leading-relaxed text-white/70">
                <p>Hi team,</p>
                <p className="mt-3">
                  Sharing the latest project brief — please review when you get a chance.
                </p>
                <p className="mt-3 text-white/40">Thanks,</p>
                <p className="text-white/40">Sinan</p>
                <span className="mt-1 inline-block h-4 w-px bg-[#0078d4]" />
              </div>

              <div
                className={cn(
                  'shrink-0 border-t border-white/8 px-4 py-3 transition-colors',
                  mailHot ? 'bg-[rgba(37,99,235,0.12)]' : 'bg-[#1a1a1a]',
                )}
              >
                <div className="mb-2 flex items-center justify-between text-[11px] text-white/45">
                  <span className="inline-flex items-center gap-1.5">
                    <Paperclip size={12} />
                    Attachments
                  </span>
                  <span>{attached ? '1 file' : 'None'}</span>
                </div>
                {attached ? (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="flex items-center gap-3 rounded-[10px] bg-[#2b2b2b] px-3 py-2.5 ring-1 ring-[#2563eb]/35"
                  >
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#3f1d1d]">
                      <FileText size={18} className="text-[#f87171]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[12px] font-medium text-white/90">Brief.pdf</div>
                      <div className="mt-0.5 text-[10px] text-white/45">1.2 MB · PDF document</div>
                    </div>
                    <span className="text-[11px] text-white/35">✕</span>
                  </motion.div>
                ) : (
                  <div
                    className={cn(
                      'rounded-[10px] border border-dashed px-3 py-4 text-center text-[11px]',
                      mailHot
                        ? 'border-[#2563eb] text-[#93c5fd]'
                        : 'border-white/12 text-white/35',
                    )}
                  >
                    Drop files here to attach
                  </div>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Stash panel — bottom-right above tray */}
        <div className="absolute top-5 right-4 bottom-[56px] z-30 w-[400px]">
          <motion.div
            className="h-full origin-bottom-right"
            initial={false}
            animate={{
              opacity: panelShown && !panelClosing ? 1 : 0,
              y: panelShown && !panelClosing ? 0 : 28,
              scale: panelShown && !panelClosing ? 1 : 0.96,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <DemoPanel className={cn('shadow-2xl', dropActive && 'ring-[#2563eb]/55')}>
              <DemoAppHeader subtitle={`1 Shelves · ${shelfFiles.length} Files · 1.2 MB`} />

              <div className="flex items-center gap-2 px-4 pt-1 pb-2">
                <div className="flex h-9 items-center gap-2 rounded-full bg-[#2563eb] px-3.5 text-[13px] font-medium shadow-[0_6px_16px_rgba(37,99,235,0.35)]">
                  <Heart size={14} fill="currentColor" />
                  Work
                  <span className="text-white/85">{shelfFiles.length}</span>
                </div>
                <div className="flex size-9 items-center justify-center rounded-full bg-[#1a2233] text-[#9ca3af]">
                  <Plus size={16} />
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden px-4">
                <ul className="space-y-2">
                  {shelfFiles.map((file) => {
                    const lifting = draggingOut && file.id === 'brief'
                    return (
                      <motion.li
                        key={file.id}
                        initial={false}
                        animate={{ opacity: lifting ? 0.35 : 1, scale: lifting ? 0.98 : 1 }}
                        className={cn(
                          'flex h-[58px] items-center gap-3 rounded-[14px] bg-[#1a2233] px-3',
                          lifting && 'ring-1 ring-[#2563eb]/35',
                        )}
                      >
                        <FileGlyph kind={file.kind} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[13px] font-medium">{file.name}</div>
                          <div className="mt-1 text-[11px] text-[#9ca3af]">{file.size}</div>
                        </div>
                        <div className="flex items-center gap-1 text-[#9ca3af]">
                          <span className="mr-1 text-[11px] tabular-nums">{file.time}</span>
                          <Pin size={14} className="opacity-35" />
                          <Trash2 size={14} className="opacity-35" />
                        </div>
                      </motion.li>
                    )
                  })}
                </ul>
              </div>

              <div className="px-4 pt-2 pb-4">
                <div
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-[14px] border border-dashed py-3 text-[12px] font-medium',
                    dropActive
                      ? 'border-[#2563eb] bg-[rgba(37,99,235,0.16)] text-[#60a5fa]'
                      : 'border-white/12 text-[#9ca3af]',
                  )}
                >
                  <Upload size={15} />
                  {dropActive ? 'Release to stash' : 'Drop files here'}
                </div>
              </div>
            </DemoPanel>
          </motion.div>
        </div>

        <DemoTaskbar desktop active={phase === 'tray' || panelShown} />

        {!reduceMotion && phase === 'inboundDrag' ? (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute z-40 flex items-center gap-2 rounded-[12px] bg-[#1a2233] px-2.5 py-2 text-[12px] font-medium text-white shadow-xl ring-1 ring-[#2563eb]/50"
              initial={{ top: '12%', left: '7%', opacity: 1 }}
              animate={{ top: '82%', left: '72%', opacity: 1 }}
              transition={{ duration: 1.15, ease: 'easeInOut' }}
            >
              <FileText size={14} className="text-[#f87171]" />
              Brief.pdf
            </motion.div>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute z-50 size-3 rounded-full bg-white shadow ring-2 ring-black/25"
              initial={{ top: '14%', left: '12%' }}
              animate={{ top: '84%', left: '80%' }}
              transition={{ duration: 1.15, ease: 'easeInOut' }}
            />
          </>
        ) : null}

        {!reduceMotion && phase === 'outboundDrag' ? (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute z-40 flex items-center gap-2 rounded-[12px] bg-[#1a2233] px-2.5 py-2 text-[12px] font-medium text-white shadow-xl ring-1 ring-[#2563eb]/50"
              initial={{ top: '26%', left: '78%', opacity: 1 }}
              animate={{ top: '72%', left: '28%', opacity: 1 }}
              transition={{ duration: 1.15, ease: 'easeInOut' }}
            >
              <FileText size={14} className="text-[#f87171]" />
              Brief.pdf
            </motion.div>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute z-50 size-3 rounded-full bg-white shadow ring-2 ring-black/25"
              initial={{ top: '28%', left: '86%' }}
              animate={{ top: '74%', left: '36%' }}
              transition={{ duration: 1.15, ease: 'easeInOut' }}
            />
          </>
        ) : null}
      </DemoStage>
    </ScaleToFit>
  )
}

function FileGlyph({ kind }: { kind: ShelfFile['kind'] }) {
  if (kind === 'pdf') {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-[#3f1d1d]">
        <FileText size={18} className="text-[#f87171]" />
      </div>
    )
  }
  if (kind === 'png') {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-white/5 text-[#60a5fa]">
        <ImageIcon size={18} strokeWidth={1.5} />
      </div>
    )
  }
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-white/5 text-[#9ca3af]">
      <FileText size={18} strokeWidth={1.5} />
    </div>
  )
}
