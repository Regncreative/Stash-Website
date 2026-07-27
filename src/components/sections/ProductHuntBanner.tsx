'use client'

import { SITE } from '@/lib/constants'
import { useLang } from '@/lib/i18n'

function ProductHuntMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" width="16" height="16" aria-hidden>
      <circle cx="20" cy="20" r="20" fill="#DA552F" />
      <path
        fill="#fff"
        d="M22.7 17.5h-4.2v5h4.2c1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5zm0-5H13.5v15h5v-5h4.2c4.1 0 7.5-3.4 7.5-7.5S26.8 12.5 22.7 12.5z"
      />
    </svg>
  )
}

/** Slim announcement strip for Product Hunt — sits above the navbar. */
export function ProductHuntBanner() {
  const { t } = useLang()

  return (
    <a
      href={SITE.productHunt}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-9 items-center justify-center gap-2.5 bg-[#171717] px-3 text-[12px] text-white/85 transition-colors hover:bg-[#1f1f1f] sm:gap-3 sm:text-[13px]"
    >
      <span className="inline-flex shrink-0 items-center rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] font-bold tracking-[0.04em] text-white uppercase">
        {t.productHunt.live}
      </span>
      <span className="min-w-0 truncate text-center">
        <span className="font-medium text-white">{t.productHunt.title}</span>
        <span className="hidden text-white/55 sm:inline"> — {t.productHunt.subtitle}</span>
      </span>
      <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white ring-1 ring-white/10 transition-colors group-hover:bg-white/14 sm:inline-flex">
        <ProductHuntMark />
        Product Hunt
      </span>
    </a>
  )
}
