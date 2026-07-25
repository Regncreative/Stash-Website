import { cn } from '@/lib/cn'

type GlassPanelProps = {
  children: React.ReactNode
  className?: string
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/40 bg-white/55 shadow-[var(--shadow-md)] backdrop-blur-2xl',
        'dark:border-white/10 dark:bg-white/5',
        className,
      )}
    >
      {children}
    </div>
  )
}
