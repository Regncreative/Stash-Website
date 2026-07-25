'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { SITE } from '@/lib/constants'

type HeroProps = {
  version: string
  downloadUrl: string
}

export function Hero({ version, downloadUrl }: HeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% -10%, rgba(37,99,235,0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 85% 20%, rgba(14,165,233,0.10), transparent 50%), linear-gradient(180deg, #f5f7fb 0%, #eef2f8 45%, #f8fafc 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 -z-10 mx-auto h-[420px] max-w-4xl rounded-[40%] bg-white/40 blur-3xl"
      />

      <Container className="flex flex-col items-center text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <Image
            src="/brand/logo.png"
            alt="Stash"
            width={88}
            height={88}
            priority
            className="mb-6 rounded-[22px] shadow-[0_18px_40px_rgba(37,99,235,0.22)]"
          />
          <h1 className="text-5xl font-semibold tracking-tight text-[var(--foreground)] sm:text-6xl md:text-7xl">
            Stash
          </h1>
          <p className="mt-4 max-w-xl text-balance text-lg text-[var(--muted)] sm:text-xl">
            {SITE.tagline}. Park files in the tray, drag them back when you need them — references
            only, no clutter.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <Badge tone="accent">v{version}</Badge>
            <Badge>Windows 11</Badge>
            <Badge>x64</Badge>
            <Badge tone="success">MIT</Badge>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={downloadUrl} external size="lg">
              <Download className="size-4" aria-hidden />
              Download for Windows
            </Button>
            <Button href={SITE.github} external variant="secondary" size="lg">
              <GitHubIcon />
              View on GitHub
            </Button>
          </div>

          <p className="mt-5 text-sm text-[var(--muted)]">
            Open anytime with{' '}
            <kbd className="rounded-md bg-black/[0.05] px-1.5 py-0.5 font-medium text-[var(--foreground)] ring-1 ring-black/[0.06]">
              {SITE.shortcut}
            </kbd>
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
