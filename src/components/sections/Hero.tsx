'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { SITE } from '@/lib/constants'
import { useLang } from '@/lib/i18n'

type HeroProps = {
  version: string
  downloadUrl: string
}

export function Hero({ version, downloadUrl }: HeroProps) {
  const reduceMotion = useReducedMotion()
  const { t } = useLang()

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
            {t.hero.tagline}
          </p>

          <div className="mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-2">
            <a
              href={`${SITE.github}/actions/workflows/ci.yml`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${SITE.github}/actions/workflows/ci.yml/badge.svg`}
                alt="CI"
                height={20}
                className="h-5"
              />
            </a>
            <a
              href={`${SITE.github}/actions/workflows/codeql.yml`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${SITE.github}/actions/workflows/codeql.yml/badge.svg`}
                alt="CodeQL"
                height={20}
                className="h-5"
              />
            </a>
            <a
              href={SITE.latestRelease}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.shields.io/github/v/release/${SITE.repo}?label=latest%20release`}
                alt={`Latest release v${version}`}
                height={20}
                className="h-5"
              />
            </a>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://img.shields.io/badge/platform-Windows-0078D4?logo=windows&logoColor=white"
              alt="Windows"
              height={20}
              className="h-5"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://img.shields.io/badge/Electron-34-47848F?logo=electron&logoColor=white"
              alt="Electron 34"
              height={20}
              className="h-5"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white"
              alt="TypeScript 5"
              height={20}
              className="h-5"
            />
            <a
              href={SITE.license}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://img.shields.io/badge/license-MIT-green"
                alt="MIT license"
                height={20}
                className="h-5"
              />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={downloadUrl} external size="lg">
              <Download className="size-4" aria-hidden />
              {t.hero.downloadBtn}
            </Button>
            <Button href={SITE.github} external variant="secondary" size="lg">
              <GitHubIcon />
              {t.hero.githubBtn}
            </Button>
          </div>

          <p className="mt-5 text-sm text-[var(--muted)]">
            {t.hero.shortcutPrefix}{' '}
            <kbd className="rounded-md bg-black/[0.05] px-1.5 py-0.5 font-medium text-[var(--foreground)] ring-1 ring-black/[0.06]">
              {SITE.shortcut}
            </kbd>
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
