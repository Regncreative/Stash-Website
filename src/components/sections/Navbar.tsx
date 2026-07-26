'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { FlagEn, FlagTr } from '@/components/demo/flags'
import { ProductHuntBanner } from '@/components/sections/ProductHuntBanner'
import { InstallInfoButton, InstallModal } from '@/components/sections/InstallModal'
import { SITE } from '@/lib/constants'
import { useLang, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/cn'

type NavbarProps = {
  downloadUrl: string
}

export function Navbar({ downloadUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [installOpen, setInstallOpen] = useState(false)
  const { lang, setLang, t } = useLang()

  const links = [
    { href: '#demo', label: t.nav.demo },
    { href: '#features', label: t.nav.features },
    { href: '#why', label: t.nav.why },
    { href: '#download', label: t.nav.download },
    { href: '#faq', label: t.nav.faq },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="sticky top-0 z-50">
      <ProductHuntBanner />
      <header
        className={cn(
          'border-b transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled
            ? 'border-[var(--border)] bg-white/70 backdrop-blur-xl'
            : 'border-transparent bg-white/40 backdrop-blur-md',
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Stash home">
            <Image src="/brand/logo.png" alt="" width={28} height={28} className="rounded-lg" />
            <span className="text-[15px] font-semibold tracking-tight text-[var(--foreground)]">
              Stash
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-black/[0.04] hover:text-[var(--foreground)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-0.5 rounded-full bg-black/[0.04] p-1 ring-1 ring-black/[0.06]"
              role="group"
              aria-label="Language"
            >
              {(
                [
                  { code: 'en', label: 'English', Flag: FlagEn },
                  { code: 'tr', label: 'Türkçe', Flag: FlagTr },
                ] as Array<{ code: Lang; label: string; Flag: typeof FlagEn }>
              ).map(({ code, label, Flag }) => (
                <button
                  key={code}
                  type="button"
                  aria-label={label}
                  aria-pressed={lang === code}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[11px] font-semibold uppercase transition-all',
                    lang === code
                      ? 'bg-white text-[var(--foreground)] shadow-sm ring-1 ring-black/[0.06]'
                      : 'text-[var(--muted)] opacity-60 hover:opacity-100',
                  )}
                  onClick={() => setLang(code)}
                >
                  <Flag className="rounded-[3px]" />
                  <span className="hidden lg:inline">{code}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <InstallInfoButton onClick={() => setInstallOpen(true)} />
              <Button
                href={SITE.github}
                external
                variant="ghost"
                className="hidden h-9 px-2.5 sm:inline-flex"
                aria-label="View Stash on GitHub"
              >
                <GitHubIcon />
                GitHub
              </Button>
            </div>

            <Button href={downloadUrl} external size="md" aria-label="Download latest Stash release">
              <Download className="size-4" aria-hidden />
              {t.nav.downloadBtn}
            </Button>
          </div>
        </Container>
      </header>

      <InstallModal
        open={installOpen}
        onClose={() => setInstallOpen(false)}
        downloadUrl={downloadUrl}
      />
    </div>
  )
}
