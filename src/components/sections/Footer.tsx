import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { SITE } from '@/lib/constants'

const links = [
  { href: SITE.github, label: 'GitHub' },
  { href: SITE.releases, label: 'Releases' },
  { href: SITE.license, label: 'License' },
]

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <Image src="/brand/logo.png" alt="" width={24} height={24} className="rounded-md" />
          <div>
            <p className="text-sm font-semibold text-[var(--foreground)]">Stash</p>
            <p className="text-xs text-[var(--muted)]">{SITE.author}</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-4" aria-label="Footer">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  )
}
