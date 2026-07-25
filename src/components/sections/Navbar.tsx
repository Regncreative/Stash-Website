'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/cn'

const links = [
  { href: '#demo', label: 'Demo' },
  { href: '#features', label: 'Features' },
  { href: '#why', label: 'Why Stash' },
  { href: '#download', label: 'Download' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'border-[var(--border)] bg-white/70 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
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
          <Button
            href={SITE.github}
            external
            variant="ghost"
            className="hidden sm:inline-flex"
            aria-label="View Stash on GitHub"
          >
            <GitHubIcon />
            GitHub
          </Button>
          <Button href="#download" size="md">
            <Download className="size-4" aria-hidden />
            Download
          </Button>
        </div>
      </Container>
    </header>
  )
}
