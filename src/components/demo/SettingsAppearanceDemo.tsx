'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { FlagEn, FlagTr } from '@/components/demo/flags'
import {
  ACCENTS,
  DemoAppHeader,
  DemoPanel,
  DemoStage,
  DemoTaskbar,
  wait,
} from '@/components/demo/shared'
import { cn } from '@/lib/cn'

type Phase =
  | 'show'
  | 'language'
  | 'theme'
  | 'accent'
  | 'toggleStart'
  | 'toggleNotify'
  | 'slider'
  | 'hold'

type Lang = 'tr' | 'en'

const COPY = {
  en: {
    settings: 'Settings',
    subtitle: 'Appearance and behavior',
    appearance: 'Appearance',
    language: 'Language',
    theme: 'Theme',
    accent: 'Accent color',
    behavior: 'Behavior',
    start: 'Start with Windows',
    startHint: 'Launch Stash in the background at sign-in',
    notifications: 'Notifications',
    notifyHint: 'Alerts for added files and updates',
    idleOpacity: 'Idle opacity',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    shelves: 'Shelves',
    files: 'Files',
  },
  tr: {
    settings: 'Ayarlar',
    subtitle: 'Görünüm ve davranış',
    appearance: 'Görünüm',
    language: 'Dil',
    theme: 'Tema',
    accent: 'Vurgu rengi',
    behavior: 'Davranış',
    start: 'Windows ile başlat',
    startHint: 'Oturum açıldığında Stash arka planda açılsın',
    notifications: 'Bildirimler',
    notifyHint: 'Eklenen dosyalar ve güncellemeler için uyarı',
    idleOpacity: 'Boşta opaklık',
    system: 'Sistem',
    light: 'Açık',
    dark: 'Koyu',
    shelves: 'Raf',
    files: 'Dosya',
  },
} as const

const SEQUENCE: Array<{ phase: Phase; ms: number }> = [
  { phase: 'show', ms: 550 },
  { phase: 'language', ms: 1100 },
  { phase: 'theme', ms: 1100 },
  { phase: 'accent', ms: 1400 },
  { phase: 'toggleStart', ms: 700 },
  { phase: 'toggleNotify', ms: 700 },
  { phase: 'slider', ms: 1400 },
  { phase: 'hold', ms: 700 },
]

