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

const features = [
  {
    icon: Archive,
    title: 'System Tray',
    description: 'Lives quietly in the tray — one click or shortcut away, never in the way.',
  },
  {
    icon: MousePointerClick,
    title: 'Drag & Drop',
    description: 'Drop files onto shelves, then drag them into Explorer, browsers, or any app.',
  },
  {
    icon: Layers3,
    title: 'Multiple Shelves',
    description: 'Organize by context: Work, Personal, Temporary — each with its own accent.',
  },
  {
    icon: Search,
    title: 'Search',
    description: 'Find files instantly by name, type, or shelf without opening Explorer.',
  },
  {
    icon: MoonStar,
    title: 'Themes',
    description: 'Fluent light and dark themes with accent colors that feel native to Windows 11.',
  },
  {
    icon: Power,
    title: 'Auto Launch',
    description: 'Start with Windows so your shelf is ready the moment you sign in.',
  },
  {
    icon: RefreshCw,
    title: 'Auto Update',
    description: 'Updates arrive from GitHub Releases — stay current without hunting installers.',
  },
  {
    icon: Database,
    title: 'SQLite',
    description: 'Fast local metadata only. Your files stay on disk; nothing is uploaded.',
  },
  {
    icon: Languages,
    title: 'Localization',
    description: 'Full Turkish and English UI, including tray menus and system messaging.',
  },
]

export function Features() {
  return (
    <Section
      id="features"
      eyebrow="Features"
      title="Everything you need. Nothing you don’t."
      description="Built as a lightweight productivity tool — focused on temporary files, not another cloud drive."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </Section>
  )
}
