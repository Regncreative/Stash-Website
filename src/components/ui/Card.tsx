import { cn } from '@/lib/cn'

type CardProps = {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-[var(--surface)] ring-1 ring-[var(--border)] shadow-[var(--shadow-sm)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
