'use client'

import { Section } from '@/components/ui/Section'
import { ShelfDemo } from '@/components/demo/ShelfDemo'
import { PanelDemo } from '@/components/demo/PanelDemo'
import { SettingsAppearanceDemo } from '@/components/demo/SettingsAppearanceDemo'
import { SettingsBehaviorDemo } from '@/components/demo/SettingsBehaviorDemo'
import { useLang } from '@/lib/i18n'

export function ProductDemo() {
  const { t } = useLang()

  const secondaryDemos = [
    {
      title: t.productDemo.panelTitle,
      description: t.productDemo.panelDesc,
      Demo: PanelDemo,
    },
    {
      title: t.productDemo.appearanceTitle,
      description: t.productDemo.appearanceDesc,
      Demo: SettingsAppearanceDemo,
    },
    {
      title: t.productDemo.settingsTitle,
      description: t.productDemo.settingsDesc,
      Demo: SettingsBehaviorDemo,
    },
  ]

  return (
    <Section
      id="demo"
      eyebrow={t.productDemo.eyebrow}
      title={t.productDemo.title}
      description={t.productDemo.description}
    >
      <div className="mb-10">
        <div className="mb-4 text-center sm:text-left">
          <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
            {t.productDemo.desktopTitle}
          </h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{t.productDemo.desktopDesc}</p>
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
