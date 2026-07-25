'use client'

import { Search, Settings, Wifi, Volume2, X } from 'lucide-react'
import { cn } from '@/lib/cn'

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function StashMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2.5" y="3" width="11" height="2.2" rx="0.7" fill="white" />
      <rect x="2.5" y="6.9" width="11" height="2.2" rx="0.7" fill="white" opacity="0.8" />
      <rect x="2.5" y="10.8" width="8" height="2.2" rx="0.7" fill="white" opacity="0.55" />
    </svg>
  )
}

export function DemoStage({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode
  variant?: 'default' | 'wide'
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#1a2332_0%,#111827_55%,#0b1220_100%)]',
        variant === 'wide' ? 'h-[620px] sm:h-[680px]' : 'h-[560px]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function DemoPanel({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-[20px] bg-[#111827] text-white shadow-[0_20px_50px_rgba(0,0,0,0.45)] ring-1 ring-white/10',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}

export function DemoAppHeader({
  subtitle = '1 Shelves · 6 Files · 384 MB',
  searchActive,
  settingsActive,
  accentColor = '#2563eb',
}: {
  subtitle?: string
  searchActive?: boolean
  settingsActive?: boolean
  accentColor?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-2">
      <div className="flex min-w-0 items-center gap-2.5">
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-[10px]"
          style={{
            background: `linear-gradient(145deg, ${accentColor} 0%, ${accentColor} 100%)`,
          }}
          aria-hidden
        >
          <StashMark size={15} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[18px] font-semibold leading-none tracking-[-0.02em]">Stash</p>
          <p className="mt-1 truncate text-[11px] leading-none text-[#9ca3af]">{subtitle}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-0.5 text-[#9ca3af]">
        <span className={cn('rounded-lg p-1.5', searchActive && 'bg-white/10 text-white')}>
          <Search size={16} strokeWidth={1.75} />
        </span>
        <span
          className={cn('rounded-lg p-1.5', settingsActive && 'text-white')}
          style={
            settingsActive
              ? {
                  background: accentColor,
                  boxShadow: `0 0 0 2px ${accentColor}59`,
                }
              : undefined
          }
        >
          <Settings size={16} strokeWidth={1.75} />
        </span>
        <span className="rounded-lg p-1.5">
          <X size={16} strokeWidth={1.75} />
        </span>
      </div>
    </div>
  )
}

export function DemoTaskbar({
  active,
  accentColor = '#2563eb',
  desktop,
}: {
  active?: boolean
  accentColor?: string
  desktop?: boolean
}) {
  if (desktop) {
    return (
      <div className="absolute inset-x-0 bottom-0 z-40 flex h-[48px] items-center justify-between border-t border-white/8 bg-[#101820]/95 px-3 text-white backdrop-blur-md sm:px-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-white/5">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              <rect x="1" y="1" width="6.2" height="6.2" fill="#60a5fa" />
              <rect x="8.8" y="1" width="6.2" height="6.2" fill="#60a5fa" />
              <rect x="1" y="8.8" width="6.2" height="6.2" fill="#60a5fa" />
              <rect x="8.8" y="8.8" width="6.2" height="6.2" fill="#60a5fa" />
            </svg>
          </div>
          <div className="hidden h-8 w-40 items-center rounded-full bg-white/8 px-3 text-[11px] text-white/45 sm:flex">
            Search
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5">
          <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-white/75">
            <Wifi size={15} strokeWidth={1.75} />
            <Volume2 size={15} strokeWidth={1.75} />
          </div>
          <div className="rounded-lg px-2.5 py-1 text-right leading-tight">
            <div className="text-[11px] font-medium tabular-nums text-white/90">12:24</div>
            <div className="text-[10px] tabular-nums text-white/55">25.07.2026</div>
          </div>
          <div
            className={cn(
              'ml-0.5 flex size-8 items-center justify-center rounded-[9px] transition-colors',
              !active && 'bg-white/8',
            )}
            style={
              active
                ? {
                    background: accentColor,
                    boxShadow: `0 0 0 2px ${accentColor}55`,
                  }
                : undefined
            }
          >
            <StashMark size={14} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl bg-[#0b1220]/95 px-3 py-2 text-white ring-1 ring-white/10">
      <span className="text-[11px] text-white/55">12:24</span>
      <div className="flex items-center gap-1.5">
        <div
          className={cn('flex size-7 items-center justify-center rounded-[8px]', !active && 'bg-white/10')}
          style={active ? { background: accentColor } : undefined}
        >
          <StashMark size={14} />
        </div>
        <span className="text-[11px] text-white/75">Stash</span>
      </div>
    </div>
  )
}

export const ACCENTS = [
  '#2563EB',
  '#0078D4',
  '#8764B8',
  '#038387',
  '#00B294',
  '#CA5010',
  '#E74856',
  '#C239B3',
]
