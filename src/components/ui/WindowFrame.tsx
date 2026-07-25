import { cn } from '@/lib/cn'

type WindowFrameProps = {
  children: React.ReactNode
  className?: string
  title?: string
  dark?: boolean
}

export function WindowFrame({ children, className, title = 'Stash', dark }: WindowFrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl shadow-[var(--shadow-lg)] ring-1',
        dark
          ? 'bg-[#111827] text-white ring-white/10'
          : 'bg-[var(--surface)] text-[var(--foreground)] ring-[var(--border)]',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2 border-b px-4 py-3',
          dark ? 'border-white/8 bg-white/[0.03]' : 'border-[var(--border)] bg-black/[0.02]',
        )}
      >
        <span className="size-2.5 rounded-full bg-[#FF5F57]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#28C840]" aria-hidden />
        <span className={cn('ml-3 text-xs font-medium', dark ? 'text-white/55' : 'text-[var(--muted)]')}>
          {title}
        </span>
      </div>
      <div>{children}</div>
    </div>
  )
}
