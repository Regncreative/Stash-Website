import { Download, MonitorSmartphone, Cpu } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { SITE } from '@/lib/constants'

type DownloadSectionProps = {
  version: string
  downloadUrl: string
  releaseUrl: string
}

export function DownloadSection({ version, downloadUrl, releaseUrl }: DownloadSectionProps) {
  return (
    <Section
      id="download"
      eyebrow="Download"
      title="Get Stash for Windows"
      description="Installer from GitHub Releases. No account, no telemetry cloud, no file uploads."
    >
      <div className="mx-auto max-w-2xl rounded-[28px] bg-[linear-gradient(180deg,rgba(37,99,235,0.12),rgba(255,255,255,0.7))] p-8 text-center ring-1 ring-[var(--accent-ring)] shadow-[var(--shadow-md)] sm:p-12">
        <p className="text-sm font-medium text-[var(--muted)]">Latest version</p>
        <p className="mt-2 text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          v{version}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Badge tone="accent">
            <MonitorSmartphone className="size-3.5" aria-hidden />
            Windows 11
          </Badge>
          <Badge>
            <Cpu className="size-3.5" aria-hidden />
            x64
          </Badge>
          <Badge>Windows 10 compatible</Badge>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href={downloadUrl} external size="lg" className="min-w-[200px]">
            <Download className="size-4" aria-hidden />
            Download Stash
          </Button>
          <Button href={releaseUrl} external variant="secondary" size="lg">
            <GitHubIcon />
            GitHub Releases
          </Button>
        </div>

        <p className="mt-5 text-sm text-[var(--muted)]">
          Prefer source? Clone from{' '}
          <a
            href={SITE.github}
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {SITE.repo}
          </a>
        </p>
      </div>
    </Section>
  )
}
