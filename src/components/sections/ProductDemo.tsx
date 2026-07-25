'use client'

import { Section } from '@/components/ui/Section'
import { ShelfDemo } from '@/components/demo/ShelfDemo'
import { PanelDemo } from '@/components/demo/PanelDemo'
import { SettingsAppearanceDemo } from '@/components/demo/SettingsAppearanceDemo'
import { SettingsBehaviorDemo } from '@/components/demo/SettingsBehaviorDemo'

const secondaryDemos = [
  {
    title: 'Panel',
    description: 'Search, missing-file awareness, and remove from shelf.',
    Demo: PanelDemo,
  },
  {
    title: 'Appearance',
    description: 'Language, theme, accent, and idle behavior.',
    Demo: SettingsAppearanceDemo,
  },
  {
    title: 'Settings',
    description: 'Sort, hotkey, shelves, and updates.',
    Demo: SettingsBehaviorDemo,
  },
] as const

export function ProductDemo() {
  return (
    <Section
      id="demo"
      eyebrow="Product demo"
      title="Feels like a built-in Windows feature"
      description="A desktop workflow on top — then panel, appearance, and settings looping below."
    >
      <div className="mb-10">
        <div className="mb-4 text-center sm:text-left">
          <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
            Desktop workflow
          </h3>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Drop a file into Stash from the desktop, then drag it into Mail as an attachment.
          </p>
        </div>
        <ShelfDemo />
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-5">
        {secondaryDemos.map(({ title, description, Demo }) => (
          <div key={title} className="mx-auto w-full max-w-[360px] lg:max-w-none">
            <div className="mb-4 text-center lg:text-left">
              <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                {title}
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
            </div>
            <Demo />
          </div>
        ))}
      </div>
    </Section>
  )
}
