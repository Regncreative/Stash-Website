'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
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
import Image from 'next/image'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/cn'

type DemoFile = {
  id: string
  name: string
  size: string
  kind: 'pdf' | 'png' | 'txt' | 'svg'
  pinned: boolean
}

const SEED: DemoFile[] = [
  { id: '1', name: 'Brief.pdf', size: '1.2 MB', kind: 'pdf', pinned: true },
  { id: '2', name: 'Shot.png', size: '640 KB', kind: 'png', pinned: false },
  { id: '3', name: 'Notes.txt', size: '2 KB', kind: 'txt', pinned: false },
  { id: '4', name: 'logo.svg', size: '18 KB', kind: 'svg', pinned: false },
  { id: '5', name: 'Agenda.docx', size: '84 KB', kind: 'txt', pinned: false },
]

const ACCENTS = ['#2563EB', '#0078D4', '#8764B8', '#038387', '#00B294', '#CA5010', '#E74856', '#C239B3']

export function FloatingDemo() {
  const reduceMotion = useReducedMotion()
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [hint, setHint] = useState(true)
  const [view, setView] = useState<'shelf' | 'settings'>('shelf')
  const [query, setQuery] = useState('')
  const [files, setFiles] = useState(SEED)
  const [dropOver, setDropOver] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  // Settings state — live
  const [accent, setAccent] = useState(ACCENTS[0])
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [notifications, setNotifications] = useState(true)

  const dark = theme === 'dark'

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = q ? files.filter((f) => f.name.toLowerCase().includes(q)) : files
    return [...list].sort((a, b) => Number(b.pinned) - Number(a.pinned))
  }, [files, query])

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 1600)
  }

  const togglePin = (id: string) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, pinned: !f.pinned } : f)))
  }

  const removeFile = (id: string) => {
    const target = files.find((f) => f.id === id)
    setFiles((prev) => prev.filter((f) => f.id !== id))
    if (target) showToast(`${t.floating.removed} ${target.name}`)
  }

  const addDemoFile = (name?: string) => {
    const fileName = name ?? `Drop-${files.length + 1}.pdf`
    const next: DemoFile = {
      id: `n-${Date.now()}`,
      name: fileName,
      size: name ? '—' : '320 KB',
      kind: fileName.endsWith('.png') || fileName.endsWith('.jpg') ? 'png' : 'pdf',
      pinned: false,
    }
    setFiles((prev) => [next, ...prev])
    showToast(`${t.floating.added} ${next.name}`)
  }

  const surface = dark ? 'bg-[#1a2233]' : 'bg-black/[0.05]'
  const surfaceHover = dark ? 'hover:bg-[#222b3d]' : 'hover:bg-black/[0.08]'
  const mutedText = dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[60] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Interactive Stash demo"
            className={cn(
              'pointer-events-auto flex h-[min(560px,calc(100vh-7rem))] w-[min(350px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[22px] shadow-[0_24px_60px_rgba(15,23,42,0.35)] ring-1',
              dark ? 'bg-[#111827] text-white ring-white/12' : 'bg-[#f3f4f6] text-[#111827] ring-black/10',
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between gap-2 px-4 pt-4 pb-2">
              <div className="flex min-w-0 items-center gap-2.5">
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-[11px]"
                  style={{ background: accent }}
                >
                  <StashMark />
                </div>
                <div className="min-w-0">
                  <p className="text-[17px] font-semibold leading-none">Stash</p>
                  <p className={cn('mt-1.5 text-[11px]', mutedText)}>
                    {view === 'settings'
                      ? t.floating.settingsSubtitle
                      : `${files.length} ${t.floating.subtitle}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  className={cn(
                    'rounded-lg p-1.5 transition-colors',
                    view === 'settings' ? 'text-white' : cn(mutedText, 'hover:text-current'),
                  )}
                  style={view === 'settings' ? { background: accent } : undefined}
                  aria-label="Settings"
                  aria-pressed={view === 'settings'}
                  onClick={() => setView((v) => (v === 'settings' ? 'shelf' : 'settings'))}
                >
                  <Settings size={16} strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  className={cn('rounded-lg p-1.5 transition-colors', mutedText, 'hover:text-current')}
                  aria-label="Close demo"
                  onClick={() => setOpen(false)}
                >
                  <X size={16} strokeWidth={1.75} />
                </button>
              </div>
            </div>

            {view === 'shelf' ? (
              <>
                {/* Search */}
                <div className="shrink-0 px-4 pb-2">
                  <label className="relative block">
                    <span className="sr-only">Search files</span>
                    <Search
                      size={14}
                      className={cn(
                        'pointer-events-none absolute top-1/2 left-3 -translate-y-1/2',
                        mutedText,
                      )}
                    />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={t.floating.searchPlaceholder}
                      className={cn(
                        'h-9 w-full rounded-[10px] border pr-8 pl-9 text-[13px] outline-none',
                        dark
                          ? 'border-white/10 bg-[#1a2233] text-white placeholder:text-[#9ca3af]'
                          : 'border-black/10 bg-white text-[#111827] placeholder:text-[#6b7280]',
                      )}
                      style={{ borderColor: query ? accent : undefined }}
                    />
                    {query ? (
                      <button
                        type="button"
                        className={cn(
                          'absolute top-1/2 right-2 -translate-y-1/2 rounded p-1',
                          mutedText,
                        )}
                        aria-label="Clear search"
                        onClick={() => setQuery('')}
                      >
                        <X size={13} />
                      </button>
                    ) : null}
                  </label>
                </div>

                {/* Shelf bar */}
                <div className="flex shrink-0 items-center gap-2 px-4 pb-2">
                  <div
                    className="flex h-8 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium text-white"
                    style={{ background: accent, boxShadow: `0 6px 16px ${accent}59` }}
                  >
                    <Heart size={12} fill="currentColor" />
                    Work
                    <span className="text-white/85">{filtered.length}</span>
                  </div>
                  <button
                    type="button"
                    className={cn(
                      'flex size-8 items-center justify-center rounded-full transition-colors',
                      surface,
                      surfaceHover,
                      mutedText,
                    )}
                    aria-label="Add sample file"
                    onClick={() => addDemoFile()}
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* File list — scrollbar hidden */}
                <ul className="min-h-0 flex-1 space-y-1.5 overflow-y-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {filtered.length === 0 ? (
                    <li
                      className={cn(
                        'rounded-[12px] px-3 py-8 text-center text-[12px]',
                        surface,
                        mutedText,
                      )}
                    >
                      {t.floating.noMatch}
                    </li>
                  ) : (
                    filtered.map((file) => (
                      <li
                        key={file.id}
                        className={cn(
                          'flex h-12 items-center gap-2.5 rounded-[12px] px-2.5 transition-colors',
                          surface,
                          surfaceHover,
                        )}
                      >
                        <Glyph kind={file.kind} dark={dark} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[12px] font-medium">{file.name}</div>
                          <div className={cn('text-[10px]', mutedText)}>{file.size}</div>
                        </div>
                        <button
                          type="button"
                          className={cn(
                            'rounded-md p-1.5 transition-colors',
                            file.pinned ? '' : cn(mutedText, 'opacity-50 hover:opacity-100'),
                          )}
                          style={file.pinned ? { color: accent } : undefined}
                          aria-label={file.pinned ? `Unpin ${file.name}` : `Pin ${file.name}`}
                          onClick={() => togglePin(file.id)}
                        >
                          <Pin size={14} fill={file.pinned ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          type="button"
                          className={cn(
                            'rounded-md p-1.5 opacity-50 transition-colors hover:text-rose-400 hover:opacity-100',
                            mutedText,
                          )}
                          aria-label={`Remove ${file.name}`}
                          onClick={() => removeFile(file.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </li>
                    ))
                  )}
                </ul>

                {/* Drop zone */}
                <div className="shrink-0 px-4 pt-1 pb-4">
                  <button
                    type="button"
                    className={cn(
                      'flex w-full items-center justify-center gap-2 rounded-[12px] border border-dashed py-3 text-[12px] font-medium transition-colors',
                      dropOver
                        ? 'text-white'
                        : cn(dark ? 'border-white/12' : 'border-black/15', mutedText),
                    )}
                    style={
                      dropOver
                        ? { borderColor: accent, background: `${accent}29`, color: accent }
                        : undefined
                    }
                    onClick={() => addDemoFile()}
                    onDragEnter={(e) => {
                      e.preventDefault()
                      setDropOver(true)
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={() => setDropOver(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      setDropOver(false)
                      addDemoFile(e.dataTransfer.files?.[0]?.name)
                    }}
                  >
                    <Upload size={14} />
                    {dropOver ? t.floating.dropActive : t.floating.dropIdle}
                  </button>

                  <AnimatePresence>
                    {toast ? (
                      <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-2 text-center text-[11px]"
                        style={{ color: accent }}
                      >
                        {toast}
                      </motion.p>
                    ) : (
                      <p className={cn('mt-2 text-center text-[10px]', mutedText)}>
                        {t.floating.note}
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              /* Settings view */
              <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button
                  type="button"
                  className={cn('flex items-center gap-1.5 text-[12px]', mutedText, 'hover:text-current')}
                  onClick={() => setView('shelf')}
                >
                  <ArrowLeft size={14} />
                  {t.floating.backToShelf}
                </button>

                <div className={cn('rounded-[14px] px-3 py-3 ring-1', surface, dark ? 'ring-white/8' : 'ring-black/8')}>
                  <p className={cn('mb-2.5 text-[10px] font-semibold tracking-[0.06em] uppercase', mutedText)}>
                    {t.floating.appearance}
                  </p>

                  <p className="mb-1.5 text-[11px] font-medium">{t.floating.theme}</p>
                  <div className="mb-3 grid grid-cols-2 gap-1.5">
                    {(['light', 'dark'] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        className={cn(
                          'rounded-[9px] py-2 text-[11px] font-medium transition-colors',
                          theme === mode ? 'text-white' : cn(surface, mutedText),
                        )}
                        style={theme === mode ? { background: accent } : undefined}
                        aria-pressed={theme === mode}
                        onClick={() => setTheme(mode)}
                      >
                        {mode === 'light' ? t.floating.light : t.floating.dark}
                      </button>
                    ))}
                  </div>

                  <p className="mb-1.5 text-[11px] font-medium">{t.floating.accent}</p>
                  <div className="flex flex-wrap gap-2">
                    {ACCENTS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        aria-label={`Accent ${color}`}
                        aria-pressed={accent === color}
                        className="size-7 rounded-full transition-transform hover:scale-110"
                        style={{
                          background: color,
                          outline: accent === color ? `2px solid ${dark ? '#fff' : '#111827'}` : undefined,
                          outlineOffset: 2,
                        }}
                        onClick={() => setAccent(color)}
                      />
                    ))}
                  </div>
                </div>

                <div className={cn('rounded-[14px] px-3 py-3 ring-1', surface, dark ? 'ring-white/8' : 'ring-black/8')}>
                  <p className={cn('mb-2.5 text-[10px] font-semibold tracking-[0.06em] uppercase', mutedText)}>
                    {t.floating.behavior}
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[12px]">{t.floating.notifications}</p>
                      <p className={cn('mt-0.5 text-[10px]', mutedText)}>
                        {t.floating.notificationsDesc}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={notifications}
                      aria-label="Notifications"
                      className={cn(
                        'relative h-6 w-11 shrink-0 rounded-full transition-colors',
                        !notifications && (dark ? 'bg-white/20' : 'bg-black/20'),
                      )}
                      style={notifications ? { background: accent } : undefined}
                      onClick={() => setNotifications((v) => !v)}
                    >
                      <motion.span
                        className="absolute top-[3px] size-[18px] rounded-full bg-white shadow"
                        animate={{ left: notifications ? 23 : 3 }}
                        transition={{ duration: 0.18 }}
                      />
                    </button>
                  </div>

                  <div className={cn('mt-3 rounded-[10px] px-3 py-2.5 text-[11px]', dark ? 'bg-[#111827]' : 'bg-white', mutedText)}>
                    {t.floating.hotkeyLabel} · <span className={dark ? 'text-white' : 'text-[#111827]'}>Ctrl + Shift + Space</span>
                  </div>
                </div>

                <p className={cn('pt-1 text-center text-[10px]', mutedText)}>
                  {t.floating.settingsNote}
                </p>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {!open && hint ? (
          <motion.div
            key="hint"
            className="pointer-events-none max-w-[210px] rounded-2xl bg-white px-3 py-2 text-[12px] font-medium text-[var(--foreground)] shadow-lg ring-1 ring-black/6"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
          >
            {t.floating.hint}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        className="pointer-events-auto flex size-14 items-center justify-center rounded-full text-white ring-4 ring-white/80 transition-[filter,transform] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{ background: accent, boxShadow: `0 12px 32px ${accent}73` }}
        aria-expanded={open}
        aria-label={open ? 'Close Stash demo' : 'Open Stash demo'}
        onClick={() => {
          setHint(false)
          setOpen((v) => !v)
        }}
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      >
        {open ? (
          <X size={22} strokeWidth={2} />
        ) : (
          <Image src="/brand/logo.png" alt="" width={28} height={28} className="rounded-lg" />
        )}
      </motion.button>
    </div>
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

function Glyph({ kind, dark }: { kind: DemoFile['kind']; dark: boolean }) {
  if (kind === 'pdf') {
    return (
      <div className="flex size-8 items-center justify-center rounded-[9px] bg-[#3f1d1d]">
        <FileText size={14} className="text-[#f87171]" />
      </div>
    )
  }
  if (kind === 'png' || kind === 'svg') {
    return (
      <div
        className={cn(
          'flex size-8 items-center justify-center rounded-[9px] text-[#60a5fa]',
          dark ? 'bg-white/5' : 'bg-black/5',
        )}
      >
        <ImageIcon size={14} />
      </div>
    )
  }
  return (
    <div
      className={cn(
        'flex size-8 items-center justify-center rounded-[9px]',
        dark ? 'bg-white/5 text-[#9ca3af]' : 'bg-black/5 text-[#6b7280]',
      )}
    >
      <FileText size={14} />
    </div>
  )
}
