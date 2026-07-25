'use client'

import {
  Archive,
  Languages,
  Layers3,
  MoonStar,
  MousePointerClick,
  Power,
  RefreshCw,
  Search,
  Database,
} from 'lucide-react'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { Section } from '@/components/ui/Section'
import { useLang } from '@/lib/i18n'

const ICONS = [
  Archive,
  MousePointerClick,
  Layers3,
  Search,
  MoonStar,
  Power,
  RefreshCw,
  Database,
  Languages,
]

export function Features() {
  const { t } = useLang()

  return (
    <Section
      id="features"
      eyebrow={t.features.eyebrow}
      title={t.features.title}
      description={t.features.description}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.features.items.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={ICONS[index]}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        ))}
      </div>
    </Section>
  )
}
