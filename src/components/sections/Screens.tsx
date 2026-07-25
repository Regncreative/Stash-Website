'use client'

import { motion, useReducedMotion } from 'framer-motion'
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

export function Screens() {
  const reduceMotion = useReducedMotion()

  return (
    <Section
      id="screens"
      eyebrow="Interface"
      title="The real Stash panel — light and dark"
      description="Fluent surfaces, shelf pills, and file cards that match the installed app."
    >
      <div className="relative mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-2">
        <div
          aria-hidden
          className="absolute inset-x-10 top-1/3 -z-10 h-40 rounded-full bg-[var(--accent)]/10 blur-3xl"
        />

        <MockPanel
          theme="dark"
          reduceMotion={!!reduceMotion}
          delay={0}
          className="lg:translate-y-4"
        />
        <MockPanel
          theme="light"
          reduceMotion={!!reduceMotion}
          delay={0.1}
          className="lg:-translate-y-2"
        />
      </div>
    </Section>
  )
}

function MockPanel({
  theme,
  reduceMotion,
  delay,
  className,
}: {
  theme: 'dark' | 'light'
  reduceMotion: boolean
  delay: number
  className?: string
}) {
  const dark = theme === 'dark'

  return (
    <motion.div
      className={cn('transform-gpu', className)}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
    >
      <div
        className={cn(
          'overflow-hidden rounded-[22px] shadow-[var(--shadow-lg)] ring-1',
          dark
            ? 'bg-[#111827] text-white ring-white/10'
            : 'bg-[#f3f4f6] text-[#111827] ring-black/8',
        )}
      >
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="flex size-9 items-center justify-center rounded-[11px]"
                style={{ background: 'linear-gradient(145deg, #3b82f6 0%, #2563eb 100%)' }}
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <rect x="2.5" y="3" width="11" height="2.2" rx="0.7" fill="white" />
                  <rect x="2.5" y="6.9" width="11" height="2.2" rx="0.7" fill="white" opacity="0.8" />
                  <rect x="2.5" y="10.8" width="8" height="2.2" rx="0.7" fill="white" opacity="0.55" />
                </svg>
              </div>
              <div>
                <p className="text-[22px] font-semibold leading-none tracking-[-0.02em]">Stash</p>
                <p
                  className={cn(
                    'mt-1.5 text-[13px] leading-none',
                    dark ? 'text-[#9ca3af]' : 'text-[#6b7280]',
                  )}
                >
                  1 Shelves · 6 Files · 384 MB
                </p>
              </div>
            </div>
            <div className={cn('flex gap-0.5', dark ? 'text-[#9ca3af]' : 'text-[#6b7280]')}>
              <span className="p-2">
                <Search size={18} strokeWidth={1.75} />
              </span>
              <span className="p-2">
                <Settings size={18} strokeWidth={1.75} />
              </span>
              <span className="p-2">
                <X size={18} strokeWidth={1.75} />
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-5 pb-3">
          <div className="flex h-10 items-center gap-2 rounded-full bg-[#2563eb] px-4 text-[13px] font-medium text-white shadow-[0_6px_18px_rgba(37,99,235,0.35)]">
            <Heart size={16} fill="currentColor" strokeWidth={1.75} />
            Personal
            <span className="text-white/85">6</span>
          </div>
          <div
            className={cn(
              'flex size-10 items-center justify-center rounded-full',
              dark ? 'bg-[#1a2233] text-[#9ca3af]' : 'bg-[#e5e7eb] text-[#6b7280]',
            )}
          >
            <Plus size={18} strokeWidth={1.75} />
          </div>
        </div>

        <div className="space-y-2 px-5 pb-2">
          {[
            { name: 'Design.psd', size: '384 MB', time: '18:57', icon: 'psd' as const },
            { name: 'images.png', size: '6.0 KB', time: '18:57', icon: 'png' as const },
            { name: 'amazon.svg', size: '3.1 KB', time: '18:57', icon: 'edge' as const },
          ].map((file) => (
            <div
              key={file.name}
              className={cn(
                'flex h-[72px] items-center gap-3.5 rounded-[14px] px-3.5',
                dark ? 'bg-[#1a2233]' : 'bg-white',
              )}
            >
              <Glyph kind={file.icon} dark={dark} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-medium">{file.name}</div>
                <div
                  className={cn(
                    'mt-1.5 text-[13px] leading-none',
                    dark ? 'text-[#9ca3af]' : 'text-[#6b7280]',
                  )}
                >
                  {file.size}
                </div>
              </div>
              <div
                className={cn(
                  'flex items-center gap-1.5',
                  dark ? 'text-[#9ca3af]' : 'text-[#6b7280]',
                )}
              >
                <span className="mr-1.5 text-[13px] tabular-nums">{file.time}</span>
                <Pin size={16} strokeWidth={1.75} className="opacity-40" />
                <Trash2 size={16} strokeWidth={1.75} className="opacity-40" />
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 pt-2 pb-5">
          <div
            className={cn(
              'flex items-center justify-center gap-2.5 rounded-[14px] border border-dashed px-4 py-3.5 text-[13px] font-medium',
              dark
                ? 'border-white/12 bg-white/[0.02] text-[#9ca3af]'
                : 'border-black/14 bg-black/[0.02] text-[#6b7280]',
            )}
          >
            <Upload size={18} strokeWidth={1.75} />
            Drop files here
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Glyph({ kind, dark }: { kind: 'psd' | 'png' | 'edge'; dark: boolean }) {
  if (kind === 'psd') {
    return (
      <div className="flex size-11 items-center justify-center rounded-[12px] bg-[#1e3a5f]">
        <span className="rounded bg-[#31a8ff] px-1 py-0.5 text-[9px] font-bold text-white">Ps</span>
      </div>
    )
  }
  if (kind === 'edge') {
    return (
      <div
        className={cn(
          'flex size-11 items-center justify-center rounded-[12px]',
          dark ? 'bg-white/5' : 'bg-black/5',
        )}
      >
        <div
          className="size-7 rounded-full"
          style={{
            background: 'conic-gradient(from 210deg, #0c64d0, #36c5f0, #1ea760, #f7b928, #0c64d0)',
          }}
        />
      </div>
    )
  }
  return (
    <div
      className={cn(
        'flex size-11 items-center justify-center rounded-[12px] text-[#60a5fa]',
        dark ? 'bg-white/5' : 'bg-black/5',
      )}
    >
      {kind === 'png' ? (
        <ImageIcon size={22} strokeWidth={1.5} />
      ) : (
        <FileText size={22} strokeWidth={1.5} />
      )}
    </div>
  )
}