export function SettingsAppearanceDemo() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('show')
  const [lang, setLang] = useState<Lang>('en')
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('dark')
  const [accentIndex, setAccentIndex] = useState(0)
  const [startWin, setStartWin] = useState(true)
  const [notify, setNotify] = useState(false)
  const [opacity, setOpacity] = useState(100)

  const t = COPY[lang]
  const accent = ACCENTS[accentIndex] ?? ACCENTS[0]

  const headerSubtitle = useMemo(
    () => `1 ${t.shelves} · 6 ${t.files} · 384 MB`,
    [t.files, t.shelves],
  )

  useEffect(() => {
    if (reduceMotion) return
    let cancelled = false

    const run = async () => {
      while (!cancelled) {
        setLang('en')
        setTheme('dark')
        setAccentIndex(0)
        setStartWin(true)
        setNotify(false)
        setOpacity(100)

        for (const step of SEQUENCE) {
          if (cancelled) return
          setPhase(step.phase)

          if (step.phase === 'language') {
            await wait(400)
            if (cancelled) return
            setLang('tr')
            await wait(500)
            if (cancelled) return
            setLang('en')
          }

          if (step.phase === 'theme') {
            for (const mode of ['system', 'light', 'dark'] as const) {
              if (cancelled) return
              setTheme(mode)
              await wait(280)
            }
          }

          if (step.phase === 'accent') {
            for (let i = 0; i < ACCENTS.length; i += 1) {
              if (cancelled) return
              setAccentIndex(i)
              await wait(140)
            }
            setAccentIndex(0)
          }

          if (step.phase === 'toggleStart') {
            setStartWin(false)
            await wait(280)
            setStartWin(true)
          }

          if (step.phase === 'toggleNotify') {
            setNotify(true)
            await wait(280)
            setNotify(false)
          }

          if (step.phase === 'slider') {
            for (const v of [100, 70, 45, 30, 55, 100]) {
              if (cancelled) return
              setOpacity(v)
              await wait(200)
            }
          }

          await wait(step.ms)
        }
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [reduceMotion])

  const panelOpacity = Math.max(opacity, 18) / 100

  return (
    <DemoStage>
      <div className="absolute inset-x-3 top-3 bottom-[56px]">
        <motion.div
          className="h-full"
          initial={false}
          animate={{ opacity: panelOpacity }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <DemoPanel>
            <DemoAppHeader
              settingsActive
              accentColor={accent}
              subtitle={headerSubtitle}
            />
            <div className="flex items-center gap-2 px-4 pb-2">
              <span className="rounded-lg p-1.5 text-[#9ca3af]">
                <ArrowLeft size={16} strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[14px] font-semibold leading-tight">{t.settings}</p>
                <p className="text-[10px] text-[#9ca3af]">{t.subtitle}</p>
              </div>
            </div>

            <div className="min-h-0 flex-1 space-y-2.5 overflow-hidden px-3.5 pb-3">
              <div className="rounded-[14px] border border-white/8 bg-[#1a2233] px-3 py-3">
                <p className="mb-2.5 text-[10px] font-semibold tracking-[0.06em] text-[#9ca3af] uppercase">
                  {t.appearance}
                </p>

                <Field label={t.language}>
                  <div className="grid grid-cols-2 gap-1.5">
                    <Seg
                      active={lang === 'tr'}
                      highlight={phase === 'language' && lang === 'tr'}
                      accent={accent}
                    >
                      <FlagTr className="shrink-0 rounded-[2px] shadow-sm" />
                      Türkçe
                    </Seg>
                    <Seg
                      active={lang === 'en'}
                      highlight={phase === 'language' && lang === 'en'}
                      accent={accent}
                    >
                      <FlagEn className="shrink-0 rounded-[2px] shadow-sm" />
                      English
                    </Seg>
                  </div>
                </Field>

                <Field label={t.theme}>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(
                      [
                        ['system', t.system],
                        ['light', t.light],
                        ['dark', t.dark],
                      ] as const
                    ).map(([mode, label]) => (
                      <Seg
                        key={mode}
                        active={theme === mode}
                        highlight={phase === 'theme' && theme === mode}
                        accent={accent}
                      >
                        {label}
                      </Seg>
                    ))}
                  </div>
                </Field>

                <Field label={t.accent}>
                  <div className="flex flex-wrap gap-1.5">
                    {ACCENTS.map((color, i) => (
                      <motion.span
                        key={color}
                        className={cn('size-6 rounded-full')}
                        style={{
                          background: color,
                          outline:
                            accentIndex === i ? `2px solid ${color}` : undefined,
                          outlineOffset: accentIndex === i ? 2 : undefined,
                        }}
                        animate={
                          phase === 'accent' && accentIndex === i
                            ? { scale: [1, 1.14, 1] }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.2 }}
                      />
                    ))}
                  </div>
                </Field>
              </div>

              <div className="rounded-[14px] border border-white/8 bg-[#1a2233] px-3 py-3">
                <p className="mb-2.5 text-[10px] font-semibold tracking-[0.06em] text-[#9ca3af] uppercase">
                  {t.behavior}
                </p>

                <Toggle
                  label={t.start}
                  hint={t.startHint}
                  checked={startWin}
                  pulse={phase === 'toggleStart'}
                  accent={accent}
                />
                <div className="mt-3">
                  <Toggle
                    label={t.notifications}
                    hint={t.notifyHint}
                    checked={notify}
                    pulse={phase === 'toggleNotify'}
                    accent={accent}
                  />
                </div>

                <div className="mt-3">
                  <div className="mb-1.5 text-[11px] font-medium">
                    {t.idleOpacity} · %{opacity}
                  </div>
                  <div className="relative h-1.5 rounded-full bg-white/10">
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{ background: accent }}
                      animate={{ width: `${Math.max(((opacity - 10) / 90) * 100, 0)}%` }}
                      transition={{ duration: 0.25 }}
                    />
                    <motion.div
                      className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-white shadow"
                      style={
                        phase === 'slider'
                          ? { boxShadow: `0 0 0 3px ${accent}66` }
                          : undefined
                      }
                      animate={{ left: `calc(${Math.max(((opacity - 10) / 90) * 100, 0)}% - 6px)` }}
                      transition={{ duration: 0.25 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DemoPanel>
        </motion.div>
      </div>
      <DemoTaskbar active accentColor={accent} />
    </DemoStage>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="mb-1.5 text-[11px] font-medium">{label}</div>
      {children}
    </div>
  )
}

function Seg({
  children,
  active,
  highlight,
  accent,
}: {
  children: React.ReactNode
  active?: boolean
  highlight?: boolean
  accent: string
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-1.5 rounded-[9px] py-1.5 text-center text-[11px] font-medium transition-colors',
        !active && 'bg-[#111827] text-[#9ca3af]',
        active && 'text-white',
        highlight && 'ring-2 ring-white/25',
      )}
      style={active ? { background: accent } : undefined}
    >
      {children}
    </div>
  )
}

function Toggle({
  label,
  hint,
  checked,
  pulse,
  accent,
}: {
  label: string
  hint: string
  checked: boolean
  pulse?: boolean
  accent: string
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <div className="truncate text-[12px]">{label}</div>
        <div className="mt-0.5 text-[10px] leading-snug text-[#9ca3af]">{hint}</div>
      </div>
      <div
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full transition-colors',
          !checked && 'bg-white/20',
          pulse && 'ring-2 ring-white/30',
        )}
        style={checked ? { background: accent } : undefined}
      >
        <motion.span
          className="absolute top-[3px] size-[18px] rounded-full bg-white shadow"
          animate={{ left: checked ? 23 : 3 }}
          transition={{ duration: 0.18 }}
        />
      </div>
    </div>
  )
}
