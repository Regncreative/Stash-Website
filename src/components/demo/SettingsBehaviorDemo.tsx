'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Trash2 } from 'lucide-react'
import {
  DemoAppHeader,
  DemoPanel,
  DemoStage,
  DemoTaskbar,
  wait,
} from '@/components/demo/shared'
import { cn } from '@/lib/cn'

type Phase =
  | 'show'
  | 'sort'
  | 'shelf'
  | 'hotkey'
  | 'clear'
  | 'updates'
  | 'hold'

const SORTS = ['Date added', 'Name', 'Recently opened', 'Size'] as const

const SEQUENCE: Array<{ phase: Phase; ms: number }> = [
  { phase: 'show', ms: 550 },
  { phase: 'sort', ms: 1200 },
  { phase: 'shelf', ms: 800 },
  { phase: 'hotkey', ms: 900 },
  { phase: 'clear', ms: 700 },
  { phase: 'updates', ms: 900 },
  { phase: 'hold', ms: 700 },
]

export function SettingsBehaviorDemo() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('show')
  const [sort, setSort] = useState<(typeof SORTS)[number]>('Size')
  const [recording, setRecording] = useState(false)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    if (reduceMotion) return
    let cancelled = false

    const run = async () => {
      while (!cancelled) {
        setSort('Size')
        setRecording(false)
        setChecking(false)

        for (const step of SEQUENCE) {
          if (cancelled) return
          setPhase(step.phase)

          if (step.phase === 'sort') {
            for (const option of SORTS) {
              if (cancelled) return
              setSort(option)
              await wait(240)
            }
            setSort('Size')
          }

          if (step.phase === 'hotkey') {
            setRecording(true)
            await wait(500)
            setRecording(false)
          }

          if (step.phase === 'updates') {
            setChecking(true)
            await wait(550)
            setChecking(false)
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

  return (
    <DemoStage>
      <div className="absolute inset-x-3 top-3 bottom-[56px]">
        <DemoPanel>
          <DemoAppHeader settingsActive />
          <div className="flex items-center gap-2 px-4 pb-2">
            <span className="rounded-lg p-1.5 text-[#9ca3af]">
              <ArrowLeft size={16} strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-[14px] font-semibold leading-tight">Settings</p>
              <p className="text-[10px] text-[#9ca3af]">Appearance and behavior</p>
            </div>
          </div>

          <div className="min-h-0 flex-1 space-y-2.5 overflow-hidden px-3.5 pb-3">
            <div className="rounded-[14px] border border-white/8 bg-[#1a2233] px-3 py-3">
              <div className="mb-2 grid grid-cols-2 gap-1.5">
                {SORTS.map((option) => (
                  <motion.div
                    key={option}
                    className={cn(
                      'rounded-[9px] py-2 text-center text-[11px] font-medium',
                      sort === option
                        ? 'bg-[#2563eb] text-white'
                        : 'bg-[#111827] text-[#9ca3af]',
                      phase === 'sort' && sort === option && 'ring-2 ring-white/25',
                    )}
                    animate={
                      phase === 'sort' && sort === option ? { scale: [1, 1.03, 1] } : { scale: 1 }
                    }
                    transition={{ duration: 0.2 }}
                  >
                    {option}
                  </motion.div>
                ))}
              </div>

              <Field label="Default shelf">
                <div
                  className={cn(
                    'flex h-9 items-center justify-between rounded-[11px] border border-white/10 bg-[#111827] px-3 text-[12px]',
                    phase === 'shelf' && 'border-[#2563eb] ring-2 ring-[#2563eb]/25',
                  )}
                >
                  <span>Personal</span>
                  <span className="text-[#9ca3af]">▾</span>
                </div>
              </Field>

              <Field label="Panel hotkey">
                <div
                  className={cn(
                    'flex h-9 items-center justify-between rounded-[11px] border border-white/10 bg-[#111827] px-3 text-[12px]',
                    (phase === 'hotkey' || recording) && 'border-[#2563eb] ring-2 ring-[#2563eb]/25',
                  )}
                >
                  <span>{recording ? 'Press keys…' : 'Ctrl + Shift + Space'}</span>
                  <span className="text-[11px] text-[#9ca3af]">Record</span>
                </div>
                <p className="mt-1 text-[10px] text-[#9ca3af]">
                  Click, then press up to 3 keys (Esc to cancel)
                </p>
              </Field>

              <button
                type="button"
                className={cn(
                  'mt-1 h-9 w-full rounded-[11px] bg-[#111827] text-[12px] font-medium',
                  phase === 'clear' && 'ring-2 ring-white/20',
                )}
              >
                Clear missing files
              </button>
              <p className="mt-1 text-[10px] text-[#9ca3af]">
                Remove any references that are gone from disk
              </p>
            </div>

            <div className="rounded-[14px] border border-white/8 bg-[#1a2233] px-3 py-3">
              <p className="mb-2 text-[10px] font-semibold tracking-[0.06em] text-[#9ca3af] uppercase">
                Shelves
              </p>
              <div className="flex items-center justify-between rounded-[10px] px-2 py-1.5">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#2563eb]" />
                  <span className="text-[12px]">Personal</span>
                </div>
                <Trash2 size={14} className="text-[#9ca3af] opacity-50" />
              </div>
            </div>

            <div className="rounded-[14px] border border-white/8 bg-[#1a2233] px-3 py-3">
              <p className="mb-2 text-[10px] font-semibold tracking-[0.06em] text-[#9ca3af] uppercase">
                Updates
              </p>
              <motion.div
                className={cn(
                  'flex h-9 items-center justify-center rounded-[11px] bg-[#111827] text-[12px] font-medium',
                  phase === 'updates' && 'ring-2 ring-[#2563eb]/35',
                )}
                animate={checking ? { opacity: [1, 0.55, 1] } : { opacity: 1 }}
                transition={{ duration: 0.7, repeat: checking ? Infinity : 0 }}
              >
                {checking ? 'Checking…' : 'Check for updates'}
              </motion.div>
            </div>

            <p className="pt-1 text-center text-[10px] text-[#9ca3af]">Stash · Windows file shelf</p>
          </div>
        </DemoPanel>
      </div>
      <DemoTaskbar active />
    </DemoStage>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <div className="mb-1.5 text-[11px] font-medium">{label}</div>
      {children}
    </div>
  )
}
